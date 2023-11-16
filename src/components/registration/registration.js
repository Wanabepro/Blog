/* eslint-disable max-len */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import { useForm } from 'react-hook-form'

import useRegisterUserMutation from '../../store/usersApi'
import Form from '../form'
import Input from '../input'
import Button from '../button'
import Error from '../error'

import styles from './registration.module.scss'

function Registration() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm({ mode: 'all' })

  const password = watch('password')

  const [registerUser, { isSuccess, data, isError, error, reset }] = useRegisterUserMutation()

  const onSubmit = (userData) => {
    const user = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
    }

    registerUser({ user })
  }

  const [errorMessage, setErrorMessage] = useState('')
  useEffect(() => {
    if (error?.status === 422) {
      Object.entries(error.data.errors).forEach((entry) => {
        // eslint-disable-next-line prefer-const
        let [field, message] = entry

        message = `${field[0].toUpperCase()}${field.slice(1)} ${message.slice(0, -1)}`

        setError(field, { type: 'server', message })
      })
    } else {
      setErrorMessage(error?.error)
    }
  }, [isError])

  if (isSuccess) {
    const { username, email, token } = data.user
    localStorage.setItem('username', username)
    localStorage.setItem('email', email)
    localStorage.setItem('token', token)
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.registration__heading}>Create new account</h2>
        <Input
          label="Username"
          type="text"
          placeholder="Username"
          name="username"
          register={register}
          registerOptions={{
            required: 'Username is required',
            minLength: { value: 3, message: 'Username needs to be at least 3 characters' },
            maxLength: { value: 20, message: 'Username needs to be no more than 20 characters' },
          }}
          errorMessage={errors.username?.message}
        />
        <Input
          label="Email address"
          type="email"
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
          name="password"
          register={register}
          registerOptions={{
            required: 'Password is required',
            minLength: { value: 6, message: 'Your password needs to be at least 6 characters.' },
            maxLength: { value: 40, message: 'Password needs to be no more than 40 characters' },
          }}
          errorMessage={errors.password?.message}
        />
        <Input
          label="Repeat Password"
          type="password"
          placeholder="Password"
          additionalClass={styles.registration__block}
          name="repeatPassword"
          register={register}
          registerOptions={{
            required: 'Password is required',
            validate: (value) => value === password || 'Passwords must match',
          }}
          errorMessage={errors.repeatPassword?.message}
        />
        <div className={styles.registration__delimiter} />
        <label className={styles['registration__checkbox-label']}>
          <div className={styles['registration__checkbox-block']}>
            <input
              className={styles.registration__checkbox}
              type="checkbox"
              {...register('agreed', { required: 'You should agree with personal information processing policy' })}
            />
            <span>I agree to the processing of my personal information</span>
          </div>
          {errors.agreed && <p className={styles.registration__error}>{errors.agreed.message}</p>}
        </label>
        <Button text="Create" />
        <p className={styles.registration__redirect}>
          {'Already have an account? '}
          <Link to="/sign-in" className={styles.registration__link}>
            Sign in.
          </Link>
        </p>
      </Form>
      {isError && error.status !== 422 && <Error status={error?.status} message={errorMessage} reset={reset} />}
    </>
  )
}

export default Registration
