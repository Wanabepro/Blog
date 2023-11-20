import api from './api'

const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({ url: '/users', method: 'POST', body }),
    }),
    login: builder.mutation({
      query: (body) => ({ url: '/users/login', method: 'POST', body }),
    }),
    getUser: builder.query({
      query: () => ({ url: '/user' }),
    }),
    updateUser: builder.mutation({
      query: (body) => ({
        url: '/user',
        method: 'PUT',
        body,
      }),
    }),
  }),
})

// prettier-ignore
export const {
  useRegisterMutation,
  useLoginMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} = usersApi
