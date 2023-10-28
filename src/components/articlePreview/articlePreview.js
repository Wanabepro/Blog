/* eslint-disable max-len */
import React from 'react'

import ArticleHeader from '../articleHeader'

import styles from './articlePreview.module.scss'

function ArticlePreview() {
  return (
    <article className={styles.article}>
      <ArticleHeader />
      <p className={styles.article__text}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci doloremque ipsam placeat a labore voluptas
        sequi optio saepe animi laudantium, recusandae earum, reprehenderit quidem accusamus exercitationem mollitia
        magni facere sunt.
      </p>
    </article>
  )
}

export default ArticlePreview
