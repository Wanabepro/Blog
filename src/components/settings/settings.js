import React from 'react'

import Form from '../form'
import Input from '../input'
import Button from '../button'

import styles from './settings.module.scss'

function Settings() {
  return (
    <Form>
      <h2 className={styles.settings__heading}>Edit Profile</h2>
      <Input label="Username" type="text" placeholder="Username" />
      <Input label="Email address" type="text" placeholder="Email address" />
      <Input label="New password" type="password" placeholder="Password" />
      <Input
        label="Avatar image (url)"
        type="text"
        placeholder="URL"
        additionalClass={styles['settings__last-input']}
      />
      <Button text="Save" />
    </Form>
  )
}

export default Settings
