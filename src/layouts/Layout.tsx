import React, { ReactNode } from "react"
import { Box, Container, Grid } from "@mui/material"
import Navbar from "../components/common/Navbar"

type Props = {
  children: ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Grid sm={12} item>
      <Container maxWidth="sm">
        <Box
          sx={{
            height: "800px",
            backgroundColor: "powderblue",
          }}
        >
          {children}
        </Box>
        <Navbar />
      </Container>
    </Grid>
  )
}

export default Layout
