/* eslint-disable max-len */
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { useUpdateUserMutation } from '../../store/usersApi'
import Form from '../form'
import Input from '../input'
import Button from '../button'
import Error from '../error'

import styles from './settings.module.scss'

function Settings() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    mode: 'all',
    defaultValues: {
      username: localStorage.getItem('username'),
      email: localStorage.getItem('email'),
      image: localStorage.getItem('image') || '',
    },
  })

  const [updateUser, { isSuccess, data, isError, error, reset }] = useUpdateUserMutation()

  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (error?.status === 422) {
      Object.entries(error.data.errors).forEach((entry) => {
        // eslint-disable-next-line prefer-const
        let [field, message] = entry

        message = `${field[0].toUpperCase()}${field.slice(1)} ${message.slice(0, -1)}`

        setError(field, { type: 'server', message })
      })
    } else if (error?.status === 401) {
      setErrorMessage(error?.data?.errors?.message)
    } else {
      setErrorMessage(error?.error)
    }
  }, [isError, error])

  const onSubmit = (user) => {
    updateUser({ user })
  }

  if (isSuccess) {
    Object.entries(data.user).forEach((entry) => localStorage.setItem(entry[0], entry[1]))
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.settings__heading}>Edit Profile</h2>
        <Input
          label="Username"
          type="text"
          placeholder="Username"
          name="username"
          register={register}
          registerOptions={{ required: 'Username is required' }}
          errorMessage={errors.username?.message}
        />
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
          label="New password"
          type="text"
          placeholder="Password"
          name="password"
          register={register}
          registerOptions={{
            minLength: { value: 6, message: 'Your password needs to be at least 6 characters.' },
            maxLength: { value: 40, message: 'Password needs to be no more than 40 characters' },
          }}
          errorMessage={errors.password?.message}
        />
        <Input
          label="Avatar image (url)"
          type="text"
          placeholder="URL"
          additionalClass={styles['settings__last-input']}
          name="image"
          register={register}
          registerOptions={{
            pattern: {
              value: /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/,
              message: 'Url should be correct',
            },
          }}
          errorMessage={errors.image?.message}
        />
        <Button text="Save" />
      </Form>
      {isError && error.status !== 422 && <Error message={errorMessage} status={error?.status} reset={reset} />}
    </>
  )
}

export default Settings
