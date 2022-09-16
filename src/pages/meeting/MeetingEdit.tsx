import React from "react"
import { useParams } from "react-router-dom"
import {
  Grid,
  Typography,
  Stack,
  Avatar,
  Box,
  Button,
  CircularProgress,
} from "@mui/material"
import { generateComponent } from "utils"
import { useTheme } from "@mui/material/styles"
import Calendar from "components/meeting/Calendar"
import { useGetMeetingQuery } from "features/meeting/meetingSlice"

const MeetingEdit = (): JSX.Element => {
  const { meetingId } = useParams()

  const {
    data: response,
    isFetching,
    isSuccess,
  } = useGetMeetingQuery(Number(meetingId))

  const theme = useTheme()

  let content
  if (isFetching) {
    content = <CircularProgress />
  } else if (isSuccess) {
    const { data: meeting } = response

    content = (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" component="h2">
            {meeting.title}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h5" component="h2">
            모임 멤버
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography
            variant="h5"
            component="h2"
            sx={{ color: theme.palette.primary.main }}
          >
            {meeting.meetingUsers.length}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" spacing={2}>
            {generateComponent(meeting.meetingUsers, (data, key) => (
              <Avatar
                key={key}
                src={data.imageLink}
                alt={`${data.nickname} 프로필 이미지`}
              />
            ))}
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" component="h2">
            모임 일정
          </Typography>
          <Calendar
            meetingInfo={{
              meetingId: meeting.id,
              startDate: meeting.startDate,
              endDate: meeting.endDate,
              meetingUsers: meeting.meetingUsers,
              meetingDates: meeting.meetingDates,
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h5" component="h2">
            모임 장소
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Button>코스로 공유하기</Button>
        </Grid>
        <Grid item xs={4}>
          <Button>코스 추가</Button>
        </Grid>
        <Grid item xs={12}>
          {/* 모임 장소 리스트 */}
        </Grid>
      </Grid>
    )
  }

  return <Box sx={{ overflow: "auto", height: "100%" }}>{content}</Box>
}

export default MeetingEdit
