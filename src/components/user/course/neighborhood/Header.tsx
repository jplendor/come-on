import React from "react"
import { Grid } from "@mui/material"

import Search from "./Search"
import Geolocation from "./Geolocation"

// 우리동네코스 헤더 영역
const Header = (): JSX.Element => {
  return (
    <>
      <Grid item xs={10}>
        <Search />
      </Grid>
      <Grid item xs={2}>
        <Geolocation />
      </Grid>
    </>
  )
}

export default Header
