import React from "react"
import { Grid, Avatar, AppBar } from "@mui/material"
import { Map, Groups } from "@mui/icons-material"
import styled from "@emotion/styled"

const CSS_ITEM = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "1rem 0",
  transition: "0.3s",
  "&:hover": {
    color: "#92b4ec",
    cursor: "pointer",
  },
}

const SubTitle = styled.div`
  font-weight: bold;
`

const Navbar: React.FC = () => {
  return (
    <AppBar
      position="sticky"
      color="primary"
      sx={{ top: "auto", bottom: "0", padding: "0px" }}
    >
      <Grid
        container
        sx={{
          backgroundColor: "#ffffff",
          boxShadow: " 0 -3px 3px rgba(180,184,181,.5)",
          overflow: "hidden",
        }}
      >
        <Grid
          item
          xs={4}
          sx={CSS_ITEM}
          // onClick={}
        >
          <Map sx={{ fontSize: 50 }} />
          <SubTitle>우리동네코스</SubTitle>
        </Grid>
        <Grid
          item
          xs={4}
          sx={CSS_ITEM}
          // onClick={}
        >
          <Groups sx={{ fontSize: 50 }} />
          <SubTitle>모임관리</SubTitle>
        </Grid>
        <Grid
          item
          xs={4}
          sx={CSS_ITEM}
          // onClick={}
        >
          <Avatar
            alt="myImg"
            src="/src/assets/profileImg.jpg"
            sx={{ marginTop: 0.5, marginBottom: 0.7 }}
          />
          <SubTitle>마이페이지</SubTitle>
        </Grid>
      </Grid>
    </AppBar>
  )
}
export default Navbar
