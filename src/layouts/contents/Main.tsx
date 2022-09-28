import React, { ReactNode, memo } from "react"
import { Grid } from "@mui/material"

const Main = memo(({ children }: { children: ReactNode }): JSX.Element => {
  return (
    // 콘텐츠 영역 #1
    <Grid container component="main" direction="column" minHeight={1}>
      {children}
    </Grid>
  )
})

export default Main
