import { combineReducers, configureStore } from "@reduxjs/toolkit"

import { api } from "features/api/apiSlice"
import authSlice from "features/auth/authSlice"
import geoSlice from "features/geolocation/geoSlice"
import courseApi from "features/course/courseSlice"

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  geolocation: geoSlice,
  auth: authSlice,
  course: courseApi,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
