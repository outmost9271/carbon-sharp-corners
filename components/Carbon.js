import React from 'react'
import ReactDOM from 'react-dom'
import dynamic from 'next/dynamic'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import debounce from 'lodash.debounce'
import ms from 'ms'
import { Controlled as CodeMirror } from 'react-codemirror2'

hljs.registerLanguage('javascript', javascript)

import { Spinner } from './Spinner'
import WindowControls from './WindowControls'
import WidthHandler from './WidthHandler'
import { t } from '../lib/i18n'
import { COMMON_MODES } from '../lib/common-modes-list'
import { COMMON_HIGHLIGHT_LANGUAGES } from '../lib/highlight-languages-common'

import {
  COLORS,
  LANGUAGES,
  LANGUAGE_MODE_HASH,
  LANGUAGE_NAME_HASH,
  LANGUAGE_MIME_HASH,
  DEFAULT_SETTINGS,
  DEFAULT_WIDTHS,
  DEFAULT_HEIGHTS,
  THEMES_HASH,
} from '../lib/constants'

const SelectionEditor = dynamic(() => import('./SelectionEditor'), {
  loading: () => null,
})
const Watermark = dynamic(() => import('./svg/Watermark'), {
  loading: () => null,
})

function searchLanguage(l) {
  return LANGUAGE_NAME_HASH[l] || LANGUAGE_MODE_HASH[l] || LANGUAGE_MIME_HASH[l]
}

function noop() {}

// 手动尺寸（宽度/高度）在渲染时统一限制到允许范围，无论它们来自
// 设置面板、URL 参数还是导入的配置
const clampValue = (value, min, max) => {
  const parsed = parseInt(value, 10)
  if (Number.isNaN(parsed)) return min
  return Math.min(Math.max(parsed, min), max)
}
const clampWidth = width => clampValue(width, DEFAULT_WIDTHS.minWidth, DEFAULT_WIDTHS.maxWidth)
const clampHeight = height =>
  clampValue(height, DEFAULT_HEIGHTS.minHeight, DEFAULT_HEIGHTS.maxHeight)
function getUnderline(underline) {
  switch (underline) {
    case 1:
      return 'underline'
    case 2:
      /**
       * Chrome will only round to the nearest wave, causing visual inconsistencies
       * https://stackoverflow.com/questions/57559588/how-to-make-the-wavy-underline-extend-cover-all-the-characters-in-chrome
       */
      return `${COLORS.RED} wavy underline; text-decoration-skip-ink: none`
  }
  return 'initial'
}

class Carbon extends React.PureComponent {
  static defaultProps = {
    onChange: noop,
    onGutterClick: noop,
  }
  state = {}

  handleLanguageChange = debounce(
    (newCode, language) => {
      if (language === 'auto') {
        // try to set the language
        const detectedLanguage = hljs.highlightAuto(newCode).language
        const languageMode = searchLanguage(detectedLanguage)

        if (languageMode) {
          return languageMode.mime || languageMode.mode
        }
      }

      const languageMode = searchLanguage(language)

      if (languageMode) {
        return languageMode.mime || languageMode.mode
      }

      return language
    },
    ms('300ms'),
    {
      leading: true,
      trailing: true,
    }
  )

  onBeforeChange = (editor, meta, code) => {
    if (!this.props.readOnly) {
      this.props.onChange(code)
    }
  }

  onSelection = (ed, data) => {
    if (this.props.readOnly) {
      return
    }

    const selection = data.ranges[0]
    if (
      selection.head.line === selection.anchor.line &&
      selection.head.ch === selection.anchor.ch
    ) {
      return (this.currentSelection = null)
    }
    if (selection.head.line + selection.head.ch > selection.anchor.line + selection.anchor.ch) {
      this.currentSelection = {
        from: selection.anchor,
        to: selection.head,
      }
    } else {
      this.currentSelection = {
        from: selection.head,
        to: selection.anchor,
      }
    }
  }

  onMouseUp = () => {
    if (this.currentSelection) {
      this.setState({ selectionAt: this.currentSelection }, () => {
        this.currentSelection = null
      })
    } else {
      this.setState({ selectionAt: null })
    }
  }

  onSelectionChange = changes => {
    if (this.state.selectionAt) {
      const css = [
        changes.bold != null && `font-weight: ${changes.bold ? 'bold' : 'initial'}`,
        changes.italics != null && `font-style: ${changes.italics ? 'italic' : 'initial'}`,
        changes.underline != null && `text-decoration: ${getUnderline(changes.underline)}`,
        changes.color != null && `color: ${changes.color} !important`,
      ]
        .filter(Boolean)
        .join('; ')

      if (css) {
        this.props.editorRef.current.editor.doc.markText(
          this.state.selectionAt.from,
          this.state.selectionAt.to,
          { css }
        )
      }
    }
  }

  // 语言可能来自自动检测（highlight.js），异步就绪后需要重新计算
  getLanguageMode = () => {
    const config = { ...DEFAULT_SETTINGS, ...this.props.config }
    return (
      this.handleLanguageChange(
        this.props.children,
        config.language && config.language.toLowerCase()
      ) || 'plaintext'
    )
  }

  // CodeMirror 的 mode chunks、highlight.js 语言包与 webfont 都是异步加载的。
  // 它们就绪后重新计算 mode，并让 CodeMirror 重新解析文档；否则首屏渲染时
  // 缓存的空 mode（"auto"）会一直保留，表现为代码没有语法高亮。
  syncEditor = () => {
    const editor = this.props.editorRef.current && this.props.editorRef.current.editor
    if (!editor) return
    editor.setOption('mode', this.getLanguageMode())
    editor.refresh()
  }

  render() {
    const config = { ...DEFAULT_SETTINGS, ...this.props.config }

    const options = {
      screenReaderLabel: t('editor.codeEditor'),
      lineNumbers: config.lineNumbers,
      firstLineNumber: config.firstLineNumber,
      mode: this.getLanguageMode(),
      theme: config.theme,
      scrollbarStyle: null,
      viewportMargin: Infinity,
      lineWrapping: true,
      smartIndent: true,
      extraKeys: {
        'Shift-Tab': 'indentLess',
      },
      readOnly: this.props.readOnly,
      showInvisibles: config.hiddenCharacters,
      autoCloseBrackets: true,
    }
    const backgroundImage =
      (this.props.config.backgroundImage && this.props.config.backgroundImageSelection) ||
      this.props.config.backgroundImage

    const themeConfig = this.props.theme || THEMES_HASH[config.theme]

    const light = themeConfig && themeConfig.light

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    const selectionNode =
      !this.props.readOnly &&
      !!this.state.selectionAt &&
      document.getElementById('style-editor-button')

    return (
      <div className="section">
        <div
          ref={this.props.innerRef}
          id="export-container"
          className="export-container"
          onMouseUp={this.onMouseUp}
        >
          {this.props.loading ? (
            // TODO investigate removing these hard-coded values
            <div style={{ width: 876, height: 240 }}>
              <Spinner />
            </div>
          ) : (
            <div className="container">
              {config.windowControls ? (
                <WindowControls
                  titleBar={this.props.titleBar}
                  onTitleBarChange={this.props.onTitleBarChange}
                  theme={config.windowTheme}
                  code={this.props.children}
                  copyable={this.props.copyable}
                  light={light}
                />
              ) : null}
              <CodeMirror
                ref={this.props.editorRef}
                className={`CodeMirror__container window-theme__${config.windowTheme}`}
                value={this.props.children}
                options={options}
                onBeforeChange={this.onBeforeChange}
                onGutterClick={this.props.onGutterClick}
                onSelection={this.onSelection}
              />
              {config.watermark && <Watermark light={light} />}
              <div className="container-bg">
                <div className="white eliminateOnRender" />
                <div className="alpha eliminateOnRender" />
                <div className="bg" />
              </div>

              {/* TODO pass in this child as a prop to Carbon */}
              <WidthHandler
                innerRef={this.props.innerRef}
                onChange={this.props.updateWidth}
                onChangeComplete={this.props.updateWidthConfirm}
                paddingHorizontal={config.paddingHorizontal}
                paddingVertical={config.paddingVertical}
              />
            </div>
          )}
        </div>
        {selectionNode &&
          ReactDOM.createPortal(
            <SelectionEditor onChange={this.onSelectionChange} />,
            // TODO: don't use portal?
            selectionNode
          )}
        <style jsx>
          {`
            .container {
              position: relative;
              min-width: ${config.widthAdjustment ? '90px' : 'auto'};
              max-width: ${config.widthAdjustment ? '1365px' : 'none'};
              ${config.widthAdjustment ? '' : `width: ${clampWidth(config.width)}px;`}
              ${config.heightAdjustment
                ? ''
                : `height: ${clampHeight(config.height)}px; overflow: hidden;`}
              padding: ${config.paddingVertical} ${config.paddingHorizontal};
            }

            .container :global(.watermark) {
              fill-opacity: 0.75;
              position: absolute;
              z-index: 2;
              bottom: calc(${config.paddingVertical} + 16px);
              right: calc(${config.paddingHorizontal} + 16px);
            }

            .container .container-bg {
              position: absolute;
              top: 0px;
              right: 0px;
              bottom: 0px;
              left: 0px;
            }

            .container .white {
              background: #fff;
              position: absolute;
              top: 0px;
              right: 0px;
              bottom: 0px;
              left: 0px;
            }

            .container .bg {
              ${this.props.config.backgroundMode === 'image'
                ? `background: url(${backgroundImage});
                    background-size: cover;
                    background-repeat: no-repeat;`
                : `background: ${this.props.config.backgroundColor || config.backgroundColor};
                    background-size: auto;
                    background-repeat: repeat;`}
              position: absolute;
              top: 0px;
              right: 0px;
              bottom: 0px;
              left: 0px;
            }

            .container .alpha {
              position: absolute;
              top: 0px;
              right: 0px;
              bottom: 0px;
              left: 0px;
              background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==);
            }

            .container :global(.CodeMirror-gutters) {
              background-color: unset;
              border-right: none;
            }

            .container :global(.CodeMirror__container) {
              min-width: inherit;
              position: relative;
              z-index: 1;
              border-radius: ${config.sharpCorners ? '0' : '5px'};
              ${config.dropShadow
                ? `box-shadow: 0 ${config.dropShadowOffsetY} ${config.dropShadowBlurRadius} rgba(0, 0, 0, 0.55)`
                : ''};
            }

            .container :global(.CodeMirror__container .CodeMirror) {
              height: auto;
              min-width: inherit;
              padding: 18px 18px;
              padding-left: 12px;
              ${config.lineNumbers ? 'padding-left: 12px;' : ''} border-radius: ${config.sharpCorners
                ? '0'
                : '5px'};
              font-family: ${config.fontFamily}, monospace !important;
              font-size: ${config.fontSize};
              line-height: ${config.lineHeight};
              font-variant-ligatures: contextual;
              font-feature-settings: 'calt' 1;
              user-select: none;
            }

            .container :global(.CodeMirror-scroll),
            .container :global(.CodeMirror-hscrollbar) {
              overflow: hidden !important;
            }

            .container :global(.window-theme__sharp > .CodeMirror) {
              border-radius: 0px;
            }

            .container :global(.window-theme__bw > .CodeMirror) {
              border: 2px solid ${COLORS.SECONDARY};
            }

            /* CodeMirror 默认的失焦选区是纯浅灰 (#d9d9d9)，在深色主题下与浅色
               代码文字撞色，失焦后选中内容会看起来一片空白（Seti 等主题只定义
               了聚焦时的选区）。统一改成半透明选区色，聚焦样式仍由主题决定。 */
            .container :global(.CodeMirror:not(.CodeMirror-focused) div.CodeMirror-selected) {
              background: rgba(128, 128, 128, 0.42);
            }

            .container :global(.window-controls + .CodeMirror__container > .CodeMirror) {
              padding-top: 48px;
            }

            .container :global(.CodeMirror-linenumber) {
              cursor: pointer;
            }

            .container :global(.CodeMirror-cursor) {
              visibility: ${this.props.readOnly ? 'hidden' : ''};
            }

            @media (max-width: 768px) {
              /* show cursor on mobile */
              .container :global([contenteditable='true']) {
                user-select: text;
              }
              .container {
                max-width: 480px;
              }
            }

            .section,
            .export-container {
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              overflow: hidden;
              max-width: 100%;
            }
          `}
        </style>
      </div>
    )
  }
}

// 常用语言的 highlight.js 语言包已静态打包，模块加载时同步注册，
// 使首屏渲染的「自动检测」立即得到结果，无需等待异步 chunk
COMMON_HIGHLIGHT_LANGUAGES.forEach(([name, language]) =>
  hljs.registerLanguage(name, language)
)

let modesLoaded = false
function useModeLoader(onLoaded) {
  const onLoadedRef = React.useRef(onLoaded)
  onLoadedRef.current = onLoaded

  React.useEffect(() => {
    if (modesLoaded) {
      if (onLoadedRef.current) onLoadedRef.current()
      return
    }

    // 常用 mode 已打包进主 bundle，同步加载（仅客户端执行；codemirror 依赖
    // 浏览器 API，不能参与 SSR），使首次渲染后几毫秒内就有高亮
    require('../lib/codemirror-modes-common')
    if (onLoadedRef.current) onLoadedRef.current()

    // 其余语言在后台异步加载
    const languages = LANGUAGES.filter(
      language =>
        language.mode &&
        language.mode !== 'auto' &&
        language.mode !== 'text' &&
        COMMON_MODES.indexOf(language.mode) < 0
    )

    // webpack 把这些 require 编译成异步 chunk；等它们真正加载完成后再同步 mode，
    // 否则首次渲染会用空的 mode 解析整个文档并缓存下来
    Promise.all([
      import('../lib/custom/autoCloseBrackets'),
      ...languages.map(language =>
        language.custom
          ? import(`../lib/custom/modes/${language.mode}`)
          : import(`codemirror/mode/${language.mode}/${language.mode}`)
      ),
    ])
      .catch(() => {})
      .then(() => {
        modesLoaded = true
        if (onLoadedRef.current) onLoadedRef.current()
      })
  }, [])
}

let highLightsLoaded = false
function useHighlightLoader(onLoaded) {
  const onLoadedRef = React.useRef(onLoaded)
  onLoadedRef.current = onLoaded

  React.useEffect(() => {
    if (highLightsLoaded) {
      if (onLoadedRef.current) onLoadedRef.current()
      return
    }

    import('../lib/highlight-languages')
      .then(res => res.default.map(config => hljs.registerLanguage(config[0], config[1])))
      .then(() => {
        highLightsLoaded = true
        if (onLoadedRef.current) onLoadedRef.current()
      })
      .catch(() => {})
  }, [])
}

function selectedLinesReducer(
  { prevLine, selected },
  { type, lineNumber, numLines, selectedLines }
) {
  const newState = {}

  switch (type) {
    case 'GROUP': {
      if (prevLine) {
        for (let i = Math.min(prevLine, lineNumber); i < Math.max(prevLine, lineNumber) + 1; i++) {
          newState[i] = selected[prevLine]
        }
      }
      break
    }
    case 'MULTILINE': {
      for (let i = 0; i < selectedLines.length; i++) {
        newState[selectedLines[i] - 1] = true
      }
      break
    }
    default: {
      for (let i = 0; i < numLines; i++) {
        if (i != lineNumber) {
          if (prevLine == null) {
            newState[i] = false
          }
        } else {
          newState[lineNumber] = selected[lineNumber] === true ? false : true
        }
      }
    }
  }

  return {
    selected: { ...selected, ...newState },
    prevLine: lineNumber,
  }
}

function useSelectedLines(props, editorRef) {
  const [state, dispatch] = React.useReducer(selectedLinesReducer, {
    prevLine: null,
    selected: {},
  })

  React.useEffect(() => {
    if (editorRef.current && Object.keys(state.selected).length > 0) {
      editorRef.current.editor.display.view.forEach((line, i) => {
        if (line.text) {
          line.text.style.opacity = state.selected[i] === true ? 1 : 0.5
        }
        if (line.gutter) {
          line.gutter.style.opacity = state.selected[i] === true ? 1 : 0.5
        }
      })
    }
  }, [state.selected, props.children, props.config, editorRef])

  React.useEffect(() => {
    if (props.config.selectedLines) {
      dispatch({
        type: 'MULTILINE',
        selectedLines: props.config.selectedLines,
      })
    }
  }, [props.config.selectedLines])

  return React.useCallback(function onGutterClick(editor, lineNumber, gutter, e) {
    const numLines = editor.display.view.length
    const type = e.shiftKey ? 'GROUP' : 'LINE'
    dispatch({ type, lineNumber, numLines })
  }, [])
}

function useShowInvisiblesLoader() {
  React.useEffect(() => void require('cm-show-invisibles'), [])
}

// CodeMirror positions every line based on the line height it measured.
// The editor fonts are loaded asynchronously (font-display: swap), which changes
// the real line height after CodeMirror has already measured it. Without a
// refresh the lines keep the old offsets, so the cursor, the selection and the
// exported image drift apart from the rendered code. Refresh when the font
// loader reports that loading finished and also a few times shortly after
// mount, to cover fonts that were already cached.
function useFontLoadRefresh(props, carbonRef) {
  const fontFamily = props.config && props.config.fontFamily
  const fontSize = props.config && props.config.fontSize

  React.useEffect(() => {
    if (typeof document === 'undefined' || !document.fonts) return undefined

    let cancelled = false
    const sync = () => {
      if (cancelled) return
      const carbon = carbonRef.current
      if (carbon && carbon.syncEditor) carbon.syncEditor()
    }

    const fontSet = document.fonts
    const canListen = typeof fontSet.addEventListener === 'function'
    if (canListen) fontSet.addEventListener('loadingdone', sync)

    // 字体可能已经加载完成（事件已错过），稍后几秒内再栈底同步几次
    const timers = [300, 1000, 3000].map(ms => setTimeout(sync, ms))

    return () => {
      cancelled = true
      if (canListen) fontSet.removeEventListener('loadingdone', sync)
      timers.forEach(clearTimeout)
    }
  }, [fontFamily, fontSize, carbonRef])
}

function CarbonContainer(props, ref) {
  const carbonRef = React.useRef(null)
  const editorRef = React.createRef()

  const handleDepsLoaded = React.useCallback(() => {
    const carbon = carbonRef.current
    if (carbon && carbon.syncEditor) carbon.syncEditor()
  }, [])

  useModeLoader(handleDepsLoaded)
  useHighlightLoader(handleDepsLoaded)
  useShowInvisiblesLoader()
  useFontLoadRefresh(props, carbonRef)

  const onGutterClick = useSelectedLines(props, editorRef)

  return (
    <Carbon
      ref={carbonRef}
      {...props}
      innerRef={ref}
      editorRef={editorRef}
      onGutterClick={onGutterClick}
    />
  )
}

export default React.forwardRef(CarbonContainer)
