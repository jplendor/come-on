import React, { ReactNode } from "react"
import { Stack } from "@mui/material"

// 우리동네코스 & 모임관리 공통 레이아웃
const CourseListLayout = ({
  children,
}: {
  children: ReactNode
}): JSX.Element => {
  return (
    <Stack
      component="article"
      spacing={1}
      sx={{
        py: "21px",
      }}
    >
      {children}
    </Stack>
  )
}

export default CourseListLayout
