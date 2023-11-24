import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: '',
  email: '',
  image: '',
  token: localStorage.getItem('token'),
}

const credentialsSlice = createSlice({
  name: 'credentials',
  initialState,
  reducers: {
    setupCredentials: (state, { payload: { username, email, image, token } }) => {
      state.username = username || ''
      state.email = email || ''
      state.image = image || ''
      state.token = token || ''
    },
    resetCredentials: (state) => {
      Object.keys(initialState).forEach((key) => {
        state[key] = ''
      })
    },
  },
})

export const { setupCredentials, resetCredentials } = credentialsSlice.actions

export const selectCredentials = (state) => state.credentials

export const selectUsername = (state) => state.credentials.username

export const selectToken = (state) => state.credentials.token

export default credentialsSlice.reducer
