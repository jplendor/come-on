/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { memo, useState } from "react"
import Menu from "@mui/material/Menu"
import { styled } from "@mui/material/styles"
import MenuItem from "@mui/material/MenuItem"
import IconButton from "@mui/material/IconButton"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { Typography, TypographyProps } from "@mui/material"

import { useDeleteMeetingMutation } from "features/meeting/meetingSlice"
import useNavigateUrl from "hooks/auth/useNavigateUrl"
import { Url } from "types/auth"
import CardDialog from "./CardDialog"

const MenuItemText = styled(Typography)<TypographyProps>(
  ({
    theme: {
      textStyles: {
        body2: { regular },
      },
      grayscale,
    },
  }) => ({
    userSelect: "none",
    textAlign: "center",
    color: grayscale[900],
    fontSize: regular.fontSize,
    lineHeight: regular.lineHeight,
  })
)

/**
 * 클릭시 여러 항목이 나오는 메뉴컴포넌트
 *
 * 현재 나오는 항목은 다음과 같다.
 * 1.초대코드 관리
 * 2.모임 수정
 * 3.모임 삭제
 */

interface CardMenuProps {
  meetingId: number
  meetingCodeId: number
}
const CardMenu = memo(({ meetingId, meetingCodeId }: CardMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget)
  const [dialog, setDialog] = useState(false)
  const handleClose = () => setAnchorEl(null)
  const handleOpenDialog = () => setDialog(true)
  const [deleteMeeting, { isLoading }] = useDeleteMeetingMutation()

  return (
    <div>
      <IconButton
        aria-label="more"
        sx={{
          width: "24px",
          height: "24px",
          paddingBottom: "12px",
          marginRight: "14px",
        }}
        id="CardMenu-button"
        aria-controls={open ? "menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon sx={{ color: "#FFFFFF" }} />
      </IconButton>
      <Menu
        id="CardMenu-menu"
        MenuListProps={{
          "aria-labelledby": "CardMenu-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <CardDialog
          setAnchorEl={setAnchorEl}
          dialog={dialog}
          setDialog={setDialog}
          meetingId={meetingId}
          meetingCodeId={meetingCodeId}
        />
        <MenuItem onClick={handleOpenDialog}>
          <MenuItemText>초대코드 관리하기</MenuItemText>
        </MenuItem>
        <MenuItem onClick={() => deleteMeeting({ meetingId })}>
          <MenuItemText>
            {isLoading ? "모임 삭제중..." : "모임 삭제하기"}
          </MenuItemText>
        </MenuItem>
      </Menu>
    </div>
  )
})

export default CardMenu
