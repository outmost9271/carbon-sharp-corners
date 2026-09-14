// 首屏就要用到的常用语言 mode。
//
// 这些 mode 通过静态 require 进入主 bundle（在 useModeLoader 的 effect 中
// 同步执行，不参与 SSR：codemirror 依赖浏览器 API），因此内容第一次渲染后
// 几毫秒内即可完成高亮，不需要等待任何网络请求。其余语言仍由
// useModeLoader 在后台异步加载。
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/jsx/jsx'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/css/css'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/mode/python/python'
import 'codemirror/mode/clike/clike'
import 'codemirror/mode/go/go'
import 'codemirror/mode/rust/rust'
import 'codemirror/mode/sql/sql'
import 'codemirror/mode/shell/shell'
import 'codemirror/mode/yaml/yaml'
import 'codemirror/mode/php/php'
import 'codemirror/mode/ruby/ruby'
import 'codemirror/mode/swift/swift'
import 'codemirror/mode/dockerfile/dockerfile'
import 'codemirror/mode/lua/lua'
import 'codemirror/mode/r/r'
import 'codemirror/mode/dart/dart'
import 'codemirror/mode/diff/diff'
import 'codemirror/mode/powershell/powershell'
import 'codemirror/mode/toml/toml'
import 'codemirror/mode/vue/vue'

export { COMMON_MODES } from './common-modes-list'
