import { createSlice } from '@reduxjs/toolkit'

const initialState = { token: null, user: null }

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, {payload}) => {
      const { accessToken, user } = payload
      state.token = accessToken
      state.user = user
    },
    logout: () => {
      return initialState
    }
  },
})

export const authReducer = authSlice.reducer
export const selectUser = (state) => state.auth.user
export const selectIsAuthenticated = (state) => state.auth.token != null

export const { login, logout } = authSlice.actions