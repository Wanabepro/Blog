import React, { useState } from 'react'

import styles from './newTag.module.scss'

function NewTag({ id, setTags }) {
  const [inputValue, setInputValue] = useState('')

  const onChange = (e) => {
    setInputValue(e.target.value)
  }

  const onDelete = () => {
    setTags((prev) => prev.filter((tag) => tag.id !== id))
  }

  const onBlur = () => {
    setTags((prev) => {
      const targetIndex = prev.findIndex((tag) => tag.id === id)
      return [
        ...prev.slice(0, targetIndex),
        { id, text: inputValue },
        ...prev.slice(targetIndex + 1),
      ]
    })
  }

  return (
    <div className={styles['new-tag']}>
      <input
        className={styles['new-tag__input']}
        type="text"
        placeholder="Tag"
        value={inputValue}
        onChange={onChange}
        onBlur={onBlur}
      />
      <div className={styles['new-tag__controls']}>
        <button
          className={`${styles['new-tag__button']} ${styles['new-tag__button--delete']}`}
          type="button"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default NewTag
