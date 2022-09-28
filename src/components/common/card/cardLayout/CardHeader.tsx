import React, { ReactNode } from "react"
import { Grid } from "@mui/material"

interface CardHeaderProps {
  children: ReactNode
  sx: { [key in string]: string }
  Content: (() => JSX.Element) | null
}

const CardHeader = ({
  sx,
  Content,
  children,
}: CardHeaderProps): JSX.Element => {
  return (
    <Grid item container component="section" direction="column">
      <>
        <Grid
          item
          container
          component="header"
          alignItems="center"
          alignContent="flex-end"
          sx={sx}
        >
          {children}
        </Grid>
        {Content && <Content />}
      </>
    </Grid>
  )
}

export default CardHeader
