/* eslint-disable operator-linebreak */
import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom'

import Tag from '../tag'

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
  return (
    <header className={styles.header}>
      <div className={styles.header__left}>
        <div className={styles['header__heading-block']}>
          <h2 className={styles.header__heading}>
            <Link to={`/articles/${slug}`}>{title}</Link>
          </h2>
          <div className={styles.header__likes}>
            <img src={`/assets/heart${favorited ? '-red' : ''}.svg`} alt="like button" />
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
  )
}

export default ArticleHeader
