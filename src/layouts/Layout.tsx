import React, { ReactNode } from "react"
import { AppBar, Box, Container, Grid } from "@mui/material"

import Navbar from "./Navbar"

const temporaryArea = {
  marginTop: "20px",
  border: "2px solid black",
  borderRadius: "5px",
  borderTop: "none",
  borderBottom: "none",
}

const Layout = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    // 메인 영역 #1
    <Container maxWidth="xs" sx={{ maxHeight: "735px", ...temporaryArea }}>
      {/* 콘텐츠 영역 #1 */}
      <Box
        sx={{
          height: `670px`,
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {children}
      </Box>
      {/* 콘텐츠 영역 #2 */}
      <AppBar
        color="inherit"
        position="sticky"
        sx={{ top: "auto", bottom: 0, height: "83px", boxShadow: "none" }}
      >
        <Box
          sx={{
            height: "1px",
            backgroundColor: "#EEEEEE",
          }}
        />
        <Grid
          container
          component="nav"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            mt: "5px",
            px: "20px",
            maxHeight: "46px",
          }}
        >
          <Navbar />
        </Grid>
      </AppBar>
    </Container>
  )
}

export default Layout
