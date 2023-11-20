import { createSlice } from '@reduxjs/toolkit'

const credentialsSlice = createSlice({
  name: 'credentials',
  initialState: {
    username: '',
    email: '',
    image: '',
    token: localStorage.getItem('token'),
  },
  reducers: {
    setupCredentials: (state, { payload: { username, email, image, token } }) => {
      state.username = username || ''
      state.email = email || ''
      state.image = image || ''
      state.token = token || ''
    },
  },
})

export const { setupCredentials } = credentialsSlice.actions

export const selectCredentials = (state) => state.credentials

export default credentialsSlice.reducer
