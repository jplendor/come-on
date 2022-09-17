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
    // 45.938em -> 735px
    <Container
      maxWidth="xs"
      sx={{
        height: "45.938em",
        touchAction: "pan-x pinch-zoom",
        ...temporaryArea,
      }}
    >
      {/* 콘텐츠 영역 #1 */}
      <Box
        // 41.875em -> 670px
        sx={{
          height: "41.875em",
          overflowY: "auto",
          overflowX: "hidden",
          touchAction: "pan-x pinch-zoom",
        }}
      >
        {children}
      </Box>
      {/* 콘텐츠 영역 #2 */}
      <AppBar
        color="inherit"
        position="sticky"
        component="footer"
        // 5.188em -> 83px
        sx={{
          top: "auto",
          bottom: 0,
          height: "5.188em",
          boxShadow: "none",
          touchAction: "pan-x pinch-zoom",
        }}
      >
        <Box
          sx={{
            height: "1px",
            backgroundColor: "#EEEEEE",
          }}
        />
        <Grid
          container
          wrap="nowrap"
          component="nav"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          // 2.875em -> 46px
          sx={{
            mt: "5px",
            px: "20px",
            height: "2.875em",
          }}
        >
          <Navbar />
        </Grid>
      </AppBar>
    </Container>
  )
}

export default Layout
