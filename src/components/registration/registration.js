import React from 'react'

import Form from '../form'
import Input from '../input'
import Button from '../button'

import styles from './registration.module.scss'

function Registration() {
  return (
    <Form>
      <h2 className={styles.registration__heading}>Create new account</h2>
      <Input label="Username" type="text" placeholder="Username" />
      <Input label="Email address" type="text" placeholder="Email address" />
      <Input label="Password" type="password" placeholder="Password" />
      <Input
        label="Repeat Password"
        type="password"
        placeholder="Password"
        additionalClass={styles.registration__block}
      />
      <div className={styles.registration__delimiter} />
      <label className={styles['registration__checkbox-block']}>
        <input className={styles.registration__checkbox} type="checkbox" placeholder="Username" />
        <span>I agree to the processing of my personal information</span>
      </label>
      <Button text="Create" />
      <p className={styles.registration__redirect}>
        {'Already have an account? '}
        <a className={styles.registration__link} href="google.com">
          Sign in.
        </a>
      </p>
    </Form>
  )
}

export default Registration
