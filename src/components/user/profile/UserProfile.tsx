import React from "react"
import { Grid } from "@mui/material"

import img from "assets/nav/Ellipse.png"
import ProfileHeader from "./ProfileHeader"
import ProfileInfo from "./ProfileInfo"
import ProfileNickname from "./ProfileNickname"

const UserProfile = (): JSX.Element => {
  return (
    // 프로필 영역 #1
    <Grid
      item
      xs={4}
      container
      component="section"
      direction="column"
      sx={{
        height: "300px",
      }}
    >
      {/* 프로필 영역 #1-1 */}
      <ProfileHeader />

      {/* 프로필 영역 #1-2 */}
      <ProfileInfo
        info={{
          img: {
            src: img,
            alt: "test",
          },
          title: "어서오세요. @@님!",
          email: "@example.com",
        }}
      />

      {/* 프로필 영역 #1-3 */}
      <ProfileNickname
        info={{
          nickname: "스탠리's",
        }}
      />
    </Grid>
  )
}

export default UserProfile
