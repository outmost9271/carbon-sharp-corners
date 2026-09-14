import React from 'react'
import Button from './Button'
import { t } from '../lib/i18n'

export default function ConfirmButton(props) {
  const [confirmed, setConfirmed] = React.useState(false)
  return (
    <Button
      {...props}
      onClick={e => {
        if (confirmed) {
          props.onClick(e)
          setConfirmed(false)
        } else {
          setConfirmed(true)
        }
      }}
      onBlur={() => setConfirmed(false)}
    >
      {confirmed ? t('common.areYouSure') : props.children}
    </Button>
  )
}
