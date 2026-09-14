import { LANGUAGES } from './constants'
import { COMMON_HIGHLIGHT_NAMES } from './highlight-languages-common'

// 常用语言已静态打包（见 highlight-languages-common.js），这里只保留其余语言，
// 由 useHighlightLoader 在后台异步加载
export default LANGUAGES.filter(l => l.highlight)
  .map(l => l.short || l.mode)
  .filter(lang => COMMON_HIGHLIGHT_NAMES.indexOf(lang) < 0)
  .map(lang => [lang, require(`highlight.js/lib/languages/${lang}`)])
