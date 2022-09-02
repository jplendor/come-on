import { combineReducers, configureStore } from "@reduxjs/toolkit"

import authSlice from "features/auth/authSlice"
import geoSlice from "features/geolocation/geoSlice"

const rootReducer = combineReducers({
  geolocation: geoSlice,
  auth: authSlice,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
