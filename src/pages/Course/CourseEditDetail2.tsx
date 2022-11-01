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
import { RootState } from "store"
import {
  deleteToModify,
  deleteToSave,
  updateCoursePlace,
  updateToDelete,
  updateToModify,
  useUpdateCoursePlaceToDBMutation,
} from "features/course/courseSlice"
import CourseNextStepButton from "components/user/course/CourseNextStepButton"
import PlaceDetailDraggableCard from "components/common/card/PlaceDetailDraggableCard "
import {
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
  const [updateCoursePlaceToDB] = useUpdateCoursePlaceToDBMutation()
  const [placeData] = useState<CoursePlaceState[]>(placeList)
  const [courseData, setCourseData] = useState<CoursePlaceState[]>(placeList)

  const onValid = useCallback((): void => {
    if (placeList.length !== 0 || undefined) setIsValid(true)
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

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // 1. 수정했던 데이터를 삭제할경우 = toModify배열에서 삭제하고, toCourse에서 삭제해야함
  // 1-1. 추가리스트의 경우 - toSave에서 삭제, course에서 삭제
  // 1-2. 원본의 경우 - toModify에서 삭제, toCOurse에서 삭제, toDelete에 올림

  // 원본데이터를 삭제할 경우, toDelete에 올리고 courseList에서 삭제하고, modify에 있다면 삭제
  // 추가데이터를 삭제할 경우, courseList에서 삭제하고 toSave에서 삭제함

  const onRemove = (index: number): void => {
    const toDeleteData = placeList.filter((place) => place.order === index)

    // 삭제할 데이터가 ToSave에 있는지 확인 ToSave에 없다면 delete에 올림
    const { toSave, toModify } = updatePlaces
    const saveIndex = toSave?.findIndex(
      (place) => place.order === toDeleteData[0].order
    )

    // newSave배열의 길이가 0일 경우 삭제할 원본 데이터 toDelete에 올림
    // toSave에 속하는 추가데이터라면, ToSave에서 삭제시킴
    if (saveIndex !== -1) {
      dispatch(deleteToSave(toDeleteData[0]))
    }
    // toSave에 없는 원본데이터라면 toDelete에 올리고, toModify에 있다면 삭제함
    else if (saveIndex === -1 && toDeleteData[0].id !== 0) {
      dispatch(updateToDelete({ id: toDeleteData[0].id }))
      const modifyIndex = toModify?.findIndex(
        (place) => place.id === toDeleteData[0].id
      )
      if (modifyIndex !== -1) dispatch(deleteToModify(toDeleteData[0]))
    }

    // 새로운 coursePlaces 갱신하는 코드
    const filteredData = placeList.filter((place) => place.order !== index)
    const newData = []

    // 마지막 값 pop
    if (filteredData.length > 1) {
      for (let i = 0; i < filteredData.length; i += 1) {
        if (filteredData[i].order > index) {
          const temp = { ...filteredData[i], order: filteredData[i].order - 1 }
          newData.push(temp)
        }
        newData.push(filteredData[i])
      }
    } // 하나남았으니 filtered 된 데이터 넣어줌
    else if (filteredData.length === 1) {
      if (filteredData[0].order > 1)
        newData.push({ ...filteredData[0], order: filteredData[0].order - 1 })
      else if (filteredData[0].order === 1) newData.push({ ...filteredData[0] })
    }
    /** toDelete에 넣었을때 하나 삭제되는데, 그경우 즉 빈배열일경우 어쩔껀지 ..ㅎ  */

    // 코스 플레이스 갱신
    if (newData !== undefined) dispatch(updateCoursePlace(newData))
    else if (newData === undefined) dispatch(updateCoursePlace([]))
  }

  const onClicKNextPage = (): void => {
    setUpdateCourse()
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
    <MainContainer sx={MAIN_CONTAINER}>
      <MapContainer
        selectedNumber={selectedNumber}
        placeLists={placeData}
        isSuccess={placeList !== undefined}
        isLoading={placeList === undefined}
      />
      <IconContainer />
      {/* 카카오톡 공유하기 */}
      {placeList.length !== 0 && placeList[0] !== undefined && (
        <DragDropContext onDragEnd={onDragEnd}>
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
                    editing
                    onRemove={onRemove}
                    maxLen={courseData.length}
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
}

export default CourseEditDetail2
