import React from "react"
import { Grid } from "@mui/material"

import Basicframe, { QueryProps } from "components/common/BasicFrame"
import { MydetailRes } from "types/API/user-service"
import { useMyDetialQuery } from "features/user/userSlice"

import Profile from "./Profile"
import ProfileHeader from "./ProfileHeader"
import ProfileSkeleton from "./ProfileSkeleton"

interface MyDetialQueryProps extends QueryProps {
  data: MydetailRes
}

const UserProfile = (): JSX.Element => {
  const myDetialQuery = useMyDetialQuery() as MyDetialQueryProps
  const Content = Basicframe(myDetialQuery, [ProfileSkeleton, Profile])

  return (
    // 프로필 영역 #1
    <Grid item xs={4} container component="section" direction="column">
      {/* 프로필 영역 #1-1 */}
      <ProfileHeader />
      {/* 프로필 영역 #1-2, #1-3 */}
      {Content}
    </Grid>
  )
}

export default UserProfile
