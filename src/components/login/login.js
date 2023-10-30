import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom'

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
        <Link to="/sign-up" className={styles.login__link}>
          Sign up.
        </Link>
      </p>
    </Form>
  )
}

export default Login
