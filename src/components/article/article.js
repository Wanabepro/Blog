/* eslint-disable max-len */
import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Markdown from 'markdown-to-jsx'

import { useGetArticleQuery } from '../../store/articlesApi'
import { selectUsername } from '../../store/credentialsSlice'
import ArticleHeader from '../articleHeader'

import styles from './article.module.scss'

function Article() {
  const { slug } = useParams()

  const { isSuccess, data, isError, error } = useGetArticleQuery(slug)
  const username = useSelector(selectUsername)

  if (isSuccess) {
    const { description, body, ...rest } = data.article

    const isAuthor = username && username === rest.author.username

    return (
      <article className={styles.article}>
        <ArticleHeader {...rest} />
        <div className={styles['article__description-block']}>
          <p className={styles.article__description}>{description}</p>
          {isAuthor && (
            <div className={styles.article__controls}>
              <button
                type="button"
                className={`${styles.article__button} ${styles['article__button--delete']}`}
              >
                Delete
              </button>
              <button
                type="button"
                className={`${styles.article__button} ${styles['article__button--edit']}`}
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
    )
  }

  if (isError) {
    let errorMessage

    if (error.status === 'FETCH_ERROR') {
      errorMessage = error.error
    } else {
      errorMessage = error.data
    }

    return (
      <article className={styles.error}>
        <h1 className={styles.error__status}>{error.originalStatus || error.status}</h1>
        <p className={styles.error__message}>{errorMessage}</p>
      </article>
    )
  }
}

export default Article
