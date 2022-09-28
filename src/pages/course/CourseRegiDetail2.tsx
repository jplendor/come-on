import React, { Dispatch, SetStateAction, useState } from "react"
import { useSelector } from "react-redux"

import { styled } from "@mui/material/styles"
import { Box, IconButton } from "@mui/material"
import { Add } from "@mui/icons-material"
import { generateComponent } from "utils"
import MapContainer from "components/common/course/MapContainer"
import { Link } from "react-router-dom"
import { RootState } from "store"
import CourseNextStepButton from "components/user/course/CourseNextStepButton"
import DisplayListDetailCard from "components/common/card/DisplayListDetailCard"
import { setSelectionRange } from "@testing-library/user-event/dist/utils"

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

interface CoursePlaceState {
  order: number
  name: string
  description: string
  lng: number // 경도 x
  lat: number // 위도 y
  apiId: number
  category: string
}

interface pageProps {
  page: number
  setPage: Dispatch<SetStateAction<number>>
}

const CourseRegiDetail2 = ({ setPage, page }: pageProps): JSX.Element => {
  const [selectedNumber, setselectedNumber] = useState<string>("")
  const placeList = useSelector((state: RootState) => {
    return state.course.coursePlaces
  })

  const [courseData, setCourseData] = useState<CoursePlaceState[]>(placeList)

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

  setPage(2)

  const onClicKNextPage = (): void => {
    setPage(page + 1)
  }

  return (
    <MainContainer>
      <MapContainer
        selectedNumber={String(selectedNumber)}
        placeLists={placeList}
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
      {/* 버튼만들기 */}
      {placeList[0].order !== 0 &&
        generateComponent(placeList, (item, key) => (
          <DisplayListDetailCard
            item={item}
            key={key}
            onClick={onClickFocus}
            isSelected={
              item.order ===
              (selectedNumber === "" ? -10 : Number(selectedNumber))
            }
            onRemove={onRemove}
            maxLen={placeList.length}
          />
        ))}
      <CourseNextStepButton content="다음단계" onClick={onClicKNextPage} />
    </MainContainer>
  )
}

export default CourseRegiDetail2
