import { combineReducers, configureStore } from "@reduxjs/toolkit"

import { api } from "features/api/apiSlice"
import authSlice from "features/auth/authSlice"
import geoSlice from "features/geolocation/geoSlice"
import navigateSlice from "features/navigate/navigateSlice"
import coursePlaceSlice from "features/course/courseSlice"
import meetingSlice from "features/meeting/meetingSlice"

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  navigate: navigateSlice,
  geolocation: geoSlice,
  auth: authSlice,
  course: coursePlaceSlice,
  meeting: meetingSlice,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
