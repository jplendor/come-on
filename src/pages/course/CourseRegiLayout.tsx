/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

import { styled } from "@mui/material/styles"
import { Box, Typography } from "@mui/material"
import { ArrowBackIosNewOutlined, Close } from "@mui/icons-material"

import LinearProgress from "@mui/material/LinearProgress"

import { PlaceType } from "types/API/course-service"
import CourseRegiDetail1 from "pages/course/CourseRegiDetail1"
import CourseRegiDetail2 from "pages/course/CourseRegiDetail2"
import CourseRegiDetail3 from "pages/course/CourseRegiDetail3"
import SearchPlace from "pages/course/SearchPlace"
// MUI

/* Course Layout 
날짜 : 2022-09-17
내용 : 사용자의 코스등록 진행정도에 따라 보여주는 내용을 변경합니다. 
       마지막 단계에서 api 요청과함께 서버로 데이터가 전송됩니다.
작성자 : 강예정
issue : 중간에 코스등록이 취소 될 시 데이터를 기억해서 다시 불러오는 기능을 추가할 수 있을지 고민 */

const ICON_STYLE = {
  width: "100%",
  height: "100%",
  textAlign: "center",
  cursor: "pointer",
  zIndex: "15",
}

const NAVBAR = {
  display: "flex",
  height: "42px",
  zIndex: "100",
  position: "sticky",
  margin: "10px 30px",
  alignItems: "center",
  justifyContent: "center",
}

const NAVBAR_STYLE2 = {
  zIndex: "15",
  width: "380px",
  height: "42px",
  display: "flex",
  color: "white",
  margin: "10px 30px",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "none",
}

const MIDTITLE = {
  padding: "0",
  display: "flex",
  margin: "0 auto",
  alignItems: "center",
}

const MidTitle = styled(Typography)(
  ({
    theme: {
      textStyles: {
        title3: { bold },
      },
    },
  }) => ({
    fontSize: bold.fontSize,
    lineHeight: bold.lineHeight,
    fontWeight: bold.fontWeight,
    zIndex: "15",
  })
)

interface PageState {
  state: number
}

const CourseRegiLayout = (): JSX.Element => {
  const [page, setPage] = useState(0)
  const [courseId, setCourseId] = useState(0)

  const navigate = useNavigate()

  const onClickPrev = (): void => {
    if (page !== 1) setPage(page - 1)
  }

  const { state: pageState } = useLocation() as PageState

  useEffect(() => {
    if (pageState === null) {
      setPage(1)
    } else {
      setPage(pageState)
    }
  }, [pageState])

  const onClickClose = (): void => {
    navigate("/")
  }

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <>
        <Box sx={{ borderColor: "divider", width: "100%" }}>
          <Box sx={page !== 4 ? NAVBAR : NAVBAR_STYLE2}>
            <Box sx={{ width: "24px", height: "24px", zIndex: "15" }}>
              <ArrowBackIosNewOutlined sx={ICON_STYLE} onClick={onClickPrev} />
            </Box>
            <Box sx={MIDTITLE}>
              <MidTitle
                sx={{
                  color: page !== 4 ? "black" : "white",
                }}
              >
                {page === 1
                  ? "코스등록"
                  : page === 2
                  ? "장소선택"
                  : page === 3
                  ? "장소등록"
                  : "미리보기"}
              </MidTitle>
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
          <CourseRegiDetail1
            page={1}
            id={courseId}
            setPage={setPage}
            setCourseId={setCourseId}
          />
        )}
        {page === 2 && (
          <SearchPlace
            mode={PlaceType.c}
            editMode={false}
            id={courseId}
            page={2}
            setPage={setPage}
          />
        )}
        {page === 3 && (
          <CourseRegiDetail2 page={3} setPage={setPage} id={courseId} />
        )}
        {page === 4 && (
          <CourseRegiDetail3 page={4} setPage={setPage} id={courseId} />
        )}
      </>
    </Box>
  )
}

export default CourseRegiLayout
