import { configureStore } from '@reduxjs/toolkit';
import { jobHunterApi } from './jobHunterApiSlice';
import { authReducer } from './authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [jobHunterApi.reducerPath]: jobHunterApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jobHunterApi.middleware)
})