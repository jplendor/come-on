import React from "react"
import { Grid } from "@mui/material"

import Search from "./Search"

// 모임관리 헤더 영역
const Header = (): JSX.Element => {
  return (
    <Grid item xs={12}>
      <Search />
    </Grid>
  )
}

export default Header
