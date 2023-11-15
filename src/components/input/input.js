import React from 'react'

import styles from './input.module.scss'

function Input({ label, type, placeholder, additionalClass = '', name, register, registerOptions = {}, errorMessage }) {
  const inputClasses = additionalClass ? `${styles['input-block']} ${additionalClass}` : styles['input-block']

  return (
    <label className={inputClasses}>
      <span>{label}</span>
      <input
        className={`${styles['input-block__input']} ${errorMessage ? styles['input-block__input--error'] : ''}`}
        type={type}
        placeholder={placeholder}
        {...register(name || label, registerOptions)}
      />
      {errorMessage && <span className={styles['input-block__error']}>{errorMessage}</span>}
    </label>
  )
}

export default Input
