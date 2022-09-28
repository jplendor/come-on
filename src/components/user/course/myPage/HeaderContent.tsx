import React from "react"
import { Box } from "@mui/material"

import { MydetailRes } from "types/API/user-service"
import Profile from "components/user/profile/Profile"
import { useMyDetialQuery } from "features/user/userSlice"
import ProfileSkeleton from "components/user/profile/ProfileSkeleton"
import Basicframe, { QueryProps } from "components/common/BasicFrame/BasicFrame"
import theme from "theme"

interface MyDetialQueryProps extends QueryProps {
  data: MydetailRes
}

const MyPageProfile = (): JSX.Element => {
  const myDetialQuery = useMyDetialQuery() as MyDetialQueryProps
  const Content = Basicframe(myDetialQuery, [ProfileSkeleton, Profile])
  return (
    <>
      {Content}
      {/* 경계선 */}
      <Box
        sx={{
          mt: "25px",
          height: "12px",
          backgroundColor: theme.grayscale[100],
        }}
      />
    </>
  )
}

export default MyPageProfile
