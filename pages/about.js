import React from 'react'
import Page from '../components/Page'
import { t } from '../lib/i18n'

function Contributors() {
  const [contributors, setContributors] = React.useState([])

  React.useEffect(() => {
    fetch('https://api.github.com/repos/carbon-app/carbon/contributors?per_page=100')
      .then(response => response.json())
      .then(contributors =>
        setContributors(contributors.filter(contributor => !contributor.login.endsWith('[bot]')))
      )
  }, [])

  return (
    <div>
      {contributors.map(contributor => (
        <a key={contributor.id} href={contributor.html_url} target="_blank" rel="noreferrer">
          <img alt={contributor.login} className="contributor" src={contributor.avatar_url} />
        </a>
      ))}
      <style jsx>
        {`
          .contributor {
            border-radius: 50%;
            border: 2px solid white;
            width: 32px;
            height: 32px;
            margin-right: 12px;
            transition: all 300ms ease;
            margin-bottom: 8px;
          }

          .contributor:hover {
            opacity: 0.8;
          }
        `}
      </style>
    </div>
  )
}

export default function About() {
  return (
    <Page>
      <div className="about">
        <div className="mb4">
          <h2>{t('about.title')}</h2>
          <p>{t('about.intro')}</p>
          <p>
            {t('about.description')}{' '}
            <span role="img" aria-label={t('about.paletteAlt')}>
              🎨
            </span>
          </p>
        </div>
        <div className="mb4">
          <h2>{t('about.whoTitle')}</h2>
          <p>
            {t('about.whoBodyPrefix')}
            <img
              className="mt2"
              width="508px"
              src="/static/svg/open-source-companies-2.svg"
              alt={t('about.companiesAlt')}
            />
          </p>
        </div>
        <div className="mb4">
          <h2>{t('about.howTitle')}</h2>
          <h4 className="mb0 mt3">{t('about.import')}</h4>
          <p className="mb1 mt2">{t('about.importIntro')}</p>
          <ul className="mt0 mb3">
            <li>{t('about.importDrop')}</li>
            <li>
              {t('about.importGistPrefix')}
              <a className="link" href="/3208813b324d82a9ebd197e4b1c3bae8">
                {t('about.importGistLink')}
              </a>
              {t('about.importGistSuffix')}
            </li>
            <li>{t('about.importPaste')}</li>
          </ul>
          <h4 className="mb0 mt4">{t('about.customization')}</h4>
          <p className="mt2 mb3">{t('about.customizationBody')}</p>
          <p className="mt2 mb3">{t('about.customizationDrop')}</p>
          <h4 className="mb0 mt4">{t('about.export')}</h4>
          <p className="mt2 mb3">{t('about.exportBody')}</p>
          <p className="mt2 mb3">
            {t('about.exportTweetPrefix')}
            <a
              className="link"
              href="https://help.twitter.com/en/using-twitter/picture-descriptions"
            >
              {t('about.exportTweetLink')}
            </a>
            {t('about.exportTweetSuffix')}
          </p>
          <p className="mt2 mb3">
            {t('about.exportA11yPrefix')}
            <a
              className="link"
              href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details"
            >
              {t('about.exportA11yLink')}
            </a>
            {t('about.exportA11ySuffix')}
          </p>
          <h4 className="mb0 mt4" id="shortcuts">
            {t('about.shortcuts')}
          </h4>
          <table className="mt2 mb3">
            <tbody>
              <tr>
                <td>{t('about.shortcut.openSettings')}</td>
                <td>
                  <kbd>⌘ /</kbd>
                </td>
              </tr>
              <tr>
                <td>{t('about.shortcut.exportPng')}</td>
                <td>
                  <kbd>⇧ ⌘ E</kbd>
                </td>
              </tr>
              <tr>
                <td>{t('about.shortcut.exportSvg')}</td>
                <td>
                  <kbd>⇧ ⌘ S</kbd>
                </td>
              </tr>
              <tr>
                <td>{t('about.shortcut.saveSnippet')}</td>
                <td>
                  <kbd>⌥ S</kbd>
                </td>
              </tr>
              <tr>
                <td>{t('about.shortcut.copyImage')}</td>
                <td>
                  <kbd>⇧ ⌘ C</kbd>
                </td>
              </tr>
              <tr>
                <td>{t('about.shortcut.reset')}</td>
                <td>
                  <kbd>⇧ ⌘ \</kbd>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h2>{t('about.improveTitle')}</h2>
          <p>
            <a className="link" href="https://github.com/carbon-app/carbon#contribute--support">
              {t('about.contributors')}
            </a>
          </p>
          <br />
          <Contributors />
        </div>
      </div>
      <style jsx>
        {`
          .about {
            font-size: 16px;
            max-width: 632px;
            margin: 0 auto var(--x4);
          }

          @media (max-width: 768px) {
            .about {
              max-width: 90vw;
            }
          }

          img {
            max-width: 100%;
          }

          h2 {
            font-weight: bold;
            font-size: 32px;
          }
          h4 {
            font-weight: bold;
          }

          p,
          li {
            color: #fff;
          }

          ul {
            list-style-position: inside;
            list-style-type: circle;
          }

          span {
            color: #fff;
          }

          td {
            padding: 0.25rem 0;
          }

          kbd {
            margin-left: var(--x3);
            letter-spacing: 0.1em;
          }
        `}
      </style>
    </Page>
  )
}
