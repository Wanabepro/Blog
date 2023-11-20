import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog.kata.academy/api/',
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().credentials

      if (token) {
        headers.set('authorization', `Token ${token}`)
      }

      return headers
    },
  }),
  endpoints: () => ({}),
})

export default api
