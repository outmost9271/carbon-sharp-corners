/**
 * 把 carbon 打包成单个可便携的 HTML 文件。
 *
 * 1. 从运行中的本地服务取首页 HTML
 * 2. 内联所有 <script src> 与 <link rel=stylesheet>（含 CDN 主题 CSS）
 * 3. 追加所有未被引用的 webpack chunk（其余页面、语言 mode、highlight.js
 *    语言等），只做模块注册；内联后 __webpack_require__.e 认为已加载
 * 4. 把 /static/... 等资源替换为 data URI
 * 5. 修正协议相对 URL（//cdn... 在 file:// 下无效）并转义 </script>
 */
const fs = require('fs')
const path = require('path')

const BASE = process.env.CARBON_BASE || 'http://127.0.0.1:80'
const APP_DIR = process.env.CARBON_DIR || '/pi/search/carbon'
const OUT = process.argv[2] || '/pi/search/carbon-standalone.html'

const CHUNKS_DIR = path.join(APP_DIR, '.next/static/chunks')
const PUBLIC_DIR = path.join(APP_DIR, 'public')

const MIME = {
  '.css': 'text/css', '.js': 'application/javascript', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.gif': 'image/gif', '.ico': 'image/x-icon', '.webp': 'image/webp',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.otf': 'font/otf',
}
const textMime = m => /^text\/|javascript$|svg\+xml$|json$/.test(m)

async function fetchText(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${res.status} ${url}`)
  return res.text()
}

function toDataUri(file) {
  const mime = MIME[path.extname(file).toLowerCase()] || 'application/octet-stream'
  const base64 = fs.readFileSync(file).toString('base64')
  return `data:${mime}${textMime(mime) ? ';charset=utf-8' : ''};base64,${base64}`
}

function collectAssets(dir, prefix, map) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    const url = `${prefix}/${entry.name}`
    if (entry.isDirectory()) collectAssets(full, url, map)
    else map[url] = toDataUri(full)
  }
}

async function replaceAsync(html, regex, replacer) {
  const parts = []
  let lastIndex = 0
  let match
  while ((match = regex.exec(html))) {
    parts.push(html.slice(lastIndex, match.index))
    parts.push(await replacer(...match))
    lastIndex = match.index + match[0].length
  }
  parts.push(html.slice(lastIndex))
  return parts.join('')
}

const escapeScriptClose = js => js.replace(/<\/script>/gi, '<\\/script>')

async function main() {
  const log = (label, s) => console.log(`   → ${label}: ${(s.length / 1024 / 1024).toFixed(2)} MB`)

  console.log('1/6 获取首页 HTML ...')
  let html = await fetchText(`${BASE}/`)
  log('原始 HTML', html)

  // 先收集主题样式链接（后面的 CSS 内联会消耗掉 <link> 标签）
  const themeHrefs = [...html.matchAll(/<link[^>]*href="([^"]+)"[^>]*>/g)]
    .map(m => m[1])
    .filter(h => /theme/i.test(h))

  // 2. 内联样式表（含 CDN）
  let cssCount = 0
  html = await replaceAsync(html, /<link([^>]*?)href="([^"]+)"([^>]*?)>/g, async (full, a1, href, a2) => {
    if (!`${a1}${a2}`.includes('stylesheet')) return full
    const url = href.startsWith('//') ? `https:${href}` : href.startsWith('/') ? `${BASE}${href}` : href
    try {
      const css = await fetchText(url)
      cssCount++
      return `<style data-href="${href}">${escapeScriptClose(css).replace(/<\/style>/gi, '<\\/style>')}</style>`
    } catch (e) {
      console.warn(`   跳过（无法获取）: ${href}`)
      return full
    }
  })
  console.log(`2/6 内联了 ${cssCount} 个样式表`)
  log('内联 CSS 后', html)

  // 2.5 把所有主题 CSS（本地 + CDN）合并内联。主题路径在 JS 里是拼接形式
  //     （/static/themes/${id}.min.css），字符串替换无法覆盖，且 CDN 需要联网——
  //     全部内联后主题切换完全离线可用
  const themeCss = []
  for (const href of themeHrefs) {
    const url = href.startsWith('//') ? `https:${href}` : href.startsWith('/') ? `${BASE}${href}` : href
    try {
      themeCss.push(`/* ${href} */\n${escapeScriptClose(await fetchText(url)).replace(/<\/style>/gi, '<\\/style>')}`)
    } catch (e) {
      console.warn(`   主题跳过: ${href}`)
    }
  }
  html = html.replace('</head>', () => `<style id="inline-themes">${themeCss.join('\n')}</style>\n</head>`)
  console.log(`2.5 合并内联了 ${themeCss.length}/${themeHrefs.length} 个主题样式`)
  log('内联主题后', html)

  // 3. 内联同步 script
  let scriptCount = 0
  const inlinedScripts = new Set()
  html = await replaceAsync(html, /<script([^>]*?)src="([^"]+)"([^>]*)><\/script>/g, async (full, a1, src, a2) => {
    const url = src.startsWith('//') ? `https:${src}` : src.startsWith('/') ? `${BASE}${src}` : src
    try {
      const js = await fetchText(url)
      scriptCount++
      inlinedScripts.add(path.basename(src))
      return `<script${a1}${a2}>${escapeScriptClose(js)}</script>`
    } catch (e) {
      console.warn(`   跳过（无法获取）: ${src}`)
      return full
    }
  })
  console.log(`3/6 内联了 ${scriptCount} 个脚本`)
  log('内联脚本后', html)

  // 关键：Next 把 22 个 defer 外部脚本放在 <head>；defer 会等 HTML 解析完再执行，
  // 因此能读到 body 里的 __NEXT_DATA__，hydrate 时 #__next 也已存在。内联后 defer
  // 对内联脚本无效，必须手动恢复这个时序：
  //   __NEXT_DATA__    → head 第一个脚本之前（数据先就位）
  //   异步 chunk        → </head> 前（只注册模块，可立即执行）
  //   应用脚本（原 defer）→ </body> 前（DOM 就绪后再执行）
  const nextDataMatch = html.match(/<script id="__NEXT_DATA__"[^>]*>[\s\S]*?<\/script>/)
  if (nextDataMatch) {
    html = html.replace(nextDataMatch[0], '')
    html = html.replace(/<script[\s>]/, m => `${nextDataMatch[0]}${m}`)
    console.log('   已将 __NEXT_DATA__ 移到第一个脚本之前')
  } else {
    console.warn('   ⚠ 未找到 __NEXT_DATA__')
  }

  // 从 head 中提取应用脚本（排除 __NEXT_DATA__）
  const headEndIdx = html.indexOf('</head>')
  const appScripts = []
  const headPart = html.slice(0, headEndIdx).replace(
    /<script(?![^>]*id="__NEXT_DATA__")[^>]*>[\s\S]*?<\/script>/g,
    m => {
      appScripts.push(m)
      return ''
    }
  )
  html = headPart + html.slice(headEndIdx)
  console.log(`   已从 head 提取 ${appScripts.length} 个应用脚本，将在 body 末尾执行`)

  // 4. 追加剩余异步 chunk
  const chunks = fs.readdirSync(CHUNKS_DIR).filter(f => f.endsWith('.js'))
  const extra = []
  for (const file of chunks) {
    if (inlinedScripts.has(file)) continue
    const content = escapeScriptClose(fs.readFileSync(path.join(CHUNKS_DIR, file), 'utf8'))
    extra.push(`<script>${content}</script>`)
  }
  // 注意：必须用函数作为替换值。chunk 的 JS 里常含 $' / $` 等序列，
  // 作为字符串替换值时会被 String.replace 展开成整段 HTML，导致体积暴涨
  // 异步 chunk 只需注册模块，放在 </head> 前立即执行
  html = html.replace('</head>', () => `${extra.join('\n')}\n</head>`)
  console.log(`4/6 追加 ${extra.length} 个 chunk（共 ${chunks.length}）`)
  log('追加 chunk 后', html)

  // 应用脚本放 </body> 前（等价于原来的 defer：DOM 解析完成后再执行）
  html = html.replace('</body>', () => `${appScripts.join('\n')}\n</body>`)
  log('应用脚本就位后', html)

  // 5. 资源替换为 data URI
  const assets = {}
  collectAssets(PUBLIC_DIR, '', assets)
  if (fs.existsSync(path.join(PUBLIC_DIR, 'favicon.ico'))) {
    assets['/favicon.ico'] = toDataUri(path.join(PUBLIC_DIR, 'favicon.ico'))
  }
  const urls = Object.keys(assets).sort((a, b) => b.length - a.length)
  let replaced = 0
  for (const url of urls) {
    if (html.includes(url)) {
      html = html.split(url).join(assets[url])
      replaced++
    }
  }
  console.log(`5/6 资源替换: ${replaced}/${urls.length}`)
  log('资源内联后', html)

  // 6. 协议相对 URL → https:// （file:// 下 //cdn... 会解析失败）
  const before = (html.match(/(["'(])\/\//g) || []).length
  html = html.replace(
    /(["'(])\/\/(cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net|fonts\.gstatic\.com|fonts\.googleapis\.com|raw\.githubusercontent\.com|unpkg\.com)/g,
    '$1https://$2'
  )
  console.log(`6/6 修正协议相对 URL（候选 ${before} 处）`)
  log('最终', html)

  fs.writeFileSync(OUT, html)
  console.log(`\n完成: ${OUT}`)
  console.log(`大小: ${(fs.statSync(OUT).size / 1024 / 1024).toFixed(2)} MB`)
}

main().catch(e => {
  console.error('FAILED:', e.message)
  process.exit(1)
})
