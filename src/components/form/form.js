import React from 'react'

import styles from './form.module.scss'

function Form({ children }) {
  return (
    <form className={styles.form} action="">
      {children}
    </form>
  )
}

export default Form
