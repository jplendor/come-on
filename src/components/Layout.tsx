import React, { ReactNode } from "react"
import { Box, Container, Grid } from "@mui/material"

type Props = {
  children: ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Grid sm={12} item>
      <Container maxWidth="sm">
        {/* 임시 배경 - c:08/09 */}
        <Box sx={{}}>{children}</Box>
      </Container>
    </Grid>
  )
}

export default Layout
