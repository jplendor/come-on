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
import { Link } from "react-router-dom"
import { AppDispatch, RootState } from "store"
import {
  fetchByIdCourseDetail,
  useGetCoursePlacesQuery,
  updateCoursePlace,
  useUpdateCoursePlaceToDBMutation,
  fetchByIdCoursePlaces,
  updateToModify,
} from "features/course/courseSlice"
import CourseNextStepButton from "components/user/course/CourseNextStepButton"
import PlaceDetailDraggableCard from "components/common/card/PlaceDetailDraggableCard "
import {
  CoursePlaceProps,
  CoursePlacesRes,
  CourseUpdatePlaceProps,
} from "types/API/course-service"
import AddCourseBox from "components/common/course/AddCourseBox"

const IconContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "right",
}))

const MainContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}))
const MAIN_CONTAINER = {
  padding: "20px",
}
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
const CourseRegiDetail2 = ({ setPage, page, id }: pageProps): JSX.Element => {
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
  const dispatch = useDispatch<AppDispatch>()
  const [updateCoursePlaceToDB] = useUpdateCoursePlaceToDBMutation()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [placeData, setPlaceData] = useState<CoursePlaceState[]>(placeList)
  const [courseData, setCourseData] = useState<CoursePlaceState[]>(placeList)

  async function fetchMyData(): Promise<any> {
    const myCourseData = await dispatch(fetchByIdCoursePlaces(id))
    const myData: any = myCourseData

    return myData.payload.data.contents
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
  const dis = useCallback(async () => {
    const myCourseData = await dispatch(fetchByIdCoursePlaces(id))
    const myData: any = myCourseData
    setPlaceData(myData.payload.data.contents)
  }, [])

  useEffect(() => {
    dis()
  }, [])

  const onDragEnd = async (result: any): Promise<void> => {
    // 로직시작하기 전에 코스에 데이터 등록

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

    const newPlaceNames = placeData.map((place: { id: any }) => {
      return place.id
    })

    newPlaceNames.splice(source.index, 1)
    newPlaceNames.splice(destination.index, 0, draggableId)

    const newPlace: Array<CoursePlaceState> = []
    for (let i = 0; i < newPlaceNames.length; i += 1) {
      const temp: any = placeData.filter((place: { id: any }) => {
        return String(place.id) === String(newPlaceNames[i])
      })
      const temp2 = { ...temp[0] }

      const newState = {
        ...temp2,
        order: i + 1,
      }
      newPlace.push(newState)
    }
    setPlaceData(newPlace)

    // 로직 끝난후에 코스에 데이터 등록

    dispatch(updateCoursePlace(newPlace))
    await setUpdateCourse()

    dispatch(updateToModify(newPlace))
    await setUpdateCourse()
  }

  const onValid = useCallback((): void => {
    if (placeList[0].order !== 0) setIsValid(true)
    else {
      setIsValid(false)
    }
  }, [placeList])

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
    //   setPage(page + 1)
  }

  // order바꿔주기
  const handleAddClick = (): void => {
    setPage(3)
  }
  return (
    <MainContainer sx={MAIN_CONTAINER}>
      {placeData && (
        <MapContainer
          selectedNumber={selectedNumber}
          placeLists={placeData}
          isSuccess={courseData !== undefined}
          isLoading={courseData === undefined}
        />
      )}
      {/* //dragDropContext */}
      <DragDropContext onDragEnd={onDragEnd}>
        {placeData && (
          // droppable
          <Droppable droppableId="placeData">
            {(provided) => (
              <Box ref={provided.innerRef} {...provided.droppableProps}>
                {generateComponent(placeData, (item, key) => (
                  <PlaceDetailDraggableCard
                    item={{ ...item }}
                    key={key}
                    onClick={onClickFocus}
                    isSelected={
                      item.order ===
                      (selectedNumber === "" ? -10 : Number(selectedNumber))
                    }
                    editing={false}
                    onRemove={onRemove}
                    maxLen={placeData.length}
                    mode={PlaceType.c}
                  />
                ))}

                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        )}
      </DragDropContext>
      <AddCourseBox onClick={handleAddClick} />
      <CourseNextStepButton
        content="다음단계"
        isValid={isValid}
        onClick={onClicKNextPage}
      />
    </MainContainer>
  )
}

export default CourseRegiDetail2
