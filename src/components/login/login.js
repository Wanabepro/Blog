import React from 'react'

import Form from '../form'
import Input from '../input'
import Button from '../button'

import styles from './login.module.scss'

function Login() {
  return (
    <Form>
      <h2 className={styles.login__heading}>Sign In</h2>
      <Input label="Email address" type="text" placeholder="Email address" />
      <Input label="Password" type="password" placeholder="Password" additionalClass={styles['login__last-input']} />
      <Button text="Login" />
      <p className={styles.login__redirect}>
        {
          // eslint-disable-next-line quotes
          "Don't have an account? "
        }
        <a className={styles.login__link} href="google.com">
          Sign in.
        </a>
      </p>
    </Form>
  )
}

export default Login
