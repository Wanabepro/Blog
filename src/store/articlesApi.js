/* eslint-disable no-unused-vars */
import api from './api'

const articlesApi = api.enhanceEndpoints({ addTagTypes: ['Article'] }).injectEndpoints({
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: (offset) => `/articles?offset=${offset}`,
      providesTags: (result) => {
        if (result) {
          return [...result.articles.map(({ slug: id }) => ({ type: 'Article', id }))]
        }

        return ['Article']
      },
    }),
    getArticle: builder.query({
      query: (slug) => `/articles/${slug}`,
      providesTags: (result, error, id) => [{ type: 'Article', id }],
    }),
    createArticle: builder.mutation({
      query: (body) => ({
        url: '/articles',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Article'],
    }),
    deleteArticle: builder.mutation({
      query: (slug) => ({
        url: `/articles/${slug}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Article', id }],
    }),
    updateArticle: builder.mutation({
      query: ({ slug, body }) => ({
        url: `/articles/${slug}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, { slug: id }) => [{ type: 'Article', id }],
    }),
    likeArticle: builder.mutation({
      query: (slug) => ({
        url: `/articles/${slug}/favorite`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Article', id }],
    }),
    unlikeArticle: builder.mutation({
      query: (slug) => ({
        url: `/articles/${slug}/favorite`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Article', id }],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetArticlesQuery,
  useGetArticleQuery,
  useCreateArticleMutation,
  useDeleteArticleMutation,
  useUpdateArticleMutation,
  useLikeArticleMutation,
  useUnlikeArticleMutation,
} = articlesApi
