import React from 'react'
import { Pagination } from 'antd'

import ArticlePreview from '../articlePreview'

import styles from './aticleList.module.scss'

function ArticleList() {
  return (
    <>
      <ul className={styles.list}>
        <li>
          <ArticlePreview />
        </li>
        <li>
          <ArticlePreview />
        </li>
        <li>
          <ArticlePreview />
        </li>
      </ul>
      <Pagination hideOnSinglePage current={1} pageSize={20} total={40} />
    </>
  )
}

export default ArticleList
