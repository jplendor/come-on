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
import { useNavigate } from "react-router-dom"
import { AppDispatch, RootState } from "store"
import {
  deleteToModify,
  deleteToSave,
  fetchByIdCourseDetail,
  fetchByIdCoursePlaces,
  updateCoursePlace,
  updateToDelete,
  updateToModify,
  useDeleteCoursePlaceMutation,
  useUpdateCoursePlaceToDBMutation,
} from "features/course/courseSlice"
import CourseNextStepButton from "components/user/course/CourseNextStepButton"
import PlaceDetailDraggableCard from "components/common/card/PlaceDetailDraggableCard "
import {
  CourseError,
  CoursePlaceProps,
  CourseUpdatePlaceProps,
} from "types/API/course-service"
import AddCourseBox from "components/common/course/AddCourseBox"
import { generateComponent } from "utils"

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

const MAIN_CONTAINER = {
  padding: "20px",
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

const CourseEditDetail2 = ({ id, setPage }: pageProps): JSX.Element => {
  const [selectedNumber, setselectedNumber] = useState<string>("")
  const [isValid, setIsValid] = useState(false)
  const placeList: CoursePlaceProps[] = useSelector((state: RootState) => {
    return state.course.coursePlaces
  })
  const updatePlaces: CourseUpdatePlaceProps = useSelector(
    (state: RootState) => {
      return state.course.updatePlaces
    }
  )
  const [deleteCoursePlace, { error }] = useDeleteCoursePlaceMutation()
  const [updateCoursePlaceToDB] = useUpdateCoursePlaceToDBMutation()
  const [placeData, setPlaceData] = useState<CoursePlaceState[]>(placeList)
  const [courseData, setCourseData] = useState<CoursePlaceState[]>(placeList)
  const dispatch = useDispatch<AppDispatch>()

  const onValid = useCallback((): void => {
    if (placeData === undefined || placeData.length !== 0) setIsValid(true)
    else {
      setIsValid(false)
    }
  }, [placeData])

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

  const setUpdateCourse = async (): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const updateCourse = {
      courseId: id,
      toSave: updatePlaces.toSave,
      toModify: updatePlaces.toModify,
      toDelete: updatePlaces.toDelete,
    }
    await updateCoursePlaceToDB(updateCourse)
  }

  const navigate = useNavigate()

  // 1. 수정했던 데이터를 삭제할경우 = toModify배열에서 삭제하고, toCourse에서 삭제해야함
  // 1-1. 추가리스트의 경우 - toSave에서 삭제, course에서 삭제
  // 1-2. 원본의 경우 - toModify에서 삭제, toCOurse에서 삭제, toDelete에 올림

  // 원본데이터를 삭제할 경우, toDelete에 올리고 courseList에서 삭제하고, modify에 있다면 삭제
  // 추가데이터를 삭제할 경우, courseList에서 삭제하고 toSave에서 삭제함

  const onRemove = async (index: number): Promise<void> => {
    const toDeleteData = placeData.filter((place) => place.order === index)
    const restDeleteData = placeData.filter((place) => place.order !== index)

    await deleteCoursePlace({
      courseId: String(id),
      coursePlaceId: String(toDeleteData[0].id),
    })

    setPlaceData(restDeleteData)
    updateCoursePlace(restDeleteData)
  }

  const dis = useCallback(async () => {
    const myCourseData = await dispatch(fetchByIdCourseDetail(id))

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const myData: any = myCourseData
    dispatch(updateCoursePlace(myData.payload.coursePlaces))
    setPlaceData(myData.payload.coursePlaces)
  }, [dispatch, id])

  useEffect(() => {
    dis()
  }, [])

  const onClicKNextPage = async (): Promise<void> => {
    await setUpdateCourse()
    setPage(4)
    navigate(`/course/${id}/update`, { state: 3 })
  }

  const onDragEnd = async (result: any): Promise<void> => {
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

    const newPlaceNames = placeList.map((place) => {
      return place.id
    })

    newPlaceNames.splice(source.index, 1)
    newPlaceNames.splice(destination.index, 0, draggableId)
    const newPlace: Array<CoursePlaceState> = []
    for (let i = 0; i < newPlaceNames.length; i += 1) {
      const temp: any = placeData.filter((place) => {
        return String(place.id) === String(newPlaceNames[i])
      })
      const temp2 = { ...temp[0] }
      const newState = {
        ...temp2,
        order: i + 1,
      }
      newPlace.push(newState)
    }

    setCourseData(newPlace)
    dispatch(updateCoursePlace(newPlace))

    await setUpdateCourse()
    // 전부 toModify에 올려서 보내기
    dispatch(updateToModify(newPlace))
    // 데이터 저장 개념으로 한번 보내고
    await setUpdateCourse()
  }

  const handleAddClick = (): void => {
    setPage(2)
  }
  return (
    placeData && (
      <MainContainer sx={MAIN_CONTAINER}>
        {placeData.length !== 0 && (
          <MapContainer
            selectedNumber={selectedNumber}
            placeLists={placeData}
            isSuccess={placeData !== undefined}
            isLoading={placeData === undefined}
          />
        )}
        <IconContainer />
        {placeData.length !== 0 && placeData[0] !== undefined && (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="placeData">
              {(provided) => (
                <Box ref={provided.innerRef} {...provided.droppableProps}>
                  {generateComponent(placeData, (item, key) => (
                    <PlaceDetailDraggableCard
                      item={{ ...item, id: item.id }}
                      key={key}
                      onClick={onClickFocus}
                      isSelected={
                        item.order ===
                        (selectedNumber === "" ? -10 : Number(selectedNumber))
                      }
                      editing
                      onRemove={onRemove}
                      maxLen={placeData.length}
                      mode={PlaceType.c}
                    />
                  ))}

                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </DragDropContext>
        )}
        <AddCourseBox onClick={handleAddClick} />
        <CourseNextStepButton
          content="다음단계"
          isValid={isValid}
          onClick={onClicKNextPage}
        />
      </MainContainer>
    )
  )
}

export default CourseEditDetail2
