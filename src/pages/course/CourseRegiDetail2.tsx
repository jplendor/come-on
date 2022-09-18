import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useRef,
} from "react"

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

let SAMPLE_DATA2: ListDetailCardProp[] = [
  {
    index: 1,
    titleTop: "음식점",
    titleBody: "오리파는 집",
    titleBottom: "부산 토박이만 하는 맛집",
  },
  {
    index: 2,
    titleTop: "포장마차",
    titleBody: "39포차",
    titleBottom: "비가오는 날이면..",
  },
  {
    index: 3,
    titleTop: "유흥주점",
    titleBody: "와글와글노래방",
    titleBottom: "노래방 3시간 먼저가는사람 대머리",
  },
]

const CourseRegiDetail2 = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const selectFile = useRef<any>(null)
  const [isSelected, setSelected] = useState("")
  const [courseData, setCourseData] =
    useState<ListDetailCardProp[]>(SAMPLE_DATA2)

  const onClickFocus = (event: React.MouseEvent<HTMLDivElement>): any => {
    const e = event?.currentTarget
    if (e) {
      setSelected(e.id)
    } else setSelected("")
  }

  const onRemove = (index: number): void => {
    const filteredData = courseData.filter((place) => place.index !== index)
    SAMPLE_DATA2 = filteredData
    /* eslint array-callback-return: "error" */
    // eslint-disable-next-line array-callback-return
    const data = SAMPLE_DATA2.map((place: ListDetailCardProp): any => {
      const temp = place
      if (place.index > index) {
        temp.index -= 1
        return temp
      }
      return temp
    })

    console.log(data)
    setCourseData(data)
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
            <Add sx={ICON_STYLE} color="secondary" fontSize="large" />
          </IconButton>
        </IconContainer>
        {/* 카카오톡 공유하기 */}
        {/* 버튼만들기 */}
        {generateComponent(courseData, (item, key) => (
          <ListDetailCard
            item={item}
            key={key}
            onClick={onClickFocus}
            isSelected={isSelected}
            onRemove={onRemove}
          />
        ))}
      </MainContainer>
    </>
  )
}

export default CourseRegiDetail2
