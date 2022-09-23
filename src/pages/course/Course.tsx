import React, { useState } from "react"

import {
  Box,
  Typography,
  makeStyles,
  IconButton,
  ImageListItem,
  Button,
} from "@mui/material"

import FavoriteIcon from "@mui/icons-material/Favorite"
import { styled } from "@mui/material/styles"
import MapContainer from "components/common/MapContainer"
import KakaoShare from "components/KakaoShare"
import ListDetailCard, {
  ListDetailCardProp,
} from "components/common/ListDetailCard"
import { generateComponent } from "utils"
import KakaoIcon from "assets/nav/KakaoIcon"
import { RootState } from "store"
import { useSelector, useDispatch } from "react-redux"

const SAMPLE_DATA3 = {
  title: "사진찍기 좋은 부산여행 코스",
  author: "여행마스터",
  date: "2022-08-03", // 나중에 date형식으로 받고 표시형식 설정해야함
}

const TitleContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}))

const MainContainer = styled(Box)(() => ({
  padding: "0px 20px",
  display: "flex",
  flexDirection: "column",
}))

const ImgContainer = styled(Box)(() => ({
  margin: "0",
  padding: "0",
  width: "100%",
  height: "180px",
  objectFit: "cover",
}))

const KakaoContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "right",
  alignItems: "center",
}))

const FONT_SIZE_800 = {
  fontWeight: "800",
}

const BUTTON_STYLE = {
  height: "50px",
  lineHeight: "50px",
  marginBottom: "10px",
  color: "white",
  fontWeight: "800",
  fontSize: "1rem",
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

const Course = (): any => {
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
    setCourseData(courseData.filter((place) => place.order !== index))
  }

  // heart버튼 클릭시 이벤트
  // const onClickHeart = (event: React.MouseEvent<HTMLDivElement> | null): any => {
  //   const e: any = event?.currentTarget
  // }

  return (
    <>
      {/* 타이틀만들기 */}
      <ImgContainer>
        <img
          src="https://pbs.twimg.com/media/DVT-AesUQAATx65.jpg"
          width="100%"
          height="100%"
          alt="img"
        />
      </ImgContainer>
      <MainContainer>
        <TitleContainer p={2}>
          <Box className="Title" mt={2}>
            <Typography variant="h5" sx={FONT_SIZE_800}>
              {SAMPLE_DATA3.title}
            </Typography>
            {/* {하트버튼 만들기} */}
            <Box className="subTitle">
              <Typography variant="subtitle1" sx={FONT_SIZE_800}>
                {`${SAMPLE_DATA3.author}  |  ${SAMPLE_DATA3.date}`}
              </Typography>
            </Box>
          </Box>
          <Typography fontSize="2.8rem" mt={2} color="secondary">
            <FavoriteIcon fontSize="inherit" />
          </Typography>
        </TitleContainer>
        <MapContainer selectedNumber={isSelected} />
        <KakaoContainer p={1}>
          <Typography mr={1} variant="subtitle1" sx={FONT_SIZE_800}>
            <KakaoShare />
          </Typography>
          <KakaoIcon width="30px" height="30px" />
        </KakaoContainer>
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
        {/* 공유하기 버튼 만들기 클릭시 post 요청으로 코스 등록 => 모임생성 페이지로 감 */}
      </MainContainer>
    </>
  )
}

export default Course
