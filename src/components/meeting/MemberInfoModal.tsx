import React, { useEffect, useState } from "react"
import {
  Avatar,
  Box,
  Button,
  Dialog,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material"
import { RoleType, User } from "types/API/meeting-service"
import { useUpdateMeetingUserMutation } from "features/meeting/meetingSlice"
import { useParams } from "react-router-dom"
import theme from "theme"

interface MemberInfoModalProp {
  open: boolean
  handleClose: () => void
  myMeetingRole: RoleType
  member: User
}

const PAPER_PROPS = {
  width: "280px",
  minHeight: "200px",
  borderRadius: "10px",
  display: "flex",
}

const DIALOG_TITLE = {
  height: "60px",
  backgroundColor: theme.grayscale[100],
  color: theme.grayscale[700],
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
}

const COMPLETE_BTN = {
  position: "absolute",
  right: "10px",
}

const INFO = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  m: "10px",
}

const WRAPPER = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  p: "15px",
}

const MemberInfoModal = (props: MemberInfoModalProp): JSX.Element => {
  const { open, handleClose, member, myMeetingRole } = props

  const [meetingRole, setMeetingRole] = useState<RoleType>(member.meetingRole)

  const isEditable = myMeetingRole === "HOST" && meetingRole !== "HOST"

  const { meetingId } = useParams()
  const [updateMeetingUserMutation] = useUpdateMeetingUserMutation()

  const onClose = async (): Promise<void> => {
    try {
      if (isEditable) {
        const res = await updateMeetingUserMutation({
          meetingId: Number(meetingId),
          userId: member.id,
          updatedMember: { meetingRole },
        }).unwrap()

        if (res.code !== "SUCCESS") {
          throw new Error(`error code: ${res.code}`)
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      } else {
        alert(`unexpected error: ${error}`)
      }
    }

    handleClose()
  }

  useEffect(() => {
    setMeetingRole(member.meetingRole)
  }, [member])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          ...PAPER_PROPS,
          flexDirection: "column",
          justifyContent: "space-between",
        },
      }}
    >
      <Box sx={DIALOG_TITLE}>
        <Typography variant="subtitle1">
          {isEditable ? "권한 수정" : "권한 보기"}
        </Typography>
        {isEditable && (
          <Button sx={COMPLETE_BTN} onClick={onClose}>
            수정완료
          </Button>
        )}
      </Box>
      <Box sx={WRAPPER}>
        <Box sx={INFO}>
          <Avatar
            src={member.imageLink}
            alt="프로필 이미지"
            sx={{ mr: "10px" }}
          />
          <Typography variant="subtitle1" fontWeight="bold">
            {member.nickname}
          </Typography>
        </Box>
        <FormControl>
          <RadioGroup
            value={meetingRole}
            onChange={(e) => {
              setMeetingRole(e.target.value as RoleType)
            }}
          >
            <FormControlLabel
              value="HOST"
              control={<Radio />}
              label="생성자"
              disabled
            />
            <FormControlLabel
              value="EDITOR"
              control={<Radio />}
              label="수정자"
              disabled={!isEditable}
            />
            <FormControlLabel
              value="PARTICIPANT"
              control={<Radio />}
              label="일반"
              disabled={!isEditable}
            />
          </RadioGroup>
        </FormControl>
      </Box>
    </Dialog>
  )
}

export default MemberInfoModal
