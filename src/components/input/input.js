import React from 'react'

import styles from './input.module.scss'

function Input({ label, type, placeholder, additionalClass = '' }) {
  const inputClasses = additionalClass ? `${styles['input-block']} ${additionalClass}` : styles['input-block']
  return (
    <label className={inputClasses}>
      <span>{label}</span>
      <input className={styles['input-block__input']} type={type} placeholder={placeholder} />
    </label>
  )
}

export default Input
