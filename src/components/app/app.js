import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom/cjs/react-router-dom.min'

import Header from '../header'
import Registration from '../registration'
import Login from '../login'
import Settings from '../settings'
import ArticleList from '../articleList'
// import Article from '../article'
// import NewArticle from '../newArticle'

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <ArticleList />
        </Route>
        <Route path="/sign-in">
          <Login />
        </Route>
        <Route path="/sign-up">
          <Registration />
        </Route>
        <Route path="/profile">
          <Settings />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
