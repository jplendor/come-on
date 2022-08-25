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
    geoUpdate: {
      reducer: (_, action: PayloadAction<GeoSliceState>) => action.payload,
      prepare: (geolocation: UseGeolocationReturnType) =>
        !geolocation
          ? {
              payload: initialState,
            }
          : {
              payload: {
                isDone: true,
                info: geolocation,
              },
            },
    },
  },
})

export const { geoAdded } = geoSlice.actions
export default geoSlice.reducer
