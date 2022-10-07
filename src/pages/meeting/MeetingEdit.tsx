import React, { useState } from "react"
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
  Tooltip,
} from "@mui/material"
import { generateComponent } from "utils"
import { useTheme } from "@mui/material/styles"
import Calendar from "components/meeting/Calendar"
import {
  useDeleteMeetingPlaceMutation,
  useGetMeetingQuery,
} from "features/meeting/meetingSlice"
import PlaceDetailCard, {
  PlaceType,
} from "components/common/card/PlaceDetailCard "
import { MapOutlined } from "@mui/icons-material"
import Header from "components/meeting/Header"
import styled from "@emotion/styled"
import MemberInfoModal from "components/meeting/MemberInfoModal"
import { User } from "types/API/meeting-service"

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

  const [memberInfoModalOpen, setmMemberInfoModalOpen] = useState(false)
  const [clickedMember, setClickedMember] = useState<User>()

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

  const [deleteMeetingPlaceMutation] = useDeleteMeetingPlaceMutation()

  const onRemove = async (placeId: number): Promise<void> => {
    try {
      const res = await deleteMeetingPlaceMutation({
        meetingId: Number(meetingId),
        placeId,
      }).unwrap()

      if (res.code !== "SUCCESS") {
        throw new Error(`error code: ${res.code}`)
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      } else {
        alert(`unexpected error: ${error}`)
      }
    }
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
                <Tooltip
                  title={data.nickname}
                  key={key}
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    setClickedMember(data)
                    setmMemberInfoModalOpen(true)
                  }}
                >
                  <Avatar
                    src={data.imageLink}
                    alt={`${data.nickname} 프로필 이미지`}
                  />
                </Tooltip>
              ))}
            </Stack>
            {clickedMember && (
              <MemberInfoModal
                open={memberInfoModalOpen}
                handleClose={() => {
                  setmMemberInfoModalOpen(false)
                }}
                member={clickedMember}
              />
            )}
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
                <PlaceDetailCard
                  mode={PlaceType.m}
                  item={data}
                  key={key}
                  isSelected
                  maxLen={meeting.meetingPlaces.length}
                  onClick={() => {
                    console.log("click")
                  }}
                  onRemove={onRemove}
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
