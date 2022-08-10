import React, { ReactNode } from "react"
import { Box, Container, Grid } from "@mui/material"

type Props = {
  children: ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Grid sm={12}>
      <Container maxWidth="sm">
        {/* 임시 배경 - c:08/09 */}
        <Box
          sx={{
            backgroundColor: "#cfe8fc",
            border: "1px solid grey",
            height: "98vh",
            width: "sm",
            position: "relative",
          }}
        >
          {children}
        </Box>
      </Container>
    </Grid>
  )
}

export default Layout
