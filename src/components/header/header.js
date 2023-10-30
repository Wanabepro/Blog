import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom'

import styles from './header.module.scss'

function Header() {
  const isAuthorized = false

  return (
    <header className={styles.header}>
      <h1 className={styles.header__heading}>Realworld Blog</h1>
      {!isAuthorized && (
        <div className={styles.header__authorization}>
          <Link className={styles.header__button} to="/sign-in">
            Sign In
          </Link>
          <Link to="/sign-up" className={`${styles.header__button} ${styles['header__button--accent']}`} type="button">
            Sign Up
          </Link>
        </div>
      )}
      {isAuthorized && (
        <div className={styles.header__authorized}>
          <button className={`${styles.header__button} ${styles['header__button--article']}`} type="button">
            Create article
          </button>
          <div className={styles['header__user-info']}>
            <span className={styles['header__user-name']}>John Doe</span>
            <img src="/assets/user.svg" alt="" />
          </div>
          <button className={`${styles.header__button} ${styles['header__button--secondary']}`} type="button">
            Log Out
          </button>
        </div>
      )}
    </header>
  )
}

export default Header
