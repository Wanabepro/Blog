import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const articlesApi = createApi({
  reducerPath: 'tickets',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.kata.academy/api/' }),
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: (offset) => `/articles?offset=${offset}`,
    }),
  }),
})

export const { useGetArticlesQuery } = articlesApi

export default articlesApi
