/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react"
import { useDispatch, useSelector } from "react-redux"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import { styled } from "@mui/material/styles"
import { Box, IconButton } from "@mui/material"
import { Add } from "@mui/icons-material"
import MapContainer from "components/common/course/MapContainer"
import { Link, useNavigate } from "react-router-dom"
import { RootState } from "store"
import { updateCoursePlace, updateToDelete } from "features/course/courseSlice"
import CourseNextStepButton from "components/user/course/CourseNextStepButton"
import PlaceDetailDraggableCard from "components/common/card/PlaceDetailDraggableCard "
import { CoursePlaceProps } from "types/API/course-service"

const IconContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "right",
}))

const MainContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}))

const ICON_STYLE = {
  margin: "5px 0",
}

enum PlaceType {
  m = "meeting",
  c = "course",
}

interface CoursePlaceState {
  order: number
  name: string
  description: string
  lng: number // 경도 x
  lat: number // 위도 y
  apiId: number
  category: string
  address: string
  id: number
}

interface pageProps {
  page: number
  setPage: Dispatch<SetStateAction<number>>
  id: number
}

const CourseEditDetail2 = ({ id }: pageProps): JSX.Element => {
  const [selectedNumber, setselectedNumber] = useState<string>("")
  const [isValid, setIsValid] = useState(false)
  const placeList: CoursePlaceProps[] = useSelector((state: RootState) => {
    return state.course.coursePlaces
  })
  const [placeData, setPlacedata] = useState<CoursePlaceState[]>(placeList)
  const [courseData, setCourseData] = useState<CoursePlaceState[]>(placeList)

  const onValid = useCallback((): void => {
    if (placeList[0].order !== 0) setIsValid(true)
    else {
      setIsValid(false)
    }
  }, [placeList])

  // setPage(2)

  useEffect(() => {
    onValid()
  }, [isValid, onValid])

  const onClickFocus = (event: React.MouseEvent<HTMLDivElement>): any => {
    const e = event?.currentTarget
    if (e) {
      setselectedNumber(e.id)
    } else {
      setselectedNumber("")
    }
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onRemove = (index: number): void => {
    const toDeleteData = courseData.filter((place) => place.order === index)
    dispatch(updateToDelete({ id: toDeleteData[0].id }))
    const filteredData = courseData.filter((place) => place.order !== index)

    const newData = []

    // 마지막 값 pop
    if (courseData.length !== 1)
      for (let i = 0; i < filteredData.length; i += 1) {
        if (filteredData[i].order > index) {
          const temp = { ...filteredData[i], order: filteredData[i].order - 1 }
          newData.push(temp)
        }
        newData.push(filteredData[i])
      }
    if (index !== courseData.length) newData.pop()

    // const data = filteredData.map((place: CoursePlaceState) => {
    //   const temp = place
    //   console.log(temp)
    //   if (index > place.order) {
    //     // eslint-disable-next-line no-param-reassign
    //     place.order -= 1
    //     return temp
    //   }
    //   return temp
    // })

    setCourseData(newData)
  }

  const onClicKNextPage = (): void => {
    navigate(`/course/${id}/update`, { state: 3 })
  }

  const onDragEnd = (result: any): void => {
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

    const newPlace: Array<CoursePlaceState> = []
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
    setPlacedata(newPlace)

    dispatch(updateCoursePlace(newPlace))
  }

  return (
    <MainContainer>
      <MapContainer
        selectedNumber={selectedNumber}
        placeLists={placeData}
        isSuccess={placeList !== undefined}
        isLoading={placeList === undefined}
      />
      <IconContainer>
        <IconButton type="button">
          <Link to="register">
            <Add sx={ICON_STYLE} color="secondary" fontSize="large" />
          </Link>
        </IconButton>
      </IconContainer>
      {/* 카카오톡 공유하기 */}
      {/* //dragDropContext */}
      <DragDropContext onDragEnd={onDragEnd}>
        {courseData.length !== 0 && (
          // droppable
          <Droppable droppableId="placeData">
            {(provided) => (
              <Box ref={provided.innerRef} {...provided.droppableProps}>
                {courseData.map((item) => (
                  <PlaceDetailDraggableCard
                    item={{ ...item, id }}
                    onClick={onClickFocus}
                    isSelected={
                      item.order ===
                      (selectedNumber === "" ? -10 : Number(selectedNumber))
                    }
                    onRemove={onRemove}
                    maxLen={courseData.length}
                    mode={PlaceType.c}
                  />
                ))}

                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        )}
      </DragDropContext>
      <CourseNextStepButton
        content="다음단계"
        isValid={isValid}
        onClick={onClicKNextPage}
      />
    </MainContainer>
  )
}

export default CourseEditDetail2
