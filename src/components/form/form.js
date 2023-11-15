import React from 'react'

import styles from './form.module.scss'

function Form({ onSubmit, children }) {
  return (
    <form className={styles.form} action="" onSubmit={onSubmit}>
      {children}
    </form>
  )
}

export default Form
