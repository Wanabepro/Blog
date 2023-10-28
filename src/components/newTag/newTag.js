import React from 'react'

import styles from './newTag.module.scss'

function NewTag() {
  return (
    <div className={styles['new-tag']}>
      <input className={styles['new-tag__input']} type="text" placeholder="Tag" />
      <div className={styles['new-tag__controls']}>
        <button className={`${styles['new-tag__button']} ${styles['new-tag__button--delete']}`} type="button">
          Delete
        </button>
        <button className={`${styles['new-tag__button']} ${styles['new-tag__button--add']}`} type="button">
          Add tag
        </button>
      </div>
    </div>
  )
}

export default NewTag
