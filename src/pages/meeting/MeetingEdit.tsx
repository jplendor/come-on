import React from "react"
import { useParams, useNavigate } from "react-router-dom"
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
import PlaceDetailCard, {
  PlaceType,
} from "components/common/card/PlaceDetailCard "
import { MapOutlined } from "@mui/icons-material"

// 임시 데이터
const tempPlaces = [
  {
    id: 1,
    apiId: 1,
    category: "카페",
    name: "장소이름1",
    memo: "우리여기서 놀자111",
    lat: 11,
    lng: 11,
    order: 1,
    address: "주소11",
  },
  {
    id: 2,
    apiId: 2,
    category: "보드게임",
    name: "장소이름2",
    memo: "우리여기서 놀자222",
    lat: 22,
    lng: 22,
    order: 2,
    address: "주소22",
  },
]

const NewPlace = {
  border: "dashed 2px gray",
  height: "80px",
  borderRadius: "4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  cursor: "pointer",
}

const MeetingEdit = (): JSX.Element => {
  const { meetingId } = useParams()

  const {
    data: response,
    isFetching,
    isSuccess,
  } = useGetMeetingQuery(Number(meetingId))

  const theme = useTheme()

  const navigate = useNavigate()

  const addNewPlace = (): void => {
    navigate("/meeting/place")
  }

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
        <Grid item xs={4}>
          <Typography variant="h5" component="h2">
            모임 멤버
          </Typography>
        </Grid>
        <Grid item xs={8}>
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
        <Grid item xs={12}>
          <Typography variant="h5" component="h2">
            모임 장소
          </Typography>
          <div>
            {generateComponent(tempPlaces, (data, key) => (
              <PlaceDetailCard
                mode={PlaceType.m}
                item={data}
                key={key}
                isSelected
                maxLen={tempPlaces.length}
                onClick={() => {
                  console.log("click")
                }}
                onRemove={() => {
                  console.log("remove")
                }}
              />
            ))}
            <Box sx={NewPlace} onClick={addNewPlace}>
              <MapOutlined />
              <Typography>새로운 장소를 추가해보세요</Typography>
            </Box>
            <Button variant="contained" fullWidth>
              코스로 공유하기
            </Button>
          </div>
        </Grid>
      </Grid>
    )
  }

  return <Box sx={{ overflow: "auto", height: "100%" }}>{content}</Box>
}

export default MeetingEdit
