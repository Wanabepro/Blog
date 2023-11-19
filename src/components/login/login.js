import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import { useForm } from 'react-hook-form'

import { useLoginMutation } from '../../store/usersApi'
import Form from '../form'
import Input from '../input'
import Button from '../button'
import Error from '../error'

import styles from './login.module.scss'

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'all' })

  const [login, { isSuccess, data, isError, error, reset }] = useLoginMutation()

  const onSubmit = (userData) => {
    const user = {
      email: userData.email,
      password: userData.password,
    }

    login({ user })
  }

  let errorMessage

  if (isError) {
    if (error.status === 422) {
      const [[begin, end]] = Object.entries(error.data.errors)
      errorMessage = `${begin[0].toUpperCase()}${begin.slice(1)} ${end}`
    } else {
      errorMessage = error?.error
    }
  }

  if (isSuccess) {
    Object.entries(data.user).forEach((entry) => localStorage.setItem(entry[0], entry[1]))
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.login__heading}>Sign In</h2>
        <Input
          label="Email address"
          type="text"
          placeholder="Email address"
          name="email"
          register={register}
          registerOptions={{
            required: 'Email is required',
            pattern: {
              value:
                /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
              message: 'Email should be correct',
            },
          }}
          errorMessage={errors.email?.message}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Password"
          additionalClass={styles['login__last-input']}
          name="password"
          register={register}
          registerOptions={{ required: 'Password is required' }}
          errorMessage={errors.password?.message}
        />
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
      {isError && <Error status={error?.status} message={errorMessage} reset={reset} />}
    </>
  )
}

export default Login
