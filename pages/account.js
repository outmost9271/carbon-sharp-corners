// Theirs
import React from 'react'
import dynamic from 'next/dynamic'

// Ours
import Button from '../components/Button'
import Page from '../components/Page'
import MenuButton from '../components/MenuButton'
import { useAuth } from '../components/AuthContext'

import { loginGitHub, logout } from '../lib/client'
import { COLORS } from '../lib/constants'
import { t } from '../lib/i18n'

const Billing = dynamic(() => import('../components/Billing'), {
  loading: () => <div style={{ minHeight: '360px' }} />,
})

function logoutThunk() {
  return logout
}

const soon = <span title={t('account.comingSoon')}>ⓘ</span>

function Plan({ selectBilling }) {
  const user = useAuth()

  function handleSelectFree() {
    if (!user) {
      loginGitHub()
    }
  }

  function handleSelectUpgrade() {
    if (!user) {
      return loginGitHub()
    }

    selectBilling()
  }

  return (
    <div className="plan">
      <table>
        <thead>
          <tr>
            <td />
            <td>
              <h3>{t('account.free')}</h3>
            </td>
            <td>
              <h3 style={{ color: COLORS.BLUE }}>{t('account.diamond')}</h3>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{t('account.feature.pngSvg')}</td>
            <td>✔</td>
            <td>✔</td>
          </tr>
          <tr>
            <td>{t('account.feature.editor')}</td>
            <td>✔</td>
            <td>✔</td>
          </tr>
          <tr>
            <td>{t('account.feature.backgrounds')}</td>
            <td>✔</td>
            <td>✔</td>
          </tr>
          <tr>
            <td>{t('account.feature.gist')}</td>
            <td>✔</td>
            <td>✔</td>
          </tr>
          <tr>
            <td>{t('account.feature.snippets')}</td>
            <td>1000</td>
            <td>∞</td>
          </tr>
          <tr>
            <td>{t('account.feature.embed')}</td>
            <td>✔</td>
            <td>✔</td>
          </tr>
          <tr>
            <td>{t('account.feature.api')} {soon}</td>
            <td></td>
            <td>✔</td>
          </tr>
          <tr>
            <td>{t('account.feature.themes')} {soon}</td>
            <td></td>
            <td>✔</td>
          </tr>
          <tr>
            <td>{t('account.feature.twitterCard')} {soon}</td>
            <td></td>
            <td>✔</td>
          </tr>
          <tr>
            <td></td>
            <td>{t('account.freeForever')}</td>
            <td>{t('account.perMonth')}</td>
          </tr>
          <tr>
            <td></td>
            <td>
              <Button
                large
                margin="0 auto"
                center
                border
                padding="4px 8px"
                color="white"
                disabled={user && user.plan === 'free'}
                onClick={handleSelectFree}
              >
                {user ? t('account.current') : t('account.getStarted')}
              </Button>
            </td>
            <td>
              <Button
                large
                margin="0 auto"
                center
                border
                padding="4px 8px"
                color={COLORS.BLUE}
                disabled={user && user.plan === 'diamond'}
                onClick={handleSelectUpgrade}
              >
                {t('account.upgrade')}
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
      <style jsx>
        {`
          table {
            width: 100%;
          }
          td {
            font-size: 14px;
            padding: 0.5rem 0.5rem 0.5rem 1rem;
          }
          tr:nth-of-type(odd) {
            background: ${COLORS.HOVER};
          }
          thead tr {
            background: ${COLORS.BLACK};
          }

          tr td:not(:last-of-type) {
            border-right: 1px solid white;
          }

          tr td:not(:nth-child(1)) {
            text-align: center;
            padding: 0.5rem 1rem;
          }
          h3 {
            margin: 0;
          }

          table :global(button) {
            text-transform: uppercase;
            font-size: 16px;
          }
        `}
      </style>
    </div>
  )
}

function Settings() {
  const [selected, select] = React.useState('Plan')
  const user = useAuth()

  function selectMenu(name) {
    return () => select(name)
  }
  return (
    <div className="editor">
      <div className="settings-bottom">
        <div className="settings-menu">
          <MenuButton
            name="Plan"
            label={t('account.plan')}
            select={selectMenu}
            selected={selected}
          ></MenuButton>
          <MenuButton
            name="Billing"
            label={t('account.billing')}
            select={selectMenu}
            selected={selected}
          ></MenuButton>

          {/* <MenuButton name="API Keys" select={selectMenu} selected={selected} /> */}
          {user && (
            <MenuButton
              name="Sign Out"
              label={t('account.signOut')}
              select={logoutThunk}
              selected={selected}
              noArrows
            />
          )}
        </div>
        <div className="content">
          {selected === 'Plan' && <Plan selectBilling={selectMenu('Billing')} />}
          {selected === 'Billing' && <Billing />}
        </div>
      </div>
      {user && <img className="avatar" src={user.photoURL} alt={user.displayName} />}
      <style jsx>
        {`
          .editor {
            position: relative;
            background: ${COLORS.BLACK};
            border: 3px solid ${COLORS.SECONDARY};
            border-radius: 8px;
            width: auto;
          }

          .settings-container {
            position: relative;
          }

          .settings-bottom {
            display: flex;
            border-radius: 8px;
            overflow: hidden;
          }

          .settings-menu {
            display: flex;
            flex-direction: column;
            flex: 0 0 96px;
            background-color: ${COLORS.DARK_GRAY};
          }

          .content {
            width: 580px;
            border-left: 3px solid ${COLORS.SECONDARY};
          }

          .avatar {
            position: absolute;
            width: 64px;
            height: 64px;
            border-radius: 50%;
            background: ${COLORS.BLACK};
            border: 3px solid ${COLORS.SECONDARY};
            top: -40px;
            right: -40px;
          }
        `}
      </style>
    </div>
  )
}

function SettingsPage() {
  return (
    <Page flex={true}>
      <Settings />
    </Page>
  )
}

export default SettingsPage
