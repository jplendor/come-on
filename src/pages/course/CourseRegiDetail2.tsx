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
    if (placeData.length !== 0) setIsValid(true)
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

  const onRemove = async (index: number): Promise<void> => {
    const filteredData = placeData.filter((place) => place.order !== index)
    const deleteData = placeData.filter((place) => place.order === index)
    /* eslint array-callback-return: "error" */
    // eslint-disable-next-line array-callback-return, @typescript-eslint/no-explicit-any
    const data = filteredData.map((place: CoursePlace): any => {
      const temp = place
      if (place.order > index) {
        const temp2 = { ...temp, order: temp.order - 1 }
        return temp2
      }
      return temp
    })
    setPlaceData(data)

    // 전역 상태인 course에서 삭제시키고

    dispatch(updateCoursePlace(data))

    // 딜리트에 넣어서 db에서 삭제시키기
    const deleteCourse = {
      courseId: id,
      toDelete: deleteData,
    }
    const res = await updateCoursePlaceToDB(deleteCourse)

    // toSave에도 추가하면 안됨
  }

  const onClicKNextPage = (): void => {
    setPage(page + 1)
  }

  // order바꿔주기
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
        {/* //dragDropContext */}
        <DragDropContext onDragEnd={onDragEnd}>
          {placeList.length !== 0 && (
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
  )
}

export default CourseRegiDetail2
