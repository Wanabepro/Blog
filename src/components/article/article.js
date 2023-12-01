import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Popconfirm } from 'antd'
import Markdown from 'markdown-to-jsx'

import { useDeleteArticleMutation, useGetArticleQuery } from '../../store/articlesApi'
import { selectUsername } from '../../store/credentialsSlice'
import Spinner from '../spinner'
import ArticleHeader from '../articleHeader'
import Error from '../error'

import styles from './article.module.scss'

function Article() {
  const { slug } = useParams()

  const history = useHistory()

  const {
    isFetching: isQueryLoading,
    isSuccess: isQuerySuccess,
    data: queryData,
    isError: queryIsError,
    error: queryError,
  } = useGetArticleQuery(slug)

  const [
    deleteArticle,
    {
      isSuccess: deletionIsSuccess,
      isError: deletionIsError,
      error: deletionError,
      reset: deletionReset,
    },
  ] = useDeleteArticleMutation()

  const username = useSelector(selectUsername)

  useEffect(() => {
    if (deletionIsSuccess) {
      history.push('/articles')
    }
  }, [deletionIsSuccess])

  if (isQueryLoading) {
    return <Spinner />
  }

  if (isQuerySuccess) {
    const { description, body, ...rest } = queryData.article

    const isAuthor = username && username === rest.author.username

    let errorMessage

    if (deletionIsError) {
      if (deletionError.status === 'FETCH_ERROR') {
        errorMessage = deletionError.error
      } else {
        errorMessage = deletionError.data
      }
    }

    const onEdit = () => {
      history.push(`/articles/${slug}/edit`)
    }

    return (
      <>
        <article className={styles.article}>
          <ArticleHeader {...rest} />
          <div className={styles['article__description-block']}>
            <p className={styles.article__description}>{description}</p>
            {isAuthor && (
              <div className={styles.article__controls}>
                <Popconfirm
                  description="Are you sure to delete this article?"
                  placement="right"
                  onConfirm={() => deleteArticle(slug)}
                  okText="Yes"
                  cancelText="No"
                >
                  <button
                    type="button"
                    className={`${styles.article__button} ${styles['article__button--delete']}`}
                  >
                    Delete
                  </button>
                </Popconfirm>
                <button
                  type="button"
                  className={`${styles.article__button} ${styles['article__button--edit']}`}
                  onClick={onEdit}
                >
                  Edit
                </button>
              </div>
            )}
          </div>
          <div className={styles.article__text}>
            <Markdown>{body}</Markdown>
          </div>
        </article>
        {deletionIsError && (
          <Error
            status={deletionError.originalStatus || deletionError.status}
            message={errorMessage}
            reset={deletionReset}
          />
        )}
      </>
    )
  }

  if (queryIsError) {
    let errorMessage

    if (queryError.status === 'FETCH_ERROR') {
      errorMessage = queryError.error
    } else {
      errorMessage = queryError.data
    }

    return (
      <article className={styles.error}>
        <h1 className={styles.error__status}>{queryError.originalStatus || queryError.status}</h1>
        <p className={styles.error__message}>{errorMessage}</p>
      </article>
    )
  }
}

export default Article
