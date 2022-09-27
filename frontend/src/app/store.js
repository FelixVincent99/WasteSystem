import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import truckReducer from '../features/truck/truckSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    trucks: truckReducer
  },
});
