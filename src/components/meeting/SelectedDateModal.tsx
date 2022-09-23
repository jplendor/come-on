import React from "react"
import {
  Box,
  Dialog,
  DialogTitle,
  Grid,
  Avatar,
  Button,
  CircularProgress,
} from "@mui/material"

import { generateComponent } from "utils"
import { useGetMeetingDateQuery } from "features/meeting/meetingSlice"

interface TargetDateInfo {
  date: string
  dateId: number
}
interface SelectedDateModalProps {
  open: boolean
  onClose: () => void
  meetingId: number
  targetDateInfo: TargetDateInfo
  totalMemberNumber: number
}

const DIALOG_TITLE = {
  backgroundColor: "#8E8E8E",
  color: "#FFFFFF",
}

const GRID_ITEM = {
  display: "flex",
}

const SelectedDateModal = (props: SelectedDateModalProps): JSX.Element => {
  const { open, onClose, meetingId, targetDateInfo, totalMemberNumber } = props

  let content

  const skip = targetDateInfo.dateId === 0

  const {
    data: response,
    isFetching,
    isSuccess,
  } = useGetMeetingDateQuery(
    { meetingId, dateId: targetDateInfo.dateId },
    { skip }
  )

  const makeContent = (
    date: string,
    userCount: number,
    dateUsers: Array<any>
  ): any => {
    return (
      <Dialog open={open} onClose={onClose}>
        <>
          <DialogTitle sx={DIALOG_TITLE}>{date}</DialogTitle>
          <Grid container>
            {userCount === 0
              ? "해당 날짜를 선택한 멤버가 없습니다"
              : generateComponent(dateUsers, (data, key) => (
                  <Grid item key={key} sx={GRID_ITEM} xs={12}>
                    <Avatar alt="프로필 이미지" src={data.imageLink} />
                    <Box>{data.nickname}</Box>
                  </Grid>
                ))}
          </Grid>
          <Box>{`가능 인원 : ${userCount} / ${totalMemberNumber}`}</Box>
        </>
        <Button variant="contained" onClick={onClose}>
          닫기
        </Button>
      </Dialog>
    )
  }

  content = makeContent(targetDateInfo.date, 0, [])

  if (isFetching) {
    content = (
      <Dialog open={open} onClose={onClose}>
        <CircularProgress />
      </Dialog>
    )
  } else if (isSuccess) {
    const { data: meetingDate } = response
    content = makeContent(
      meetingDate.date,
      meetingDate.userCount,
      meetingDate.dateUsers
    )
  }

  return <div>{content}</div>
}

export default SelectedDateModal
