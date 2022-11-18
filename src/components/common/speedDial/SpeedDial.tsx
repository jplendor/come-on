/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react"
import { styled } from "@mui/material/styles"
import { Edit, MeetingRoom } from "@mui/icons-material"
import type { SpeedDialProps } from "@mui/material"
import {
  Box,
  SpeedDialIcon,
  SpeedDialAction,
  SpeedDial as MuiSpeedDial,
} from "@mui/material"

import { Url } from "types/auth"
import useAuth from "hooks/auth/useAuth"
import { generateComponent } from "utils"
import useNavigate from "hooks/navigate/useNavigate"
import useNavigateUrl from "hooks/auth/useNavigateUrl"

const ThemeSpeedDial = styled((props: SpeedDialProps) => (
  <Box sx={{ position: "relative" }}>
    <MuiSpeedDial {...props} />
  </Box>
))(({ theme: { palette } }) => ({
  "& .MuiSpeedDial-fab": {
    backgroundColor: palette.primary,
  },
}))

// 우리동네코스
const actions1 = [{ icon: <Edit />, name: "코스생성", url: Url.courseRegister }]
// 모임관리
const actions2 = [
  { icon: <Edit />, name: "모임등록", url: Url.meetingRegister },
  { icon: <MeetingRoom />, name: "모임입장", url: Url.meetingEnter },
]

// speedDial을 사용할 URL 목록
enum DIAL_URL {
  COURSE_LIST = "/",
  MEETING_LIST = "/meeting",
}

interface ActionType {
  icon: JSX.Element
  name: string
  url: Url
}

const GetActionType = (index: number): ActionType[] =>
  index === 0 ? actions1 : actions2

const SpeedDial = (): JSX.Element | null => {
  const {
    LoginStatus: { isloggedin },
  } = useAuth()
  const { goUrl } = useNavigateUrl()
  const { currentIndex } = useNavigate()
  const actionType = GetActionType(currentIndex)

  const [open, setOpen] = useState(false)
  const handleOpen = (): void => setOpen(true)
  const handleClose = (): void => setOpen(false)

  // !(코스/모임 리스트) || 마이페이지 || 비로그인 컴포넌트 비활성
  const pathName = window.location.pathname
  const pathDial = Object.values(DIAL_URL)

  const onDial = pathDial.includes(pathName as DIAL_URL)
  if (!onDial || currentIndex === 2 || !isloggedin) return null

  return (
    <ThemeSpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{ position: "absolute", bottom: 80, right: 3 }}
      icon={<SpeedDialIcon />}
      onOpen={handleOpen}
      onClose={handleClose}
      open={open}
    >
      {generateComponent(actionType, ({ icon, name, url }) => (
        <SpeedDialAction
          onClick={() => goUrl({ url })}
          key={name}
          icon={icon}
          tooltipTitle={name}
        />
      ))}
    </ThemeSpeedDial>
  )
}

export default SpeedDial
