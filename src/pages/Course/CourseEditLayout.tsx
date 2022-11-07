/* eslint-disable no-nested-ternary */
import React, { useState } from "react"
import { useLocation, useParams, useNavigate } from "react-router-dom"

import { Box, LinearProgress, Typography } from "@mui/material"
import { Close, ArrowBackIosNewOutlined } from "@mui/icons-material"

import { useUpdateCoursePlaceToDBMutation } from "features/course/courseSlice"
import { CourseUpdatePlaceProps, PlaceType } from "types/API/course-service"
import { useSelector } from "react-redux"
import { RootState } from "store"
import CourseEditDetail1 from "./CourseEditDetail1"
import CourseEditDetail2 from "./CourseEditDetail2"
import CourseEditDetail3 from "./CourseEditDetail3"
import SearchPlace from "./SearchPlace"
// MUI

/* Course Layout 
날짜 : 2022-09-17
내용 : 사용자의 코스등록 진행정도에 따라 보여주는 내용을 변경합니다. 
       마지막 단계에서 api 요청과함께 서버로 데이터가 전송됩니다.
작성자 : 강예정
issue : 중간에 코스등록이 취소 될 시 데이터를 기억해서 다시 불러오는 기능을 추가할 수 있을지 고민 */

const NAVBAR_STYLE2 = {
  width: "380px",
  height: "42px",
  margin: "10px 30px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  backgroundColor: "none",
  zIndex: "15",
}
const ICON_STYLE = {
  width: "100%",
  height: "100%",
  textAlign: "center",
  cursor: "pointer",
  zIndex: "15",
}

const NAVBAR = {
  position: "sticky",
  height: "42px",
  margin: "10px 30px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: "100",
}
const MIDTITLE = {
  margin: "0 auto",
  padding: "0",
  display: "flex",
  alignItems: "center",
}

interface PageState {
  state: number
}

const CourseEditLayout = (): JSX.Element => {
  const { id } = useParams<string>()
  const [page, setPage] = useState<number>(1)
  const navigate = useNavigate()
  const [updateCoursePlaceToDB] = useUpdateCoursePlaceToDBMutation()
  const updatePlaces: CourseUpdatePlaceProps = useSelector(
    (state: RootState) => {
      return state.course.updatePlaces
    }
  )
  const handleChange = (
    event: React.SyntheticEvent,
    newValue: number
  ): void => {
    setPage(newValue)
  }

  const { state: pageState } = useLocation() as PageState
  const setUpdateCourse = (): void => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const updateCourse = {
      courseId: Number(id),
      toSave: updatePlaces.toSave,
      toModify: updatePlaces.toModify,
      toDelete: updatePlaces.toDelete,
    }
    // 오류나면 updatePlaces로 바꿀것
    updateCoursePlaceToDB(updateCourse)
  }

  const onClickClose = (): void => {
    navigate("/")
  }
  // const onClickPrev = (): void => {
  //   if (pageState < 0) {
  //     navigate(`/course/${id}/update`, { state: 1 })
  //   }
  //   setUpdateCourse()
  //   navigate(`/course/${id}/update`, { state: pageState - 1 })
  // }

  const onClickPrev = (): void => {
    if (page !== 1) setPage(page - 1)
  }

  return (
    { id } && (
      <Box sx={{ width: "100%", typography: "body1" }}>
        <Box sx={{ borderColor: "divider", width: "100%" }}>
          <Box sx={page !== 4 ? NAVBAR : NAVBAR_STYLE2}>
            <Box sx={{ width: "24px", height: "24px", zIndex: "15" }}>
              <ArrowBackIosNewOutlined sx={ICON_STYLE} onClick={onClickPrev} />
            </Box>
            <Box sx={MIDTITLE}>
              <Typography
                sx={{
                  lineHeight: "135%",
                  fontWeight: "bold",
                  fontSize: "18px",
                  zIndex: "15",
                  color: page !== 4 ? "black" : "white",
                }}
              >
                {page === 1
                  ? "코스수정"
                  : page === 2
                  ? "장소선택"
                  : page === 3
                  ? "장소등록"
                  : "미리보기"}
              </Typography>
            </Box>
            <Box sx={{ width: "24px", height: "24px", zIndex: "15" }}>
              <Close fontSize="medium" sx={ICON_STYLE} onClick={onClickClose} />
            </Box>
          </Box>
          {page !== 4 && (
            <LinearProgress
              sx={{ zIndex: "16" }}
              variant="determinate"
              value={33.3 * page}
            />
          )}
        </Box>
        {page === 1 && (
          <CourseEditDetail1 page={1} setPage={setPage} id={Number(id)} />
        )}
        {page === 2 && (
          <SearchPlace
            mode={PlaceType.c}
            editMode={false}
            id={Number(id)}
            page={2}
            setPage={setPage}
          />
        )}
        {page === 3 && (
          <CourseEditDetail2 page={3} setPage={setPage} id={Number(id)} />
        )}
        {page === 4 && (
          <CourseEditDetail3 page={4} setPage={setPage} id={Number(id)} />
        )}
      </Box>
    )
  )
}

export default CourseEditLayout
