/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { styled } from "@mui/material/styles"
import { Tab, Box, Typography } from "@mui/material"
import {
  ArrowBackIosNewOutlined,
  KeyboardArrowLeft,
  Close,
} from "@mui/icons-material"

import { TabContext, TabList, TabPanel } from "@mui/lab"
import LinearProgress from "@mui/material/LinearProgress"

import CourseRegiDetail1 from "./CourseRegiDetail1"
import CourseRegiDetail2 from "./CourseRegiDetail2"
import CourseRegiDetail3 from "./CourseRegiDetail3"
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

const NAVBAR_STYLE2 = {
  position: "fixed",
  top: "20px",
  width: "380px",
  height: "42px",
  margin: "10px 30px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  backgroundColor: "none",
  zIndex: "100",
}

const ImgContainer = styled(Box)(() => ({
  width: "100%",
  height: "200px",
  overflow: "hidden",
  position: "relative",
}))

const MIDTITLE = {
  margin: "0 auto",
  padding: "0",
  display: "flex",
  alignItems: "center",
}

interface PageState {
  state: number
}

const CourseRegiLayout = (): JSX.Element => {
  const [page, setPage] = useState(0)
  const [label, setLabel] = useState("코스선택")
  const [image, setImage] = useState("")
  const onClickPrev = (): void => {
    if (page !== 1) setPage(page - 1)
  }

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: number
  ): void => {
    setPage(newValue)
  }
  const { state: pageState } = useLocation() as PageState
  const [progress, setProgress] = useState(0)
  console.log(page)
  console.log(pageState)
  useEffect(() => {
    console.log("1")
    if (pageState === null) {
      setPage(1)
    } else {
      setPage(pageState)
    }
  }, [pageState])

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <Box sx={{ borderColor: "divider", width: "100%" }}>
        <Box sx={page !== 3 ? NAVBAR : NAVBAR_STYLE2}>
          <Box sx={{ width: "24px", height: "24px" }}>
            <ArrowBackIosNewOutlined sx={ICON_STYLE} onClick={onClickPrev} />
          </Box>
          <Box sx={MIDTITLE}>
            <Typography
              sx={{
                lineHeight: "135%",
                fontWeight: "bold",
                fontSize: "18px",
                color: page !== 3 ? "black" : "white",
              }}
            >
              {page === 1 ? "코스등록" : page === 2 ? "장소선택" : "미리보기"}
            </Typography>
          </Box>
          <Box sx={{ width: "24px", height: "24px" }}>
            <Close fontSize="medium" sx={ICON_STYLE} />
          </Box>

          <LinearProgress variant="determinate" value={33.3 * page} />
        </Box>
      </Box>
      {page === 1 ? (
        <CourseRegiDetail1 page={1} setPage={setPage} />
      ) : page === 2 ? (
        <CourseRegiDetail2 page={2} setPage={setPage} />
      ) : (
        <CourseRegiDetail3 page={3} setPage={setPage} setImage={setImage} />
      )}
    </Box>
  )
}

export default CourseRegiLayout
