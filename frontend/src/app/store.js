import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import truckReducer from '../features/truck/truckSlice'
import areaReducer from '../features/area/areaSlice'
import manpowerReducer from '../features/manpower/manpowerSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    trucks: truckReducer,
    areas: areaReducer,
    manpowers: manpowerReducer,
  },
});
