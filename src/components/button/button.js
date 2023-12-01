import React from 'react'

import styles from './button.module.scss'

function Button({ isLoading, text }) {
  return (
    <button type="submit" className={styles.button} disabled={isLoading}>
      {!isLoading && text}
    </button>
  )
}

export default Button
