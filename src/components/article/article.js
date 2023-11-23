/* eslint-disable max-len */
import React from 'react'
import { useParams } from 'react-router-dom'
import Markdown from 'markdown-to-jsx'

import { useGetArticleQuery } from '../../store/articlesApi'
import ArticleHeader from '../articleHeader'

import styles from './article.module.scss'

function Article() {
  const { slug } = useParams()

  const { isSuccess, data, isError, error } = useGetArticleQuery(slug)

  if (isSuccess) {
    const { description, body, ...rest } = data.article
    console.log(body)
    return (
      <article className={styles.article}>
        <ArticleHeader {...rest} />
        <div className={styles['article__description-block']}>
          <p className={styles.article__description}>{description}</p>
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
        </div>
        <div className={styles.article__text}>
          <Markdown>{body}</Markdown>
        </div>
      </article>
    )
  }

  if (isError) {
    console.log(error)
  }
}

export default Article
