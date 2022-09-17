import React from "react"
import { Box, Grid } from "@mui/material"

import UserCourse from "components/user/course/UserCourse"
import UserProfile from "components/user/profile/UserProfile"

const MyPage = (): JSX.Element => {
  return (
    // 콘텐츠 영역 #1
    <Grid container component="main" direction="column" minHeight={1}>
      {/* 프로필 영역 #1 */}
      <UserProfile />

      {/* 경계선 */}
      <Box
        sx={{
          mt: "25px",
          height: "12px",
          backgroundColor: "#F5F5F5",
        }}
      />

      {/* 코스 영역 #1 */}
      <UserCourse />
    </Grid>
  )
}

export default MyPage
