/* eslint-disable no-unused-vars */
import api from './api'

const articlesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: (offset) => `/articles?offset=${offset}`,
    }),
    getArticle: builder.query({
      query: (slug) => `/articles/${slug}`,
    }),
    createArticle: builder.mutation({
      query: (body) => ({
        url: '/articles',
        method: 'POST',
        body,
      }),
    }),
    deleteArticle: builder.mutation({
      query: (slug) => ({
        url: `/articles/${slug}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetArticlesQuery,
  useGetArticleQuery,
  useCreateArticleMutation,
  useDeleteArticleMutation,
} = articlesApi
