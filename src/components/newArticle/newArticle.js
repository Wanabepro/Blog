/* eslint-disable operator-linebreak */
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { useCreateArticleMutation } from '../../store/articlesApi'
import Input from '../input'
import NewTag from '../newTag'
import Button from '../button'
import Error from '../error'

import styles from './newArticle.module.scss'

function NewArticle() {
  const [currentTagId, setCurrentTagId] = useState(0)
  const [tags, setTags] = useState([])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'all' })

  const [createArticle, { isError, error, reset }] = useCreateArticleMutation()

  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (error?.status === 'FETCH_ERROR') {
      setErrorMessage(error?.error)
    } else {
      setErrorMessage(error?.data.errors.message)
    }
  }, [isError, error])

  const onSubmit = (data) => {
    const validTags = Array.from(new Set(tags.map((tag) => tag.text).filter(Boolean)))
    const article = {
      ...data,
      tagList: validTags,
    }

    createArticle({ article })
  }

  const onAdd = () => {
    setTags((prev) => [...prev, { id: currentTagId, text: '' }])
    setCurrentTagId((prev) => prev + 1)
  }

  return (
    <>
      <form className={styles['new-article']} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles['new-article__heading']}>Create new article</h2>
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
              <NewTag id={tag.id} setTags={setTags} />
            </li>
          ))}
        </ul>
        <button
          className={`${styles['new-article__add-tag']}${
            tags.length ? '' : ` ${styles['new-article__add-tag--no-tags']}`
          }`}
          type="button"
          onClick={onAdd}
        >
          Add tag
        </button>
        <Button text="Send" />
      </form>
      {isError && <Error status={error?.status} message={errorMessage} reset={reset} />}
    </>
  )
}

export default NewArticle
