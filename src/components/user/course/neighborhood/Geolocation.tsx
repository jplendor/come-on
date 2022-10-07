import React from "react"
import {
  PlaceOutlined as PlaceOutlinedIcon,
  WrongLocation as WrongLocationIcon,
} from "@mui/icons-material"
import { Grid, IconButton, Tooltip } from "@mui/material"

import useGeolocation from "hooks/geolocation/useGeolocation"

const Geolocation = (): JSX.Element => {
  const {
    geoState: {
      info: { isError, message },
    },
    geoManual,
  } = useGeolocation()

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
