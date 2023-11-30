import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useGetArticleQuery } from '../store/articlesApi'

function useDefaultValues() {
  const { slug } = useParams()

  const { data } = useGetArticleQuery(slug)

  const [defaultValues, setDefaultValues] = useState({
    title: '',
    description: '',
    body: '',
  })

  const [tagList, setTagList] = useState([])

  useEffect(() => {
    if (slug && data) {
      setDefaultValues({
        title: data.article.title,
        description: data.article.description,
        body: data.article.body,
      })

      setTagList(data.article.tagList.map((tag, index) => ({ id: index, text: tag })))
    }
  }, [slug, data])

  return { slug, defaultValues, tagList }
}

export default useDefaultValues
