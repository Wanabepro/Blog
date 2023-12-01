/* eslint-disable no-unused-vars */
import api from './api'

const likesOnQueryStarted = async (slug, { dispatch, queryFulfilled, getState }) => {
  const {
    data: { article },
  } = await queryFulfilled

  const arg = api.util
    .selectInvalidatedBy(getState(), [{ type: 'Article', id: slug }])
    .find((item) => item.endpointName === 'getArticles')?.originalArgs

  dispatch(
    api.util.updateQueryData('getArticles', arg, (draft) => {
      draft.articles.find((article) => article.slug === slug).favorited = article.favorited
    }),
  )

  dispatch(
    api.util.updateQueryData('getArticle', slug, (draft) => {
      draft.article.favorited = article.favorited
    }),
  )
}

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
      onQueryStarted: likesOnQueryStarted,
    }),
    unlikeArticle: builder.mutation({
      query: (slug) => ({
        url: `/articles/${slug}/favorite`,
        method: 'DELETE',
      }),
      onQueryStarted: likesOnQueryStarted,
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
