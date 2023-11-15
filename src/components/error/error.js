import React from 'react'

import styles from './error.module.scss'

function Error({ status, message = 'Something goes wrong', reset }) {
  return (
    <div className={styles.error}>
      <div className={styles.error__container}>
        <h2 className={styles.error__header}>Error ocurred!</h2>
        <button type="button" className={styles.error__close} onClick={reset}>
          Close
        </button>
      </div>
      {status && <p className={styles.error__status}>{`Status: ${status}`}</p>}
      <p className={styles.error__message}>{message}</p>
    </div>
  )
}

export default Error
