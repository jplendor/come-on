import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { Box, Typography } from "@mui/material"

import { AccountCircleOutlined, Favorite, DateRange } from "@mui/icons-material"

import { styled } from "@mui/material/styles"
import MapContainer from "components/common/MapContainer"
import KakaoShare from "components/KakaoShare"
import { generateComponent } from "utils"
import KakaoIcon from "assets/nav/KakaoIcon"
import { RootState } from "store"
import { useSelector } from "react-redux"

import { useGetCourseDetailQuery } from "features/course/courseSlice"
import DisplayListDetailCard from "components/common/card/DisplayListDetailCard"

const TitleContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}))

const MainContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}))

const ImgContainer = styled(Box)(() => ({
  margin: "0",
  padding: "0",
  width: "100%",
  height: "30%",
  objectFit: "cover",
}))

const KakaoContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "right",
  alignItems: "center",
}))

const FONT_TITLE = {
  fontSize: "22px",
  lineHeight: "125%",
  fontWeight: "bold",
}

const FONT_SUBTITLE = {
  fontSize: "13px",
  lineHeight: "145%",
  color: "#9E9E9E",
}

const ICON_BOX = {
  lineHegiht: "145%",
  margin: "0 auto",
  display: "flex",
  flexWrap: "nowrap",
  justifyContent: "flex-start",
  alignItems: "center",
}

const ICON_STYLE = {
  width: "16px",
  height: "16px",
}

const SUBTITLE = {
  lineHegiht: "145%",
  margin: "10px 0",
  display: "flex",
  flexWrap: "nowrap",
  justifyContent: "flex-start",
}

const TITLE = {
  width: "100%",
  display: "flex",
  marginTop: "10px",
  justifyContent: "space-between",
}

const FAVORITE_BOX = {
  width: "24px",
  height: "24px",
  margin: "auto 10px",
}

const DES_STYLE = {
  height: "80px",
  fontSize: "14px",
  lineHeight: "140%",
  color: "#616161",
}
interface CoursePlaceState {
  order: number
  name: string
  description: string
  lng: number // 경도 x
  lat: number // 위도 y
  apiId: number
  category: string
  id: number
}

const Course = (): any => {
  const [isSelected, setSelected] = useState("")
  const [imgSrc, setImgSrc] = useState<string>("")
  const { id } = useParams<string>()
  const placeList = useSelector((state: RootState) => {
    return state.course.coursePlaces
  })

  const onClickFocus = (event: React.MouseEvent<HTMLDivElement>): any => {
    const e = event?.currentTarget

    if (e) {
      setSelected(e.id)
    } else setSelected("")
  }

  const { data: resultCourseDetail, isSuccess } = useGetCourseDetailQuery({
    id,
  })

  const [courseData, setCourseData] = useState<CoursePlaceState[]>()
  const onRemove = (index: number): void => {
    setCourseData(courseData?.filter((place) => place.order !== index))
    console.log(courseData)
  }

  const LoadImg = (): void => {
    console.log(id)
    console.log(resultCourseDetail?.data.coursePlaces)
  }

  // heart버튼 클릭시 이벤트
  // const onClickHeart = (event: React.MouseEvent<HTMLDivElement> | null): any => {
  //   const e: any = event?.currentTarget
  // }

  useEffect(() => {
    if (isSuccess) {
      LoadImg()
      setImgSrc(resultCourseDetail.data.imageUrl)
      setCourseData(resultCourseDetail.data.coursePlaces)
      console.log(resultCourseDetail.data.coursePlaces)
    }
  }, [isSuccess])

  return (
    <>
      {/* 타이틀만들기 */}
      <ImgContainer>
        <img src={imgSrc} width="100%" height="100%" alt="img" />
      </ImgContainer>
      <MainContainer style={{ margin: "auto 20px" }}>
        <TitleContainer>
          <Box className="Title" sx={TITLE}>
            <Typography variant="h5" sx={FONT_TITLE}>
              {resultCourseDetail?.data.title}
            </Typography>
            <Favorite color="secondary" sx={FAVORITE_BOX} />
          </Box>
          <Box className="subTitle" sx={SUBTITLE}>
            <Typography variant="subtitle1" sx={FONT_SUBTITLE}>
              <Box sx={ICON_BOX}>
                <AccountCircleOutlined sx={ICON_STYLE} />
                {resultCourseDetail?.data.writer.nickname}
                <Typography
                  variant="subtitle1"
                  sx={FONT_SUBTITLE}
                  style={{ margin: "auto 5px" }}
                >
                  |
                </Typography>
                <DateRange sx={ICON_STYLE} />
                {resultCourseDetail?.data.updatedDate}
              </Box>
            </Typography>
          </Box>
        </TitleContainer>
        <Box sx={DES_STYLE}>{resultCourseDetail?.data.description}</Box>
        <MapContainer selectedNumber={isSelected} />
        <KakaoContainer p={1}>
          <Typography mr={1} variant="subtitle1" sx={FONT_SUBTITLE}>
            <KakaoShare />
          </Typography>
          <KakaoIcon width="30px" height="30px" />
        </KakaoContainer>
        {/* 카카오톡 공유하기 */}
        {/* 버튼만들기 */}
        {courseData !== null &&
          courseData !== undefined &&
          generateComponent(courseData, (item, key) => (
            <DisplayListDetailCard
              item={item}
              key={key}
              onClick={onClickFocus}
              isSelected={isSelected}
              onRemove={onRemove}
              maxLan={courseData.length}
            />
          ))}
        {/* 공유하기 버튼 만들기 클릭시 post 요청으로 코스 등록 => 모임생성 페이지로 감 */}
      </MainContainer>
    </>
  )
}

export default Course
