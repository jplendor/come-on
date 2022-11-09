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
import { Box } from "@mui/material"
import { generateComponent } from "utils"
import MapContainer from "components/common/course/MapContainer"
import { AppDispatch, RootState } from "store"
import {
  updateCoursePlace,
  useUpdateCoursePlaceToDBMutation,
  fetchByIdCoursePlaces,
  updateToModify,
  useDeleteCoursePlaceMutation,
} from "features/course/courseSlice"
import CourseNextStepButton from "components/user/course/CourseNextStepButton"
import PlaceDetailDraggableCard from "components/common/card/PlaceDetailDraggableCard "
import {
  CoursePlace,
  CoursePlaceProps,
  coursePlaceToModify,
  CourseUpdatePlaceProps,
} from "types/API/course-service"
import AddCourseBox from "components/common/course/AddCourseBox"

const MainContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}))
const MAIN_CONTAINER = {
  padding: "20px",
}

enum PlaceType {
  m = "meeting",
  c = "course",
}

interface pageProps {
  page: number
  setPage: Dispatch<SetStateAction<number>>
  id: number
}
const CourseRegiDetail2 = ({ setPage, page, id }: pageProps): JSX.Element => {
  const [deleteCoursePlace] = useDeleteCoursePlaceMutation()
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
  const [placeData, setPlaceData] = useState<CoursePlace[]>(placeList)

  const setUpdateCourseForDnD = async (
    newModify: coursePlaceToModify[]
  ): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const updateCourse = {
      courseId: id,
      toModify: newModify,
    }
    await updateCoursePlaceToDB(updateCourse)
  }
  const dis = useCallback(async () => {
    const myCourseData = await dispatch(fetchByIdCoursePlaces(id))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const myData: any = myCourseData
    dispatch(updateCoursePlace(myData.payload.data.contents))
    setPlaceData(myData.payload.data.contents)
  }, [dispatch, id])

  useEffect(() => {
    dis()
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    const newPlaceNames = placeData.map((place: { id: number }) => {
      return place.id
    })
    newPlaceNames.splice(source.index, 1)

    newPlaceNames.splice(destination.index, 0, Number(draggableId))

    const newPlace: Array<CoursePlace> = []
    for (let i = 0; i < newPlaceNames.length; i += 1) {
      const temp: CoursePlace[] = placeData.filter((place: { id: number }) => {
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

    dispatch(updateCoursePlace(newPlace))
    // 로직 끝난후에 코스에 데이터 등록

    const newModify: coursePlaceToModify[] = []
    // eslint-disable-next-line array-callback-return
    newPlace.map((place) => {
      const modifyPlace = {
        id: place.id,
        description: place.description,
        order: place.order,
        category: place.category,
      }
      newModify.push(modifyPlace)
    })

    dispatch(updateToModify(newModify))

    await setUpdateCourseForDnD(newModify)
  }

  const onValid = useCallback((): void => {
    if (placeData && placeData.length !== 0) setIsValid(true)
    else {
      setIsValid(false)
    }
  }, [placeData])

  useEffect(() => {
    onValid()
  }, [isValid, onValid])

  const onClickFocus = (event: React.MouseEvent<HTMLDivElement>): void => {
    const e = event?.currentTarget
    if (e) {
      setselectedNumber(e.id)
    } else {
      setselectedNumber("")
    }
  }

  const onRemove = async (placeId: number): Promise<void> => {
    const res = await deleteCoursePlace({
      courseId: String(id),
      coursePlaceId: String(placeId),
    })

    const resData = res as any
    const newData = resData.data.data.coursePlaces

    setPlaceData(newData)
    dispatch(updateCoursePlace(newData))
  }

  const onClicKNextPage = (): void => {
    setPage(page + 1)
  }

  // order바꿔주기
  const handleAddClick = (): void => {
    setPage(2)
  }
  return (
    <MainContainer sx={MAIN_CONTAINER}>
      {placeList && placeList.length !== 0 && (
        <MapContainer
          selectedNumber={selectedNumber}
          placeLists={placeList}
          isSuccess={placeList !== undefined}
          isLoading={placeList === undefined}
        />
      )}
      <DragDropContext onDragEnd={onDragEnd}>
        {placeList && placeList.length !== 0 && placeList[0] !== undefined && (
          // droppable
          <Droppable droppableId="placeData">
            {(provided) => (
              <Box ref={provided.innerRef} {...provided.droppableProps}>
                {generateComponent(placeList, (item, key) => (
                  <PlaceDetailDraggableCard
                    item={{ ...item, id: item.id }}
                    key={key}
                    onClick={onClickFocus}
                    isSelected={
                      item.order ===
                      (selectedNumber === "" ? -10 : Number(selectedNumber))
                    }
                    editing={false}
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
