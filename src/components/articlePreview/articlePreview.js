/* eslint-disable max-len */
import React from 'react'

import ArticleHeader from '../articleHeader'

import styles from './articlePreview.module.scss'

function ArticlePreview({ description, ...headerProps }) {
  return (
    <article className={styles.article}>
      <ArticleHeader {...headerProps} />
      <p className={styles.article__text}>{description}</p>
    </article>
  )
}

export default ArticlePreview
