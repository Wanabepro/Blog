import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import Spinner from '../spinner'
import Input from '../input'
import NewTag from '../newTag'
import Button from '../button'
import Error from '../error'
import {
  useCreateArticleMutation,
  useGetArticleQuery,
  useUpdateArticleMutation,
} from '../../store/articlesApi'

import styles from './newArticle.module.scss'

function NewArticle() {
  const history = useHistory()

  const { slug } = useParams()

  const { data, isFetching: isQueryLoading } = useGetArticleQuery(slug, { skip: !slug })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()

  const [tags, setTags] = useState([])
  const [currentTagId, setCurrentTagId] = useState(0)

  useEffect(() => {
    if (data) {
      const { title, description, body, tagList } = data.article
      setValue('title', title)
      setValue('description', description)
      setValue('body', body)
      setTags(tagList.map((tag, index) => ({ id: index, text: tag })))
      setCurrentTagId(tagList.length)
    }
  }, [data])

  const [createArticle, { isLoading: isMutationLoading, isSuccess, isError, error, reset }] = slug
    ? useUpdateArticleMutation()
    : useCreateArticleMutation()

  useEffect(() => {
    if (isSuccess) {
      history.push('/articles')
    }
  }, [isSuccess])

  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (isError) {
      if (error.status === 'FETCH_ERROR') {
        setErrorMessage(error.error)
      } else {
        setErrorMessage(error.data.errors.message)
      }
    }
  }, [isError, error])

  const onSubmit = (data) => {
    const validTags = Array.from(new Set(tags.map((tag) => tag.text).filter(Boolean)))
    const article = {
      ...data,
      tagList: validTags,
    }
    if (slug) {
      createArticle({
        slug,
        body: { article },
      })
    } else {
      createArticle({ article })
    }
  }

  const onAdd = () => {
    setTags((prev) => [...prev, { id: currentTagId, text: '' }])
    setCurrentTagId((prev) => prev + 1)
  }

  if (isQueryLoading) {
    return <Spinner />
  }

  if (!isQueryLoading) {
    return (
      <>
        <form className={styles['new-article']} onSubmit={handleSubmit(onSubmit)}>
          <h2 className={styles['new-article__heading']}>
            {`${slug ? 'Edit' : 'Create new'} article`}
          </h2>
          <Input
            label="Title"
            type="text"
            placeholder="Title"
            additionalClass={styles['new-article__input']}
            name="title"
            register={register}
            registerOptions={{ required: 'Article title is required' }}
            errorMessage={errors.title?.message}
          />
          <Input
            label="Short description"
            type="text"
            placeholder="Description"
            additionalClass={styles['new-article__input']}
            name="description"
            register={register}
            registerOptions={{ required: 'Short description is required' }}
            errorMessage={errors.description?.message}
          />
          <label className={styles['new-article__text-block']}>
            <span className={styles['new-article__text-label']}>Text</span>
            <textarea
              className={`${styles['new-article__text']}${
                errors.body?.message ? ` ${styles['new-article__text--error']}` : ''
              }`}
              placeholder="Text"
              {...register('body', { required: 'Article body is required' })}
            />
            {errors.body?.message && (
              <span className={styles['new-article__text-error']}>{errors.body?.message}</span>
            )}
          </label>
          <span className={styles['new-article__tags-header']}>Tags</span>
          <ul className={styles['new-article__tags']}>
            {tags.map((tag) => (
              <li key={tag.id}>
                <NewTag id={tag.id} initialValue={tag.text} setTags={setTags} />
              </li>
            ))}
          </ul>
          <button
            className={`${styles['new-article__add-tag']}${
              tags.length ? '' : ` ${styles['new-article__add-tag--no-tags']}`
            }`}
            type="button"
            disabled={isMutationLoading}
            onClick={onAdd}
          >
            Add tag
          </button>
          <Button isLoading={isMutationLoading} text="Send" />
        </form>
        {isError && <Error status={error?.status} message={errorMessage} reset={reset} />}
      </>
    )
  }
}

export default NewArticle
