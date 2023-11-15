import api from './api'

const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (body) => ({ url: '/users', method: 'POST', body }),
    }),
  }),
})

const { useRegisterUserMutation } = usersApi

export default useRegisterUserMutation
