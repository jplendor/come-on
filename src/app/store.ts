import { combineReducers, configureStore } from "@reduxjs/toolkit"

import geoSlice from "../features/geolocation/geoSlice"

const rootReducer = combineReducers({
  geolocation: geoSlice,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
