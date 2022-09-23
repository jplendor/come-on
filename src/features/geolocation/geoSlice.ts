import { RootState } from "store"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export type UseGeolocationReturnType = {
  isError: boolean
  lat?: number
  lng?: number
  message: string
}

interface GeoSliceState {
  isDone: boolean
  info: UseGeolocationReturnType
}

const initialState: GeoSliceState = {
  isDone: false,
  info: {
    isError: false,
    lat: 0,
    lng: 0,
    message: "",
  },
}

const geoSlice = createSlice({
  name: "geolocation",
  initialState,
  reducers: {
    geoUpdate: (_state, action: PayloadAction<UseGeolocationReturnType>) => {
      return {
        isDone: true,
        info: action.payload,
      }
    },
    geoInit: (state) => {
      state.isDone = false
    },
  },
})

export const { geoUpdate, geoInit } = geoSlice.actions

export const stateGeo = (state: RootState): GeoSliceState => state.geolocation

export default geoSlice.reducer
