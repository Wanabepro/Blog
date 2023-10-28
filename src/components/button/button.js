import React from 'react'

import styles from './button.module.scss'

function Button({ text }) {
  return (
    <button type="submit" className={styles.button}>
      {text}
    </button>
  )
}

export default Button
