import api from './api'

const articlesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: (offset) => `/articles?offset=${offset}`,
    }),
  }),
  overrideExisting: false,
})

const { useGetArticlesQuery } = articlesApi

export default useGetArticlesQuery
