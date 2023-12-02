import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import useCustomForm from '../../hooks/useCustomForm'
import { useUpdateUserMutation } from '../../store/usersApi'
import useServerErrorHandling from '../../hooks/useServerErrorHandling'
import Form from '../form'
import Input from '../input'
import Button from '../button'
import Error from '../error'
import { selectCredentials } from '../../store/credentialsSlice'

import styles from './settings.module.scss'

function Settings() {
  const { username, email, image } = useSelector(selectCredentials)

  const {
    register,
    handleSubmit,
    errors,
    setError,
    setValue,
    mutate: updateUser,
    isLoading,
    isError,
    error,
    reset,
  } = useCustomForm(useUpdateUserMutation)

  useEffect(() => {
    if (username) {
      setValue('username', username)
      setValue('email', email)
      setValue('image', image)
    }
  }, [username, email, image])

  const errorMessage = useServerErrorHandling(isError, error, setError)

  const onSubmit = (data) => {
    const user = { ...data }

    if (!user.password) {
      delete user.password
    }

    updateUser({ user })
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
        <Button isLoading={isLoading} text="Save" />
      </Form>
      {isError && error.status !== 422 && (
        <Error message={errorMessage} status={error?.status} reset={reset} />
      )}
    </>
  )
}

export default Settings
