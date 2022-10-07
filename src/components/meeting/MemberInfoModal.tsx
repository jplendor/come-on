import React, { useState } from "react"
import {
  Avatar,
  Dialog,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material"
import { RoleType, User } from "types/API/meeting-service"
import { useUpdateMeetingUserMutation } from "features/meeting/meetingSlice"
import { useParams } from "react-router-dom"

interface MemberInfoModalProp {
  open: boolean
  handleClose: () => void
  member: User
}

const MemberInfoModal = (props: MemberInfoModalProp): JSX.Element => {
  const { open, handleClose, member } = props

  const [meetingRole, setMeetingRole] = useState<RoleType>(member.meetingRole)

  const isEditable = meetingRole !== "HOST"

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

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>멤버 정보</DialogTitle>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Avatar src={member.imageLink} alt="프로필 이미지" />
        </Grid>
        <Grid item xs={8}>
          <Typography>{member.nickname}</Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <FormLabel>
              역할 {!isEditable && "(HOST는 역할을 수정할 수 없습니다.)"}
            </FormLabel>
            <RadioGroup
              value={meetingRole}
              onChange={(e) => {
                setMeetingRole(e.target.value as RoleType)
              }}
            >
              <FormControlLabel
                value="HOST"
                control={<Radio />}
                label="HOST"
                disabled={!isEditable}
              />
              <FormControlLabel
                value="EDITOR"
                control={<Radio />}
                label="EDITOR"
                disabled={!isEditable}
              />
              <FormControlLabel
                value="PARTICIPANT"
                control={<Radio />}
                label="PARTICIPANT"
                disabled={!isEditable}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </Dialog>
  )
}

export default MemberInfoModal
