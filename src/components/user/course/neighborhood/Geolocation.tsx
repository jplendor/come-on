import React, { useEffect } from "react"
import {
  PlaceOutlined as PlaceOutlinedIcon,
  WrongLocation as WrongLocationIcon,
} from "@mui/icons-material"
import { useGeolocation as rooksGetGeo } from "rooks"
import { Grid, IconButton, Tooltip } from "@mui/material"

import useGeolocation from "hooks/geolocation/useGeolocation"

const Geolocation = (): JSX.Element => {
  const {
    geoState: {
      isDone,
      info: { isError, message },
    },
    geoManual,
    geoUpdateDispatch,
  } = useGeolocation()
  const geolocation = rooksGetGeo({
    when: !isDone,
    enableHighAccuracy: true,
  })
  useEffect(
    () => geoUpdateDispatch(geolocation),
    [geolocation, geoUpdateDispatch]
  )

  return (
    <Grid container justifyContent="center" alignItems="center">
      <IconButton aria-label="Geolocation" size="small" onClick={geoManual}>
        {isError ? (
          <Tooltip title={message}>
            <WrongLocationIcon />
          </Tooltip>
        ) : (
          <PlaceOutlinedIcon />
        )}
      </IconButton>
    </Grid>
  )
}

export default Geolocation
