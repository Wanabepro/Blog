/* eslint-disable operator-linebreak */
import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom'

import { useLikeArticleMutation, useUnlikeArticleMutation } from '../../store/articlesApi'
import Tag from '../tag'
import Error from '../error'

import styles from './articleHeader.module.scss'

function ArticleHeader({
  title,
  tagList: tags,
  slug,
  updatedAt,
  favorited,
  favoritesCount,
  author: { username, image },
}) {
  const [like, { isError: likeIsError, error: likeError, reset: likeReset }] =
    useLikeArticleMutation()
  const [unlike, { isError: unlikeIsError, error: unlikeError, reset: unlikeReset }] =
    useUnlikeArticleMutation()

  const isError = likeIsError || unlikeIsError

  const history = useHistory()
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (likeIsError) {
      const { status } = likeError
      if (status === 401) {
        history.push('/sign-in')
      } else if (status === 422) {
        setErrorMessage(likeError.data.errors.message)
      } else {
        setErrorMessage(likeError.error)
      }
    }
  }, [likeIsError, likeError])

  useEffect(() => {
    if (unlikeIsError) {
      const { status } = unlikeError
      if (status === 401) {
        history.push('/sign-in')
      } else if (status === 422) {
        setErrorMessage(unlikeError.data.errors.message)
      } else {
        setErrorMessage(unlikeError.error)
      }
    }
  }, [unlikeIsError, unlikeError])

  const resetErrors = () => {
    likeReset()
    unlikeReset()
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__left}>
          <div className={styles['header__heading-block']}>
            <h2 className={styles.header__heading}>
              <Link to={`/articles/${slug}`}>{title.trim() || 'Article without heading'}</Link>
            </h2>
            <div className={styles.header__likes}>
              {favorited && (
                <button
                  type="button"
                  className={`${styles['header__like-button']} ${styles['header__like-button--unlike']}`}
                  onClick={() => unlike(slug)}
                >
                  Unlike
                </button>
              )}
              {!favorited && (
                <button
                  type="button"
                  className={`${styles['header__like-button']} ${styles['header__like-button--like']}`}
                  onClick={() => like(slug)}
                >
                  Like
                </button>
              )}
              <span>{favoritesCount}</span>
            </div>
          </div>
          <ul className={styles.header__tags}>
            {!!tags.length &&
              Array.from(new Set(tags))
                .filter(Boolean)
                .map((tag) => (
                  <li key={tag}>
                    <Tag text={tag} />
                  </li>
                ))}
          </ul>
        </div>
        <div className={styles.header__right}>
          <div className={styles['header__user-info']}>
            <p>{username}</p>
            <p>
              {new Date(updatedAt).toLocaleDateString('en-UA', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          <img className={styles.header__img} src={image || '/assets/user.svg'} alt="" />
        </div>
      </header>
      {isError && (
        <Error
          status={likeError?.status || unlikeError?.status}
          message={errorMessage}
          reset={resetErrors}
        />
      )}
    </>
  )
}

export default ArticleHeader
