import api from './api'

const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({ url: '/users', method: 'POST', body }),
    }),
    login: builder.mutation({
      query: (body) => ({ url: '/users/login', method: 'POST', body }),
    }),
  }),
})

export const { useRegisterMutation, useLoginMutation } = usersApi
