import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import useCustomForm from '../../hooks/useCustomForm'
import {
  useGetArticleQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
} from '../../store/articlesApi'
import Spinner from '../spinner'
import Input from '../input'
import NewTag from '../newTag'
import Button from '../button'
import Error from '../error'

import styles from './newArticle.module.scss'

function NewArticle() {
  const { slug } = useParams()

  const {
    register,
    handleSubmit,
    errors,
    setValue,
    resetForm,
    mutate: createArticle,
    isLoading: isMutationLoading,
    isError,
    error,
    reset,
  } = useCustomForm(slug ? useUpdateArticleMutation : useCreateArticleMutation, '/articles', [
    'article',
    'slug',
  ])

  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (isError) {
      if (error.status === 'FETCH_ERROR') {
        setErrorMessage(error.error)
      } else if (error.data.errors?.message) {
        setErrorMessage(error.data.errors.message)
      } else {
        setErrorMessage(error.data)
      }
    }
  }, [isError, error])

  const { data, isFetching: isQueryLoading } = useGetArticleQuery(slug, { skip: !slug })

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

    if (!slug) {
      resetForm()
      setTags([])
      setCurrentTagId(0)
    }
  }, [data, slug])

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

  const onAddTag = () => {
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
            onClick={onAddTag}
          >
            Add tag
          </button>
          <Button isLoading={isMutationLoading} text="Send" />
        </form>
        {isError && (
          <Error
            status={error?.originalStatus || error?.status}
            message={errorMessage}
            reset={reset}
          />
        )}
      </>
    )
  }
}

export default NewArticle
