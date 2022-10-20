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
import { generateComponent } from "utils"
import MapContainer from "components/common/course/MapContainer"
import { Link, useNavigate } from "react-router-dom"
import { RootState } from "store"
import { updateCoursePlace } from "features/course/courseSlice"
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

const CourseEditDetail2 = ({ id, setPage, page }: pageProps): JSX.Element => {
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
  }, [])

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
    const filteredData = courseData.filter((place) => place.order !== index)
    setCourseData(filteredData)
    /* eslint array-callback-return: "error" */
    // eslint-disable-next-line array-callback-return
    const data = courseData.map((place: CoursePlaceState): any => {
      const temp = place
      if (place.order > index) {
        temp.order -= 1
        return temp
      }
      return temp
    })
    setCourseData(data)
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
  // order바꿔주기
  console.log(placeList)
  // 다음으로 가는 버튼을 누르면 toSave에 Save된 것들이
  // toModify엔 toModify 배열이, toDelete엔 삭제할 것들의 정보가.
  // 전역으로 담겨있어야 할까? 아니면 props로 ?

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
        {placeList[0].order !== 0 && (
          // droppable
          <Droppable droppableId="placeData">
            {(provided) => (
              <Box ref={provided.innerRef} {...provided.droppableProps}>
                {generateComponent(placeList, (item, key) => (
                  <PlaceDetailDraggableCard
                    item={{ ...item, id: item.order + 1 }}
                    key={key}
                    onClick={onClickFocus}
                    isSelected={
                      item.order ===
                      (selectedNumber === "" ? -10 : Number(selectedNumber))
                    }
                    onRemove={onRemove}
                    maxLen={placeList.length}
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
