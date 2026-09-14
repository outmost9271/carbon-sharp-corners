// 常用语言的 highlight.js 语言包（静态打包）。
//
// 「自动检测」依赖 highlight.js 的语言包，这些包原来全部是异步 chunk，
// 首屏渲染时尚未就绪，导致检测失败、代码没有高亮。这里把最常用的语言
// 静态引入主 bundle，使首次渲染时即可完成检测；其余语言由
// lib/highlight-languages.js 继续异步加载。
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import json from 'highlight.js/lib/languages/json'
import xml from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import markdown from 'highlight.js/lib/languages/markdown'
import python from 'highlight.js/lib/languages/python'
import java from 'highlight.js/lib/languages/java'
import go from 'highlight.js/lib/languages/go'
import rust from 'highlight.js/lib/languages/rust'
import sql from 'highlight.js/lib/languages/sql'
import bash from 'highlight.js/lib/languages/bash'
import yaml from 'highlight.js/lib/languages/yaml'
import cpp from 'highlight.js/lib/languages/cpp'
import csharp from 'highlight.js/lib/languages/csharp'
import php from 'highlight.js/lib/languages/php'
import ruby from 'highlight.js/lib/languages/ruby'
import swift from 'highlight.js/lib/languages/swift'
import kotlin from 'highlight.js/lib/languages/kotlin'
import dart from 'highlight.js/lib/languages/dart'
import dockerfile from 'highlight.js/lib/languages/dockerfile'
import lua from 'highlight.js/lib/languages/lua'

export const COMMON_HIGHLIGHT_LANGUAGES = [
  ['javascript', javascript],
  ['typescript', typescript],
  ['json', json],
  ['xml', xml],
  ['css', css],
  ['markdown', markdown],
  ['python', python],
  ['java', java],
  ['go', go],
  ['rust', rust],
  ['sql', sql],
  ['bash', bash],
  ['yaml', yaml],
  ['cpp', cpp],
  ['csharp', csharp],
  ['php', php],
  ['ruby', ruby],
  ['swift', swift],
  ['kotlin', kotlin],
  ['dart', dart],
  ['dockerfile', dockerfile],
  ['lua', lua],
]

export const COMMON_HIGHLIGHT_NAMES = COMMON_HIGHLIGHT_LANGUAGES.map(([name]) => name)
