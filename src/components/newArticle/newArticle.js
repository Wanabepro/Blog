import React from 'react'

import Input from '../input'
import NewTag from '../newTag'

import styles from './newArticle.module.scss'

function NewArticle() {
  return (
    <form className={styles['new-article']} action="">
      <h2 className={styles['new-article__heading']}>Create new article</h2>
      <Input label="Title" type="text" placeholder="Title" additionalClass={styles['new-article__input']} />
      <Input
        label="Short description"
        type="text"
        placeholder="Description"
        additionalClass={styles['new-article__input']}
      />
      <label className={styles['new-article__text-block']}>
        <span className={styles['new-article__text-label']}>Text</span>
        <textarea className={styles['new-article__text']} placeholder="Text" />
      </label>
      <span className={styles['new-article__tags-header']}>Tags</span>
      <NewTag />
    </form>
  )
}

export default NewArticle
