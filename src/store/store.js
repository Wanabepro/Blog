import { configureStore } from '@reduxjs/toolkit'

import api from './api'
import credentialsReducer from './credentialsSlice'

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    credentials: credentialsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

export default store
