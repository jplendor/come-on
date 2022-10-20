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
import PlaceDetailCard from "components/common/card/PlaceDetailDraggableCard "
import { PlaceType } from "types/API/course-service"
import { MapOutlined } from "@mui/icons-material"
import Header from "components/meeting/Header"
import styled from "@emotion/styled"
import MemberInfoModal from "components/meeting/MemberInfoModal"
import { User, Place as MeetingPlace } from "types/API/meeting-service"
import { Place as CoursePlace } from "components/common/card/SearchCard"
import { useDispatch } from "react-redux"
import { addCoursePlace } from "features/course/courseSlice"

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
  const dispatch = useDispatch()

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

  const makeNewPlace = (place: MeetingPlace): CoursePlace => {
    const newPlace = {
      id: 0,
      order: place.order,
      name: place.name,
      description: "값을 입력해 주세요",
      lng: place.lng,
      lat: place.lat,
      apiId: place.apiId,
      category: place.category,
      address: place.address,
    }

    return newPlace
  }

  let content
  if (isFetching) {
    content = <CircularProgress />
  } else if (isSuccess) {
    const { data: meeting } = response

    const shareMeetingPlaceToCourse = (): void => {
      const places = meeting.meetingPlaces
      for (let i = 0; i < places.length; i += 1) {
        const newPlace = makeNewPlace(places[i])
        dispatch(addCoursePlace(newPlace))
      }
      navigate("/course")
    }

    content = (
      <>
        <Header text={meeting.title} />
        <Box sx={{ mt: "20px", mb: "20px" }}>
          <Grid container spacing={3}>
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
                    placement="top"
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
                  myMeetingRole={meeting.myMeetingRole}
                  open={memberInfoModalOpen}
                  handleClose={() => {
                    setmMemberInfoModalOpen(false)
                  }}
                  member={clickedMember}
                />
              )}
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Title>모임일정</Title>
              <Typography sx={{ color: theme.grayscale[700] }}>
                {`${meeting.startDate.replaceAll(
                  "-",
                  "."
                )}~${meeting.endDate.replaceAll("-", ".")}`}
              </Typography>
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
              <Button
                variant="contained"
                fullWidth
                onClick={shareMeetingPlaceToCourse}
              >
                코스로 공유하기
              </Button>
            </Grid>
          </Grid>
        </Box>
      </>
    )
  }

  return <Container>{content}</Container>
}

export default MeetingEdit
