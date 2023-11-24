import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

import { selectToken } from '../../store/credentialsSlice'

function PrivateRoute({ children, ...rest }) {
  const isAuth = useSelector(selectToken)

  if (isAuth) {
    return <Route {...rest}>{children}</Route>
  }

  return <Redirect to="/sign-in" />
}

export default PrivateRoute
