import React from "react"
import {
  Box,
  Dialog,
  Grid,
  Avatar,
  CircularProgress,
  Typography,
} from "@mui/material"

import { generateComponent } from "utils"
import { useGetMeetingDateQuery } from "features/meeting/meetingSlice"
import theme from "theme"
import styled from "@emotion/styled"

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
  height: "60px",
  backgroundColor: theme.grayscale[100],
  color: theme.grayscale[700],
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

const PAPER_PROPS = {
  width: "280px",
  minHeight: "150px",
  borderRadius: "10px",
  display: "flex",
}

const NO_MEMBER = {
  height: "90px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

const GRID_CONTAINER = {
  p: "15px",
}

const GRID_ITEM = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

const SUMMARY = {
  height: "60px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderTop: `solid 2px ${theme.grayscale[200]}`,
}

const Count = styled.span`
  color: ${theme.palette.primary.main};
`

const DAYOFWEEK_LIST = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

const getDayOfWeek = (date: string): string => {
  const index = new Date(date).getDay()

  return DAYOFWEEK_LIST[index]
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
        <Typography sx={DIALOG_TITLE} variant="subtitle1">
          {`${date.replaceAll("-", ".")}(${getDayOfWeek(date)})`}
        </Typography>
        {userCount === 0 ? (
          <Box sx={NO_MEMBER}>
            <Typography>가능한 인원이 없습니다</Typography>
          </Box>
        ) : (
          <>
            <Grid container sx={GRID_CONTAINER}>
              {generateComponent(dateUsers, (data, key) => (
                <Grid item key={key} sx={GRID_ITEM} xs={12}>
                  <Avatar
                    alt="프로필 이미지"
                    src={data.imageLink}
                    sx={{ mr: "10px" }}
                  />
                  <Typography variant="subtitle1">{data.nickname}</Typography>
                </Grid>
              ))}
            </Grid>
            <Box sx={SUMMARY}>
              <Typography variant="subtitle1" fontWeight="bold">
                {"가능 인원 : "} <Count> {userCount}</Count>
                {` / ${totalMemberNumber}`}
              </Typography>
            </Box>
          </>
        )}
      </Dialog>
    )
  }

  content = makeContent(targetDateInfo.date, 0, [])

  if (isFetching) {
    content = (
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            ...PAPER_PROPS,
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
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

  return <Box>{content}</Box>
}

export default SelectedDateModal
