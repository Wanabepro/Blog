import React from 'react'

import Header from '../header'
// import Registration from '../registration'
// import Login from '../login'
// import Settings from '../settings'
import ArticleList from '../articleList'
// import Article from '../article'
// import NewArticle from '../newArticle'

function App() {
  return (
    <>
      <Header />
      <main>
        {/* <Registration />
        <Login />
        <Settings />
        <NewArticle />
        <Article /> */}
        <ArticleList />
      </main>
    </>
  )
}

export default App
