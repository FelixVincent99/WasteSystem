import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import truckReducer from '../features/truck/truckSlice'
import areaReducer from '../features/area/areaSlice'
import manpowerReducer from '../features/manpower/manpowerSlice'
import scheduleReducer  from '../features/schedule/scheduleSlice'
import collectionReducer  from '../features/collection/collectionSlice'
import sensorReducer  from '../features/sensor/sensorSlice'
import stopReducer  from '../features/stop/stopSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    trucks: truckReducer,
    areas: areaReducer,
    manpowers: manpowerReducer,
    schedules: scheduleReducer,
    collections: collectionReducer,
    sensors: sensorReducer,
    stops: stopReducer
  },
});
