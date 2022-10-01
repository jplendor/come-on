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
  Container,
} from "@mui/material"
import { generateComponent } from "utils"
import { useTheme } from "@mui/material/styles"
import Calendar from "components/meeting/Calendar"
import { useGetMeetingQuery } from "features/meeting/meetingSlice"
import DisplayListDetailCard, {
  PlaceType,
} from "components/common/card/DisplayListDetailCard"
import { MapOutlined } from "@mui/icons-material"
import Header from "components/meeting/Header"
import styled from "@emotion/styled"

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

const Title = styled(Typography)`
  font-weight: bold;
  margin-right: 10px;
`

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
    navigate(`/meeting/${meetingId}/place`)
  }

  let content
  if (isFetching) {
    content = <CircularProgress />
  } else if (isSuccess) {
    const { data: meeting } = response

    content = (
      <Container>
        <Header text={meeting.title} />
        <Grid container spacing={3} sx={{ mt: "20px", mb: "20px" }}>
          <Grid item xs={12} sx={{ display: "flex" }}>
            <Title>모임멤버</Title>
            <Title sx={{ color: theme.palette.primary.main }}>
              {meeting.meetingUsers.length}
            </Title>
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
            <Title>모임일정</Title>
          </Grid>
          <Grid item xs={12}>
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
            <Title>모임장소</Title>
          </Grid>
          <Grid item xs={12}>
            <div>
              {generateComponent(meeting.meetingPlaces, (data, key) => (
                <DisplayListDetailCard
                  mode={PlaceType.m}
                  item={data}
                  key={key}
                  isSelected
                  maxLen={meeting.meetingPlaces.length}
                  onClick={() => {
                    console.log("click")
                  }}
                  onRemove={() => {
                    console.log("remove")
                  }}
                />
              ))}
            </div>
            <Box sx={NewPlace} onClick={addNewPlace}>
              <MapOutlined />
              <Typography>새로운 장소를 추가해보세요</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" fullWidth>
              코스로 공유하기
            </Button>
          </Grid>
        </Grid>
      </Container>
    )
  }

  return <Box sx={{ overflow: "auto", height: "100%" }}>{content}</Box>
}

export default MeetingEdit
