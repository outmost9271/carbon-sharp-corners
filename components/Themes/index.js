import React from 'react'
import dynamic from 'next/dynamic'

import GlobalHighlights from './GlobalHighlights'
import Dropdown from '../Dropdown'
import { managePopout } from '../Popout'
import ReferralLink from '../ReferralLink'
import ThemeIcon from '../svg/Theme'
import RemoveIcon from '../svg/Remove'
import { COLORS } from '../../lib/constants'
import { t } from '../../lib/i18n'

const ThemeCreate = dynamic(() => import('./ThemeCreate'), {
  loading: () => null,
})

const ThemeItem = ({ children, item, isSelected, remove }) => (
  <div className="theme-item">
    {children}
    {item.referral && (
      <div style={{ margin: `0 ${isSelected ? 8 : 0}px 0 8px` }}>
        <ReferralLink href={item.referral}>{t('settings.editor.purchase')}</ReferralLink>
      </div>
    )}
    {item.custom && !isSelected && (
      <div
        role="button"
        tabIndex={0}
        className="icon"
        onClick={e => {
          e.stopPropagation()
          remove(item.id)
        }}
      >
        <RemoveIcon color={COLORS.SECONDARY} style={{ transform: 'scale(1.6)' }} />
      </div>
    )}
    <style jsx>
      {`
        .theme-item {
          display: flex;
          flex: 1;
          justify-content: ${item.id === 'create' ? 'center' : 'space-between'};
          align-items: center;
        }

        .icon {
          display: flex;
          margin-right: 6px;
        }
      `}
    </style>
  </div>
)

const themeIcon = <ThemeIcon />

const getCustomName = themes =>
  `${t('theme.customPlaceholder')} ${themes.filter(({ name }) => name.startsWith(t('theme.customPlaceholder'))).length + 1}`

class Themes extends React.PureComponent {
  state = {
    name: '',
  }

  dropdown = React.createRef()

  static getDerivedStateFromProps(props) {
    if (!props.isVisible) {
      return {
        name: getCustomName(props.themes),
      }
    }
    return null
  }

  handleThemeSelected = theme => {
    if (theme) {
      const { toggleVisibility, update } = this.props
      if (theme.id === 'create') {
        toggleVisibility()
        this.dropdown.current.closeMenu()
      } else {
        update(theme.id)
      }
    }
  }

  create = theme => {
    this.props.toggleVisibility()
    this.props.create(theme)
  }

  itemWrapper = props => <ThemeItem {...props} remove={this.props.remove} />

  render() {
    const { themes, theme, isVisible, toggleVisibility } = this.props

    const highlights = { ...theme.highlights, ...this.props.highlights }

    const dropdownValue = isVisible ? { name: this.state.name } : theme

    const dropdownList = [
      {
        id: 'create',
        name: t('theme.create'),
      },
      ...themes,
    ]

    return (
      <div className="themes" data-cy="themes-container">
        <Dropdown
          title={t('editor.theme')}
          innerRef={this.dropdown}
          icon={themeIcon}
          disableInput={isVisible}
          selected={dropdownValue}
          list={dropdownList}
          itemWrapper={this.itemWrapper}
          onChange={this.handleThemeSelected}
          onOpen={isVisible && toggleVisibility}
        />
        {isVisible && (
          <ThemeCreate
            theme={theme}
            themes={themes}
            highlights={highlights}
            create={this.create}
            updateHighlights={this.props.updateHighlights}
            name={this.state.name}
            onInputChange={e => this.setState({ name: e.target.value })}
          />
        )}
        <GlobalHighlights highlights={highlights} />
        <style jsx>
          {`
            .themes {
              position: relative;
            }
          `}
        </style>
      </div>
    )
  }
}

export default managePopout(Themes)
