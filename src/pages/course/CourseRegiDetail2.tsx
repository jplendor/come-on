import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useRef,
} from "react"
import { useSelector, useDispatch } from "react-redux"

import { styled } from "@mui/material/styles"
import { Box, Typography, IconButton } from "@mui/material"
import { Add } from "@mui/icons-material"
import NabvigationBar from "components/common/NavigationBar"
import Guide from "components/common/Guide"
import { generateComponent } from "utils"
import MapContainer from "components/common/MapContainer"
import ListDetailCard, {
  ListDetailCardProp,
} from "components/common/ListDetailCard"
import { ObjectType } from "typescript"
import { Link, useLocation } from "react-router-dom"
import { RootState } from "store"
import CourseNextStepButton from "components/user/course/CourseNextStepButton"
import { addCoursePlace } from "features/course/courseSlice"
import SearchPlace from "./SearchPlace"

interface NavigationBarProps {
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
  minPage: number
  maxPage: number
}

const IconContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "right",
}))

const MainContainer = styled(Box)(() => ({
  padding: "0px 20px",
  display: "flex",
  flexDirection: "column",
}))

const ICON_STYLE = {
  margin: "5px 0",
}

interface CoursePlaceState {
  order: number
  name: string
  description: string
  lng: number // 경도 x
  lat: number // 위도 y
  kakaoPlaceId: number
  placeCategory: string
}

interface pageProps {
  page: number
  setPage: Dispatch<SetStateAction<number>>
}

const CourseRegiDetail2 = ({ setPage, page }: pageProps): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const selectFile = useRef<any>(null)
  const [isSelected, setSelected] = useState("")
  const placeList = useSelector((state: RootState) => {
    return state.course.coursePlaces
  })

  const [courseData, setCourseData] = useState<CoursePlaceState[]>(placeList)

  const onClickFocus = (event: React.MouseEvent<HTMLDivElement>): any => {
    const e = event?.currentTarget
    if (e) {
      setSelected(e.id)
    } else setSelected("")
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

  const dispatch = useDispatch()

  const onClicKNextPage = (): void => {
    setPage(page + 1)
  }

  return (
    <>
      <NabvigationBar
        currentPage={1}
        setCurrentPage={setCurrentPage}
        minPage={1}
        maxPage={3}
      />
      <Guide guideStr=" 장소를 등록해 주세요!" />
      <MainContainer>
        <MapContainer selectedNumber={isSelected} />
        <IconContainer>
          <IconButton type="button">
            <Link to="/course/register">
              <Add sx={ICON_STYLE} color="secondary" fontSize="large" />
            </Link>
          </IconButton>
        </IconContainer>
        {/* 카카오톡 공유하기 */}
        {/* 버튼만들기 */}
        {placeList[0].order !== 0 &&
          generateComponent(courseData, (item, key) => (
            <ListDetailCard
              item={item}
              key={key}
              onClick={onClickFocus}
              isSelected={isSelected}
              onRemove={onRemove}
            />
          ))}
        <CourseNextStepButton content="다음단계" onClick={onClicKNextPage} />
      </MainContainer>
    </>
  )
}

export default CourseRegiDetail2
