/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { Pagination, Space } from 'antd'

import { useGetArticlesQuery } from '../../store/articlesApi'
import ArticlePreview from '../articlePreview'

import styles from './aticleList.module.scss'

function ArticleList() {
  const [page, setPage] = useState(1)
  const { data } = useGetArticlesQuery((page - 1) * 20)
  if (data) {
    const { articles, articlesCount: total } = data

    return (
      <>
        <ul className={styles.list}>
          {articles.map((article) => (
            <li key={article.slug}>
              <ArticlePreview {...article} />
            </li>
          ))}
        </ul>
        <Space direction="horizontal" style={{ width: '100%', justifyContent: 'center' }}>
          <Pagination
            onChange={() => setPage((prevPage) => prevPage + 1)}
            hideOnSinglePage
            current={page}
            pageSize={20}
            total={total}
            showSizeChanger={false}
          />
        </Space>
      </>
    )
  }
}

export default ArticleList
