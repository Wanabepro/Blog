import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom/cjs/react-router-dom'

import { resetCredentials, selectCredentials } from '../../store/credentialsSlice'

import styles from './header.module.scss'

function Header() {
  const dispatch = useDispatch()
  const { token, username, image } = useSelector(selectCredentials)

  const onLogout = () => {
    dispatch(resetCredentials())
    localStorage.clear()
  }

  return (
    <header className={styles.header}>
      <h1 className={styles.header__heading}>Realworld Blog</h1>
      {!token && (
        <div className={styles.header__authorization}>
          <Link className={styles.header__button} to="/sign-in">
            Sign In
          </Link>
          <Link
            to="/sign-up"
            className={`${styles.header__button} ${styles['header__button--accent']}`}
            type="button"
          >
            Sign Up
          </Link>
        </div>
      )}
      {token && (
        <div className={styles.header__authorized}>
          <Link
            className={`${styles.header__button} ${styles['header__button--article']}`}
            to="/new-article"
          >
            Create article
          </Link>
          <div className={styles['header__user-info']}>
            <span className={styles['header__user-name']}>{username}</span>
            <img src={image || '/assets/user.svg'} alt="" />
          </div>
          <button
            className={`${styles.header__button} ${styles['header__button--secondary']}`}
            type="button"
            onClick={onLogout}
          >
            Log Out
          </button>
        </div>
      )}
    </header>
  )
}

export default Header
