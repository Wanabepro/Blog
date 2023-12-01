import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom/cjs/react-router-dom.min'
import { useDispatch } from 'react-redux'

import { useGetUserQuery } from '../../store/usersApi'
import { setupCredentials } from '../../store/credentialsSlice'
import PrivateRoute from '../privateRoute'
import Header from '../header'
import Registration from '../registration'
import Login from '../login'
import Settings from '../settings'
import ArticleList from '../articleList'
import Article from '../article'
import NewArticle from '../newArticle'

function App() {
  const dispatch = useDispatch()
  const { data, isSuccess } = useGetUserQuery()

  useEffect(() => {
    if (isSuccess) {
      dispatch(setupCredentials(data.user))
    }
  }, [isSuccess, data])

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/sign-in">
          <Login />
        </Route>
        <Route path="/sign-up">
          <Registration />
        </Route>
        <Route exact path="/">
          <ArticleList />
        </Route>
        <Route exact path="/articles">
          <ArticleList />
        </Route>
        <Route exact path="/articles/:slug">
          <Article />
        </Route>
        <PrivateRoute path="/articles/:slug/edit">
          <NewArticle />
        </PrivateRoute>
        <PrivateRoute path="/profile">
          <Settings />
        </PrivateRoute>
        <PrivateRoute path="/new-article">
          <NewArticle />
        </PrivateRoute>
      </Switch>
    </Router>
  )
}

export default App
