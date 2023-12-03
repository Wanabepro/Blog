import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { setupCredentials } from '../store/credentialsSlice'

function useCustomForm(useMutation, redirectTo, way = []) {
  const dispatch = useDispatch()

  const history = useHistory()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
    setValue,
    reset: resetForm,
  } = useForm({ mode: 'all' })

  const [mutate, { isLoading, isSuccess, data, isError, error, reset }] = useMutation()

  useEffect(() => {
    if (isSuccess) {
      if (data.user) {
        localStorage.setItem('token', data.user.token)
        dispatch(setupCredentials(data.user))
      }
      if (redirectTo) {
        let location = redirectTo
        const additional = way.reduce((acc, step) => acc[step], data)
        location += additional === data ? '' : `/${additional}`

        history.push(location)
      }
    }
  }, [isSuccess, data])

  return {
    register,
    handleSubmit,
    errors,
    setError,
    watch,
    setValue,
    resetForm,
    mutate,
    isLoading,
    isError,
    error,
    reset,
  }
}

export default useCustomForm
