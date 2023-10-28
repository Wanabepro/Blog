import React from 'react'

import Tag from '../tag'

import styles from './articleHeader.module.scss'

function ArticleHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.header__left}>
        <div className={styles['header__heading-block']}>
          <h2 className={styles.header__heading}>
            <a href="https://google.com">Some article title</a>
          </h2>
          <div className={styles.header__likes}>
            <img src="/assets/heart.svg" alt="like button" />
            <span>12</span>
          </div>
        </div>
        <ul>
          <li>
            <Tag text="Tag1" />
          </li>
        </ul>
      </div>
      <div className={styles.header__right}>
        <div className={styles['header__user-info']}>
          <p>John Doe</p>
          <p>March 5, 2020</p>
        </div>
        <img src="/assets/user.svg" alt="" />
      </div>
    </header>
  )
}

export default ArticleHeader
