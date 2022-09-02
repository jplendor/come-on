import { Alert, Box, Link } from "@mui/material"
import { useGeolocation } from "rooks"
import React, { FC, useEffect } from "react"

import { geoAdded, UseGeolocationReturnType } from "./geoSlice"
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux"

interface DisplayProps {
  data: UseGeolocationReturnType
}

const DisplayMap: FC<DisplayProps> = ({ data }) => {
  const { isError, lat, lng, message } = data
  return (
    <Box
      sx={{
        margin: "10px",
        paddingBottom: "10px",
      }}
    >
      {data && !isError ? (
        <div>
          <Link
            href={`https://www.openstreetmap.org/#map=18/${lat}/${lng}`}
            underline="hover"
          >
            당신의 지역을 맞춰보죠
          </Link>
          <Alert severity="success">Latitude: {lat}</Alert>
          <Alert severity="success">Longitude: {lng}</Alert>
        </div>
      ) : (
        <div>
          <Alert severity="error">No geolocation, sorry. </Alert>
          <Alert severity="info">{`에러 원인: ${message}`}</Alert>
        </div>
      )}
    </Box>
  )
}

const DisplayGeolocation = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const geolocation = useGeolocation()
  const { isDone, info } = useAppSelector((state) => state.geolocation)

  useEffect(() => {
    if (!isDone && geolocation) dispatch(geoAdded(geolocation))
  }, [dispatch, isDone, geolocation])

  return <DisplayMap data={info} />
}

export default DisplayGeolocation
