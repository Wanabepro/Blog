import { useState, useEffect } from 'react'

function useServerErrorHandling(isError, error, setError) {
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (isError) {
      if (error.status === 422) {
        Object.entries(error.data.errors).forEach((entry) => {
          // eslint-disable-next-line prefer-const
          let [field, message] = entry

          message = `${field[0].toUpperCase()}${field.slice(1)} ${message.slice(0, -1)}`

          setError(field, { type: 'server', message })
        })
      } else if (error.status === 401) {
        setErrorMessage(error.data.errors?.message)
      } else {
        setErrorMessage(error.error)
      }
    }
  }, [isError, error])

  return errorMessage
}

export default useServerErrorHandling
