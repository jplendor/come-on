import React from "react"
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
import { User } from "types/API/meeting-service"

interface MemberInfoModalProp {
  open: boolean
  onClose: () => void
  member: User
}

const MemberInfoModal = (props: MemberInfoModalProp): JSX.Element => {
  const { open, onClose, member } = props

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
            <FormLabel>역할</FormLabel>
            <RadioGroup defaultValue={member.meetingRole}>
              <FormControlLabel value="HOST" control={<Radio />} label="HOST" />
              <FormControlLabel
                value="EDITOR"
                control={<Radio />}
                label="EDITOR"
              />
              <FormControlLabel
                value="PARTICIPANT"
                control={<Radio />}
                label="PARTICIPANT"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </Dialog>
  )
}

export default MemberInfoModal
