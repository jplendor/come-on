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
  useUpdateMeetingPlaceMutation,
} from "features/meeting/meetingSlice"
import PlaceDetailDraggableCard, {
  PlaceType,
} from "components/common/card/PlaceDetailDraggableCard "
import { MapOutlined } from "@mui/icons-material"
import Header from "components/meeting/Header"
import styled from "@emotion/styled"
import MemberInfoModal from "components/meeting/MemberInfoModal"
import { User, Place as MeetingPlace } from "types/API/meeting-service"
import { Place as CoursePlace } from "components/common/card/SearchCard"
import { useDispatch } from "react-redux"
import { addCoursePlace } from "features/course/courseSlice"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import PlaceDetailCard from "components/common/card/PlaceDetailCard"

const CATEGORY_LIST = [
  { name: "SCHOOL", value: "학교" },
  { name: "CAFE", value: "카페" },
  { name: "BAR", value: "술집" },
  { name: "SPORT", value: "스포츠" },
  { name: "SHOPPING", value: "쇼핑" },
  { name: "ETC", value: "기타" },
  { name: "ATTRACTION", value: "관광명소" },
  { name: "RESTAURANT", value: "음식점" },
  { name: "ACCOMMODATION", value: "숙박" },
  { name: "CULTURE", value: "문화시설" },
  { name: "ACTIVITY", value: "액티비티" },
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

const Title = styled(Typography)`
  font-weight: bold;
  margin-right: 10px;
`

const MeetingEdit = (): JSX.Element => {
  const { meetingId } = useParams()

  const [memberInfoModalOpen, setmMemberInfoModalOpen] = useState(false)
  const [clickedMember, setClickedMember] = useState<User>()
  const [selectedNumber, setselectedNumber] = useState<string>("")

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
  const [updateMeetingPlaceMutation] = useUpdateMeetingPlaceMutation()

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

  const onClickFocus = (event: React.MouseEvent<HTMLDivElement>): void => {
    const e = event?.currentTarget
    if (e) {
      setselectedNumber(e.id)
    } else {
      setselectedNumber("")
    }
  }

  let content
  if (isFetching) {
    content = <CircularProgress />
  } else if (isSuccess) {
    const { data: meeting } = response

    const isHost = meeting.myMeetingRole === "HOST"
    const isEditable = isHost || meeting.myMeetingRole === "EDITOR"

    const onDragEnd = async (result: any): Promise<void> => {
      const placeData = meeting.meetingPlaces

      const { destination, source, draggableId } = result
      if (!destination) {
        return
      }
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return
      }
      const newPlaceNames = placeData.map((place) => {
        return place.name
      })
      newPlaceNames.splice(source.index, 1)
      newPlaceNames.splice(destination.index, 0, draggableId)
      const newPlace: Array<MeetingPlace> = []
      for (let i = 0; i < newPlaceNames.length; i += 1) {
        const temp: any = placeData.filter((place) => {
          return place.name === newPlaceNames[i]
        })
        const temp2 = { ...temp[0] }
        const newState = {
          ...temp2,
          order: i + 1,
        }
        newPlace.push(newState)
      }

      let targetPlace = newPlace[destination.index]

      const categoryCode = CATEGORY_LIST.filter(
        (it) => it.value === targetPlace.category
      )[0].name

      targetPlace = { ...targetPlace, category: categoryCode }

      try {
        const res = await updateMeetingPlaceMutation({
          meetingId: Number(meetingId),
          placeId: targetPlace.id,
          updatedPlace: targetPlace,
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

    const shareMeetingPlaceToCourse = (): void => {
      const placeData = meeting.meetingPlaces

      for (let i = 0; i < placeData.length; i += 1) {
        const newPlace = makeNewPlace(placeData[i])
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
              {isEditable ? (
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="placeData">
                    {(provided) => (
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      <Box ref={provided.innerRef} {...provided.droppableProps}>
                        {generateComponent(
                          meeting.meetingPlaces,
                          (data, key) => (
                            <PlaceDetailDraggableCard
                              mode={PlaceType.m}
                              item={data}
                              key={key}
                              isSelected={
                                data.order ===
                                (selectedNumber === ""
                                  ? -10
                                  : Number(selectedNumber))
                              }
                              maxLen={meeting.meetingPlaces.length}
                              onClick={onClickFocus}
                              onRemove={onRemove}
                            />
                          )
                        )}
                        {provided.placeholder}
                      </Box>
                    )}
                  </Droppable>
                </DragDropContext>
              ) : (
                generateComponent(meeting.meetingPlaces, (data, key) => (
                  <PlaceDetailCard
                    mode={PlaceType.m}
                    item={data}
                    key={key}
                    isSelected={
                      data.order ===
                      (selectedNumber === "" ? -10 : Number(selectedNumber))
                    }
                    maxLen={meeting.meetingPlaces.length}
                    onClick={onClickFocus}
                    onRemove={onRemove}
                    isEditable={false}
                  />
                ))
              )}
              {isEditable && (
                <Box sx={NewPlace} onClick={addNewPlace}>
                  <MapOutlined />
                  <Typography>새로운 장소를 추가해보세요</Typography>
                </Box>
              )}
            </Grid>
            {isHost && (
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={shareMeetingPlaceToCourse}
                >
                  코스로 공유하기
                </Button>
              </Grid>
            )}
          </Grid>
        </Box>
      </>
    )
  }

  return <Container>{content}</Container>
}

export default MeetingEdit
