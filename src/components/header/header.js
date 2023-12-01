import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom/cjs/react-router-dom'

import { resetCredentials, selectCredentials } from '../../store/credentialsSlice'
import api from '../../store/api'

import styles from './header.module.scss'

function Header() {
  const dispatch = useDispatch()
  const { token, username, image } = useSelector(selectCredentials)

  const onLogout = () => {
    dispatch(resetCredentials())
    dispatch(api.util.resetApiState())
    localStorage.clear()
  }

  return (
    <header className={styles.header}>
      <h1 className={styles.header__heading}>
        <Link to="/articles">Realworld Blog</Link>
      </h1>
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
            <Link className={styles['header__user-name']} to="/profile">
              {username}
            </Link>
            <Link className={styles['header__user-avatar']} to="/profile">
              <img src={image} alt="Your avatar" />
            </Link>
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
