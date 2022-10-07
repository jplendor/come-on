import React, { ReactNode } from "react"
import { Grid } from "@mui/material"

interface CardBodyProps {
  children: ReactNode
  sx: { [key in string]: string }
}

const CardBody = ({ children, sx }: CardBodyProps): JSX.Element => {
  return (
    <Grid
      item
      px="20px"
      container
      wrap="nowrap"
      direction="column"
      component="section"
      sx={sx}
    >
      {children}
    </Grid>
  )
}

export default CardBody
