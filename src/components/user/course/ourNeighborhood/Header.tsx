import React, { useEffect } from "react"
import { styled } from "@mui/material/styles"
import {
  Search as SearchIcon,
  PlaceOutlined as PlaceOutlinedIcon,
  WrongLocation as WrongLocationIcon,
} from "@mui/icons-material"
import {
  Grid,
  Tooltip,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material"
import type { TextFieldProps } from "@mui/material"
import { useGeolocation as rooksGetGeo } from "rooks"

import { MainLogo } from "assets/course/MainLogo"
import useGeolocation from "hooks/geolocation/useGeolocation"

const SerchTextField = styled(TextField)<TextFieldProps>(
  ({
    theme: {
      textStyles: {
        body1: { regular },
      },
      grayscale,
    },
  }) => ({
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: `1px solid ${grayscale[200]}`,
      },
      "&:hover fieldset": {
        border: `1px solid ${grayscale[200]}`,
      },
      "&.Mui-focused fieldset": {
        border: `1px solid ${grayscale[200]}`,
      },
    },
    "& ::placeholder": {
      color: grayscale[500],
    },
    width: "95%",
    borderRadius: "4px",
    backgroundColor: grayscale[100],
    input: {
      gap: "2px",
      padding: "10px 8px",
      fontSize: regular.fontSize,
      lineHeight: regular.lineHeight,
    },
  })
)

const HeaderSerch = (): JSX.Element => {
  return (
    <SerchTextField
      placeholder="코스명으로 검색하세요"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  )
}

const HeaderGPS = (): JSX.Element => {
  const {
    geoUpdateDispatch,
    geoManual,
    geoState: {
      isDone,
      info: { isError, message },
    },
  } = useGeolocation()

  const geolocation = rooksGetGeo({
    when: !isDone,
    enableHighAccuracy: true,
  })

  useEffect(() => {
    if (geolocation) geoUpdateDispatch(geolocation)
  }, [geolocation, geoUpdateDispatch])

  return (
    <Grid container justifyContent="center" alignItems="center">
      <IconButton aria-label="GPS" size="small" onClick={geoManual}>
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

const Header = (): JSX.Element => {
  return (
    <Grid item container component="section" direction="column">
      <Grid
        item
        container
        component="header"
        alignContent="flex-end"
        alignItems="center"
        sx={{
          pb: "14px",
          height: "65px",
          textAlign: "center",
        }}
      >
        <Grid item xs={3}>
          <MainLogo />
        </Grid>
        <Grid item xs={8}>
          <HeaderSerch />
        </Grid>
        <Grid item xs={1}>
          <HeaderGPS />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Header
