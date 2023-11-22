import api from './api'

const articlesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: (offset) => `/articles?offset=${offset}`,
    }),
    createArticle: builder.mutation({
      query: (body) => ({
        url: '/articles',
        method: 'POST',
        body,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetArticlesQuery, useCreateArticleMutation } = articlesApi
