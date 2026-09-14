// Lightweight i18n for Carbon.
// Defaults to Simplified Chinese; English strings are kept for reference and fallback.
//
// Usage:
//   import { t } from '../lib/i18n'
//   t('settings.window.dropShadow')
//   t('editor.dropFile', { icon: '✋' })

const en = {
  // Header
  'header.home': 'Home',
  'header.logo': 'Carbon Logo',
  'header.tagline': 'Create and share beautiful images of your source code.',
  'header.taglineHint': 'Start typing or drop a file into the text area to get started.',

  // Footer
  'footer.about': 'about',
  'footer.source': 'source',
  'footer.terms': 'terms',
  'footer.privacy': 'privacy',
  'footer.offsets': 'offsets',
  'footer.createdByPrefix': 'created by',
  'footer.createdBySuffix': '',

  // Settings
  'settings.menu': 'Settings Menu',
  'settings.tab.window': 'Window',
  'settings.tab.editor': 'Editor',
  'settings.tab.misc': 'Misc',
  'settings.window.windowControls': 'Window controls',
  'settings.window.paddingVertical': 'Padding (vert)',
  'settings.window.paddingHorizontal': 'Padding (horiz)',
  'settings.window.dropShadow': 'Drop shadow',
  'settings.window.dropShadowOffsetY': '(offset-y)',
  'settings.window.dropShadowBlurRadius': '(blur-radius)',
  'settings.window.sharpCorners': 'Sharp corners',
  'settings.window.autoAdjustWidth': 'Auto-adjust width',
  'settings.window.width': 'Width',
  'settings.window.watermark': 'Watermark',
  'settings.editor.font': 'Font',
  'settings.editor.uploadFont': 'Upload +',
  'settings.editor.purchase': 'Purchase',
  'settings.editor.size': 'Size',
  'settings.editor.lineHeight': 'Line height',
  'settings.editor.lineNumbers': 'Line numbers',
  'settings.editor.firstLineNumber': 'First line number',
  'settings.editor.hiddenCharacters': 'Hidden characters',
  'settings.misc.importConfig': 'Import config',
  'settings.misc.exportConfig': 'Export config',
  'settings.misc.prettify': 'Prettify code',
  'settings.misc.reset': 'Reset settings',
  'settings.presets.title': 'Presets',
  'settings.presets.create': 'create +',
  'settings.presets.applied': 'Preset applied!',
  'settings.presets.undo': 'undo',

  // Export
  'export.menu': 'Export menu dropdown',
  'export.quick': 'Quick export',
  'export.export': 'Export',
  'export.exporting': 'Exporting…',
  'export.fileName': 'File name',
  'export.size': 'Size',
  'export.open': 'Open',
  'export.download': 'Download',

  // Copy
  'copy.menu': 'Copy menu',
  'copy.toClipboard': 'Copy to clipboard',
  'copy.image': 'Image',
  'copy.copied': 'Copied!',
  'copy.copying': 'Copying…',
  'copy.plainURL': 'Plain URL',
  'copy.button': 'Copy Button',

  // Share
  'share.tweet': 'Tweet',
  'share.loading': 'Loading…',
  'share.menu': 'Share menu dropdown',
  'share.uploadImgur': 'Upload to Imgur (beta)',
  'share.uploading': 'Uploading...',

  // Background
  'background.menu': 'Background Menu',
  'background.uploadPrompt': 'Upload a background image:',
  'background.file': 'File',
  'background.url': 'URL',
  'background.imageURL': 'Image URL…',
  'background.backgroundImage': 'Background image',
  'background.upload': 'Upload',
  'background.randomImagePrefix': 'Or use a random',
  'background.unsplash': 'Unsplash',
  'background.randomImageSuffix': 'image:',
  'background.generatePalette': 'Generate color palette (beta)',
  'background.corsError':
    'Fetching the image failed. This is probably a CORS-related issue. You can either enable CORS in your browser, or use another image.',

  // Snippets
  'snippets.addName': 'Add a name…',
  'snippets.save': 'Save',
  'snippets.saving': 'Saving…',
  'snippets.saved': 'Snippet saved',
  'snippets.saveMenu': 'Save menu dropdown',
  'snippets.delete': 'Delete',
  'snippets.deleting': 'Deleting…',
  'snippets.deleted': 'Snippet deleted',
  'snippets.duplicate': 'Duplicate',
  'snippets.duplicating': 'Duplicating…',
  'snippets.created': 'Snippet created',
  'snippets.loading': 'Loading…',
  'snippets.create': 'Create snippet +',
  'snippets.loadMore': 'Load more +',
  'snippets.open': 'Open ↗',
  'snippets.editedPrefix': 'Edited',
  'snippets.editedSuffix': '',

  // Editor
  'editor.language': 'Language',
  'editor.theme': 'Theme',
  'editor.codeEditor': 'Code editor',
  'editor.dropFile': 'Drop your file here to import {icon}',

  // Theme editor
  'theme.name': 'Name',
  'theme.customPlaceholder': 'Custom Theme',
  'theme.preset': 'Preset',
  'theme.create': 'Create +',

  // Carbon window
  'window.imageTitle': 'Image title',

  // Login
  'login.snippets': 'Snippets',
  'login.snippetsAlt': 'Snippets page',
  'login.account': 'Account',
  'login.signIn': 'Sign in/up',

  // Errors
  'error.unexpected': 'An unexpected error has occurred. Please',
  'error.fileIssue': 'file an issue here.',
  'error.twitterRateLimit':
    "Oh no! Looks like too many people are trying to tweet right now and we've been rate limited. Try again soon or save and upload manually!",

  // Common
  'common.areYouSure': 'Are you sure?',
  'common.useImage': 'Use Image',

  // About page
  'about.title': 'What does this do?',
  'about.intro': 'Carbon lets you create and share beautiful images of your source code',
  'about.description':
    "You know all of those code screenshots you see on Twitter? Although the code's usually impressive, we thought there was room for improvement in the aesthetic department. So what are you waiting for? Go try it out and impress all your developer and designer friends.",
  'about.paletteAlt': 'Palette',
  'about.whoTitle': 'Who uses it?',
  'about.whoBodyPrefix':
    'Carbon is used by thousands of developers daily, including experts at:',
  'about.companiesAlt':
    'Companies that trust Carbon: Google, Airbnb, GitHub, Coinbase, and Microsoft',
  'about.howTitle': 'How do I use it?',
  'about.import': 'Import',
  'about.importIntro': 'There are a few different ways to import code into Carbon:',
  'about.importDrop': 'Drop a file into the editor',
  'about.importGistPrefix': 'Append a GitHub gist id to the url (',
  'about.importGistLink': 'example',
  'about.importGistSuffix': ')',
  'about.importPaste': 'Paste your code directly',
  'about.customization': 'Customization',
  'about.customizationBody':
    "Once you've got all of your code into Carbon, you can customize your image by changing the syntax theme, background color/image, window theme, or padding.",
  'about.customizationDrop':
    'You can even drop an image file onto the editor to set the background to that image. Give it a try!',
  'about.export': 'Export/Sharing',
  'about.exportBody':
    "After you've customized your image you can Tweet a link to the image, or save it directly.",
  'about.exportTweetPrefix':
    "If you use the 'Tweet' button, Carbon will automatically make your image accessible. However, if you want to manually tweet your Carbon image, please check out (",
  'about.exportTweetLink': 'how to make your Twitter images accessible',
  'about.exportTweetSuffix': ').',
  'about.exportA11yPrefix':
    'If you include a Carbon image in a post, the source code will be invisible to assistive technology — it will not be possible to enlarge or copy it, etc. Please, think about adding another element with the source code as text, like (',
  'about.exportA11yLink': 'an HTML Details Element',
  'about.exportA11ySuffix': ') below the image.',
  'about.shortcuts': 'Keyboard Shortcuts',
  'about.shortcut.openSettings': 'Open settings menu',
  'about.shortcut.exportPng': 'Export as PNG',
  'about.shortcut.exportSvg': 'Export as SVG',
  'about.shortcut.saveSnippet': 'Save snippet',
  'about.shortcut.copyImage': 'Copy image to clipboard',
  'about.shortcut.reset': 'Reset settings',
  'about.improveTitle': 'I want to make this better.',
  'about.contributors': 'Contributors welcome!',

  // Embed
  'embed.title': 'Carbon Embeds',

  // Meta / SEO
  'meta.title': 'Carbon | Create and share beautiful images of your source code',
  'meta.description':
    'Carbon is the easiest way to create and share beautiful images of your source code.',

  // Account page
  'account.plan': 'Plan',
  'account.billing': 'Billing',
  'account.signOut': 'Sign Out',
  'account.free': 'Free',
  'account.diamond': 'Diamond',
  'account.feature.pngSvg': 'PNG/SVG Exports',
  'account.feature.editor': 'Full visual editor',
  'account.feature.backgrounds': 'Custom backgrounds',
  'account.feature.gist': 'GitHub Gist support',
  'account.feature.snippets': 'Saved snippets',
  'account.feature.embed': 'Embed saved snippets',
  'account.feature.api': 'API Access',
  'account.feature.themes': 'Saved custom themes/presets',
  'account.feature.twitterCard': 'Twitter card unfurls',
  'account.freeForever': 'FREE FOREVER',
  'account.perMonth': '$5.00 / month',
  'account.current': 'Current',
  'account.getStarted': 'Get Started',
  'account.upgrade': 'Upgrade',
  'account.comingSoon': 'Coming Soon',
  'account.thanksTitle': 'Thank you for supporting Carbon!',
  'account.thanksBody':
    'However, Carbon Diamond is not quite ready yet. We greatly appreciate your support, and will let you know when premium features launch!',
  'account.thanksSign': '— the Carbon Team',
  'account.heartsAlt': 'Black and yellow hearts',
  'account.upgradeTo': 'Upgrade to',
  'account.cardPrompt': 'Please enter a credit or debit card:',
  'account.cardholdersName': "Cardholders's name…",
  'account.termsPrefix': '(By clicking subscribe, you are accepting the',
  'account.termsLink': 'terms and conditions',
  'account.termsSuffix': ')',
  'account.subscribe': 'Subscribe',
  'account.sending': 'Sending…',
}

const zh = {
  // Header
  'header.home': '首页',
  'header.logo': 'Carbon 标志',
  'header.tagline': '创作并分享精美的源代码图片。',
  'header.taglineHint': '直接开始输入，或把文件拖入编辑区。',

  // Footer
  'footer.about': '关于',
  'footer.source': '源码',
  'footer.terms': '条款',
  'footer.privacy': '隐私',
  'footer.offsets': '碳补偿',
  'footer.createdByPrefix': '由',
  'footer.createdBySuffix': '创建',

  // Settings
  'settings.menu': '设置菜单',
  'settings.tab.window': '窗口',
  'settings.tab.editor': '编辑器',
  'settings.tab.misc': '其他',
  'settings.window.windowControls': '窗口控制按钮',
  'settings.window.paddingVertical': '垂直内边距',
  'settings.window.paddingHorizontal': '水平内边距',
  'settings.window.dropShadow': '投影',
  'settings.window.dropShadowOffsetY': '（Y 轴偏移）',
  'settings.window.dropShadowBlurRadius': '（模糊半径）',
  'settings.window.sharpCorners': '直角边角',
  'settings.window.autoAdjustWidth': '自动调整宽度',
  'settings.window.width': '宽度',
  'settings.window.watermark': '水印',
  'settings.editor.font': '字体',
  'settings.editor.uploadFont': '上传 +',
  'settings.editor.purchase': '购买',
  'settings.editor.size': '字号',
  'settings.editor.lineHeight': '行高',
  'settings.editor.lineNumbers': '行号',
  'settings.editor.firstLineNumber': '起始行号',
  'settings.editor.hiddenCharacters': '隐藏字符',
  'settings.misc.importConfig': '导入配置',
  'settings.misc.exportConfig': '导出配置',
  'settings.misc.prettify': '格式化代码',
  'settings.misc.reset': '重置设置',
  'settings.presets.title': '预设',
  'settings.presets.create': '创建 +',
  'settings.presets.applied': '已应用预设！',
  'settings.presets.undo': '撤销',

  // Export
  'export.menu': '导出菜单',
  'export.quick': '快速导出',
  'export.export': '导出',
  'export.exporting': '导出中…',
  'export.fileName': '文件名',
  'export.size': '尺寸',
  'export.open': '打开',
  'export.download': '下载',

  // Copy
  'copy.menu': '复制菜单',
  'copy.toClipboard': '复制到剪贴板',
  'copy.image': '图片',
  'copy.copied': '已复制！',
  'copy.copying': '复制中…',
  'copy.plainURL': '原始链接',
  'copy.button': '复制按钮',

  // Share
  'share.tweet': '发推文',
  'share.loading': '加载中…',
  'share.menu': '分享菜单',
  'share.uploadImgur': '上传到 Imgur（测试版）',
  'share.uploading': '上传中…',

  // Background
  'background.menu': '背景菜单',
  'background.uploadPrompt': '上传背景图片：',
  'background.file': '文件',
  'background.url': '链接',
  'background.imageURL': '图片链接…',
  'background.backgroundImage': '背景图片',
  'background.upload': '上传',
  'background.randomImagePrefix': '或使用随机的',
  'background.unsplash': 'Unsplash',
  'background.randomImageSuffix': '图片：',
  'background.generatePalette': '生成配色（测试版）',
  'background.corsError':
    '获取图片失败，多半是跨域（CORS）限制。你可以在浏览器中启用 CORS，或换一张图片。',

  // Snippets
  'snippets.addName': '添加名称…',
  'snippets.save': '保存',
  'snippets.saving': '保存中…',
  'snippets.saved': '片段已保存',
  'snippets.saveMenu': '保存菜单',
  'snippets.delete': '删除',
  'snippets.deleting': '删除中…',
  'snippets.deleted': '片段已删除',
  'snippets.duplicate': '存为副本',
  'snippets.duplicating': '创建副本中…',
  'snippets.created': '片段已创建',
  'snippets.loading': '加载中…',
  'snippets.create': '创建片段 +',
  'snippets.loadMore': '加载更多 +',
  'snippets.open': '打开 ↗',
  'snippets.editedPrefix': '编辑于',
  'snippets.editedSuffix': '',

  // Editor
  'editor.language': '语言',
  'editor.theme': '主题',
  'editor.codeEditor': '代码编辑器',
  'editor.dropFile': '把文件拖到这里导入 {icon}',

  // 主题编辑器
  'theme.name': '名称',
  'theme.customPlaceholder': '自定义主题',
  'theme.preset': '预设',
  'theme.create': '创建 +',

  // Carbon window
  'window.imageTitle': '图片标题',

  // Login
  'login.snippets': '代码片段',
  'login.snippetsAlt': '代码片段页',
  'login.account': '账户',
  'login.signIn': '登录 / 注册',

  // Errors
  'error.unexpected': '发生了意外错误。请',
  'error.fileIssue': '在此提交问题。',
  'error.twitterRateLimit': '哎呀！想发推文的人太多了，我们被限流了。请稍后再试，或手动保存并上传图片！',

  // Common
  'common.areYouSure': '确定吗？',
  'common.useImage': '使用图片',

  // About page
  'about.title': '这是做什么的？',
  'about.intro': 'Carbon 让你创作并分享精美的源代码图片',
  'about.description':
    '你在 Twitter 上见过的那些代码截图？代码本身通常令人赞叹，但我们觉得美学上还有提升空间。还等什么？快去试试，让开发者与设计师朋友们眼前一亮。',
  'about.paletteAlt': '调色板',
  'about.whoTitle': '谁在使用？',
  'about.whoBodyPrefix': '每天有成千上万的开发者在使用 Carbon，其中不乏来自以下公司的专家：',
  'about.companiesAlt': '信赖 Carbon 的公司：Google、Airbnb、GitHub、Coinbase 和 Microsoft',
  'about.howTitle': '如何使用？',
  'about.import': '导入',
  'about.importIntro': '有几种方式可以把代码导入 Carbon：',
  'about.importDrop': '将文件拖入编辑器',
  'about.importGistPrefix': '在网址后附加 GitHub Gist ID（',
  'about.importGistLink': '示例',
  'about.importGistSuffix': '）',
  'about.importPaste': '直接粘贴代码',
  'about.customization': '个性化定制',
  'about.customizationBody':
    '把代码导入 Carbon 后，你可以更改语法主题、背景颜色/图片、窗口样式或内边距，从而自定义图片。',
  'about.customizationDrop': '你甚至可以把图片文件拖入编辑器来设置背景，不妨一试！',
  'about.export': '导出与分享',
  'about.exportBody': '自定义完成后，你可以发布包含图片链接的推文，或直接保存图片。',
  'about.exportTweetPrefix':
    '如果你使用「发推文」按钮，Carbon 会自动为图片添加无障碍说明。如果你想手动发布 Carbon 图片，请参阅（',
  'about.exportTweetLink': '如何让 Twitter 图片可访问',
  'about.exportTweetSuffix': '）。',
  'about.exportA11yPrefix':
    '如果把 Carbon 图片放入帖子，辅助技术将无法识别其中的源代码——无法放大或复制。请考虑在图片下方用文本形式补充源代码，例如（',
  'about.exportA11yLink': 'HTML 的 details 元素',
  'about.exportA11ySuffix': '）。',
  'about.shortcuts': '键盘快捷键',
  'about.shortcut.openSettings': '打开设置菜单',
  'about.shortcut.exportPng': '导出为 PNG',
  'about.shortcut.exportSvg': '导出为 SVG',
  'about.shortcut.saveSnippet': '保存代码片段',
  'about.shortcut.copyImage': '复制图片到剪贴板',
  'about.shortcut.reset': '重置设置',
  'about.improveTitle': '我想让它变得更好。',
  'about.contributors': '欢迎贡献者！',

  // 嵌入页
  'embed.title': 'Carbon 嵌入',

  // Meta / SEO
  'meta.title': 'Carbon | 创作并分享精美的源代码图片',
  'meta.description': 'Carbon 让你以最轻松的方式创作并分享精美的源代码图片。',

  // Account page
  'account.plan': '套餐',
  'account.billing': '账单',
  'account.signOut': '退出登录',
  'account.free': '免费版',
  'account.diamond': 'Diamond',
  'account.feature.pngSvg': 'PNG/SVG 导出',
  'account.feature.editor': '完整的可视化编辑器',
  'account.feature.backgrounds': '自定义背景',
  'account.feature.gist': 'GitHub Gist 支持',
  'account.feature.snippets': '已保存片段',
  'account.feature.embed': '嵌入已保存片段',
  'account.feature.api': 'API 访问',
  'account.feature.themes': '保存的自定义主题/预设',
  'account.feature.twitterCard': 'Twitter 卡片展开',
  'account.freeForever': '永久免费',
  'account.perMonth': '$5.00 / 月',
  'account.current': '当前套餐',
  'account.getStarted': '开始使用',
  'account.upgrade': '升级',
  'account.comingSoon': '即将推出',
  'account.thanksTitle': '感谢你对 Carbon 的支持！',
  'account.thanksBody':
    '不过 Carbon Diamond 还没有完全准备好。非常感谢你的支持，高级功能上线时我们会通知你！',
  'account.thanksSign': '—— Carbon 团队',
  'account.heartsAlt': '黑黄爱心',
  'account.upgradeTo': '升级到',
  'account.cardPrompt': '请输入信用卡或借记卡信息：',
  'account.cardholdersName': '持卡人姓名…',
  'account.termsPrefix': '（点击「订阅」即表示你同意',
  'account.termsLink': '条款与条件',
  'account.termsSuffix': '）',
  'account.subscribe': '订阅',
  'account.sending': '发送中…',
}

const LOCALES = { zh, en }

export const DEFAULT_LOCALE = 'zh'

let currentLocale = DEFAULT_LOCALE

export function setLocale(locale) {
  if (LOCALES[locale]) {
    currentLocale = locale
  }
}

export function getLocale() {
  return currentLocale
}

export function t(key, params) {
  const dict = LOCALES[currentLocale] || zh
  let value = dict[key] != null ? dict[key] : en[key] != null ? en[key] : key

  if (params) {
    Object.keys(params).forEach(param => {
      value = value.split(`{${param}}`).join(String(params[param]))
    })
  }

  return value
}

export default t
