/* eslint-disable max-len */
import React from 'react'

import ArticleHeader from '../articleHeader'

import styles from './article.module.scss'

function Article() {
  return (
    <article className={styles.article}>
      <ArticleHeader />
      <div className={styles['article__description-block']}>
        <p className={styles.article__description}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia tempore necessitatibus animi laboriosam placeat
          minima laudantium perferendis quam accusamus nobis tenetur eos voluptates, quae qui saepe nihil adipisci
          doloremque sed.
        </p>
        <div className={styles.article__controls}>
          <button type="button" className={`${styles.article__button} ${styles['article__button--delete']}`}>
            Delete
          </button>
          <button type="button" className={`${styles.article__button} ${styles['article__button--edit']}`}>
            Edit
          </button>
        </div>
      </div>
      <p className={styles.article__text}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam fuga eaque officiis neque impedit aliquam totam.
        Doloribus ratione fugiat sit quae quas illum veniam cupiditate, molestias quasi, esse nostrum non? Incidunt
        consequuntur quod natus corporis dolore, explicabo quia. Maxime ipsam maiores quaerat veniam ipsum, cum nostrum
        cupiditate a eligendi ex veritatis ad quia odio. Praesentium quis velit cupiditate provident soluta? Alias
        accusantium quisquam distinctio beatae. Et beatae tenetur delectus vitae voluptatum ullam aliquid dicta porro,
        quaerat consectetur reiciendis sint officiis aut est iure voluptatem facere. Quaerat voluptate facere possimus
        aliquid? Nemo, itaque provident iste voluptate at minima. Totam ullam quo ad. Minus similique, consequatur
        excepturi nulla fugiat ullam cupiditate officiis eveniet culpa harum ratione dolorum, ab quod rerum consequuntur
        voluptatibus? Mollitia iure deserunt soluta error quo amet id iste, omnis unde voluptates molestias et?
        Voluptates perferendis, quasi tenetur veniam sint tempore nobis consequatur eius totam illo odio itaque ex
        voluptate! Maiores architecto eos eveniet reprehenderit nisi molestiae perferendis placeat saepe ratione? Minus
        accusantium aut, saepe numquam ipsa eveniet voluptate necessitatibus consequatur fugiat amet, magnam sint!
        Doloribus voluptas illum odit adipisci. Consectetur iste praesentium corrupti est, maxime vitae animi itaque
        molestiae, quae dolore alias. Magnam neque eos totam sunt provident suscipit quo culpa quos accusamus, placeat
        natus ipsum hic cum. Facilis? Reprehenderit blanditiis facere officiis veritatis qui earum ducimus fugit
        accusamus rem quisquam ullam molestias harum vel quod excepturi nihil magni, ab voluptatum alias! Labore
        similique a maxime sed hic recusandae!
      </p>
    </article>
  )
}

export default Article
