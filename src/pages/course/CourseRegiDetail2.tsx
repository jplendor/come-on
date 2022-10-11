/* eslint-disable react/jsx-props-no-spreading */
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react"
import { useSelector } from "react-redux"
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd"
import { styled } from "@mui/material/styles"
import { Box, IconButton } from "@mui/material"
import { Add } from "@mui/icons-material"
import { generateComponent } from "utils"
import MapContainer from "components/common/course/MapContainer"
import { Link } from "react-router-dom"
import { RootState } from "store"
import CourseNextStepButton from "components/user/course/CourseNextStepButton"
import PlaceDetailDraggableCard from "components/common/card/PlaceDetailDraggableCard "

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
}

interface pageProps {
  page: number
  setPage: Dispatch<SetStateAction<number>>
}

interface MyData {
  placeLists: CoursePlaceState[]
}

const CourseRegiDetail2 = ({ setPage, page }: pageProps): JSX.Element => {
  const [selectedNumber, setselectedNumber] = useState<string>("")
  const [isValid, setIsValid] = useState(false)
  const placeList = useSelector((state: RootState) => {
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
    setPage(page + 1)
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
  }
  // order바꿔주기

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
          <Link to="/course/register">
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
                {generateComponent(placeData, (item, key) => (
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

export default CourseRegiDetail2
