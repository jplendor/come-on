/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEffect, useCallback } from "react"
import { useGeolocation as rooksGetGeo } from "rooks"
import { useAppDispatch, useAppSelector } from "hooks/redux/useRedux"
import { geoUpdate, geoInit, stateGeo } from "features/geolocation/geoSlice"
import type { UseGeolocationReturnType } from "features/geolocation/geoSlice"

const useGeolocation = () => {
  const dispatch = useAppDispatch()
  const geoState = useAppSelector(stateGeo)
  const geolocation = rooksGetGeo({
    when: !geoState.isDone,
    enableHighAccuracy: true,
  })
  const geoUpdateDispatch = useCallback(
    (localgeo: UseGeolocationReturnType | null) => {
      if (localgeo) dispatch(geoUpdate(localgeo))
    },
    [dispatch]
  )
  const geoManual = useCallback(() => dispatch(geoInit()), [dispatch])
  useEffect(
    () => geoUpdateDispatch(geolocation),
    [geolocation, geoUpdateDispatch]
  )
  return {
    geoState,
    geoManual,
    geoUpdateDispatch,
  }
}

export const GetLatLng = () => {
  let result: { lat: number | undefined; lng: number | undefined } = {
    lat: undefined,
    lng: undefined,
  }
  const {
    geoState: { info },
  } = useGeolocation()
  if (!info.isError) {
    const { lat, lng } = info
    result = {
      lat,
      lng,
    }
  }
  return result
}

export default useGeolocation
