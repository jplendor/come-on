/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { geoUpdate, geoInit, stateGeo } from "features/geolocation/geoSlice"
import { useAppDispatch, useAppSelector } from "hooks/redux/useRedux"
import type { UseGeolocationReturnType } from "features/geolocation/geoSlice"
import { useCallback } from "react"

const useGeolocation = () => {
  const dispatch = useAppDispatch()
  const geoState = useAppSelector(stateGeo)
  const geoManual = useCallback(() => dispatch(geoInit()), [dispatch])
  const geoUpdateDispatch = useCallback(
    (geolocation: UseGeolocationReturnType | null) => {
      if (geolocation) dispatch(geoUpdate(geolocation))
    },
    [dispatch]
  )

  return {
    geoState,
    geoManual,
    geoUpdateDispatch,
  }
}

export default useGeolocation
