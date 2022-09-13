import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Grid, Typography, Stack, Avatar, Box, Button } from "@mui/material"
import { generateComponent } from "utils"
import { useTheme } from "@mui/material/styles"
import Calendar from "../../components/Calendar"

const MeetingEdit = (): JSX.Element => {
  const { meetingId } = useParams()
  // 임시 데이터
  const [meetingInfo, setMeetingInfo] = useState({
    id: 1000,
    myMeetingUserId: 11,
    myMeetingRole: "PARTICIPANT",
    title: "물개들의 모임",
    startDate: "2022-06-10",
    endDate: "2022-06-30",
    meetingUsers: [
      {
        id: 10,
        nickname: "마라탕마스터",
        imageLink:
          "https://cdn.pixabay.com/photo/2017/11/19/07/30/girl-2961959_960_720.jpg",
        meetingRole: "HOST",
      },
      {
        id: 11,
        nickname: "옥수수수염남",
        imageLink:
          "https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_960_720.jpg",
        meetingRole: "PARTICIPANT",
      },
      {
        id: 12,
        nickname: "하하호호",
        imageLink:
          "https://cdn.pixabay.com/photo/2018/02/16/14/38/portrait-3157821_960_720.jpg",
        meetingRole: "PARTICIPANT",
      },
    ],
    meetingDates: [
      {
        id: 10,
        date: "2022-06-15",
        userCount: 1,
        dateStatus: "UNFIXED",
      },
      {
        id: 11,
        date: "2022-06-25",
        userCount: 2,
        dateStatus: "FIXED",
      },
    ],
    meetingPlaces: [
      {
        id: 10,
        name: "place1",
        memo: "memo1",
        lat: 10.1,
        lng: 20.1,
        order: 1,
      },
      {
        id: 11,
        name: "place2",
        memo: "memo2",
        lat: 110.1,
        lng: 120.1,
        order: 2,
      },
    ],
  })

  const theme = useTheme()

  useEffect(() => {
    // 모임 단건 조회
    // get("/meeting/{meetingId}")
  }, [])

  return (
    <Box sx={{ overflow: "auto", height: "100%" }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" component="h2">
            {meetingInfo.title}
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
            {meetingInfo.meetingUsers.length}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" spacing={2}>
            {generateComponent(meetingInfo.meetingUsers, (data, key) => (
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
          <Calendar meetingInfo={meetingInfo} />
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
    </Box>
  )
}

export default MeetingEdit
