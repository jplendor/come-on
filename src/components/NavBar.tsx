import React from "react"
import { Grid, Avatar } from "@mui/material"
import { Map, Groups } from "@mui/icons-material"
import styled from "@emotion/styled"

const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  &:hover {
    color: #d90f0fde;
    scale: (1.2);
  }
`
const Navbar: React.FC = () => {
  return (
    <Grid
      container
      maxWidth="xs"
      sx={{
        backgroundColor: "#ffffff",
        position: "absolute",
        bottom: "0",
      }}
    >
      <Grid
        item
        xs={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem 0",
        }}
        // onClick={}
      >
        <Item>
          <Map sx={{ fontSize: 40 }} />
          <div>우리동네코스</div>
        </Item>
      </Grid>
      <Grid
        item
        xs={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem 0",
        }}
        // onClick={}
      >
        <Groups sx={{ fontSize: 40 }} />
        모임관리
      </Grid>
      <Grid
        item
        xs={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem 0",
        }}
        // onClick={}
      >
        <Avatar
          alt="myImg"
          src="/src/assets/profileImg.jpg"
          sx={{ fontSize: 30 }}
        />
        마이페이지
      </Grid>
    </Grid>
  )
}

export default Navbar
