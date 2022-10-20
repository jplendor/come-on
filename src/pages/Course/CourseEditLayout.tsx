import React, { useState } from "react"
import { useLocation, useParams, useNavigate } from "react-router-dom"

import { Tab, Box } from "@mui/material"
import { KeyboardArrowLeft, Close } from "@mui/icons-material"
import { TabContext, TabList, TabPanel } from "@mui/lab"

import CourseEditDetail1 from "./CourseEditDetail1"
import CourseEditDetail2 from "./CourseEditDetail2"
import CourseEditDetail3 from "./CourseEditDetail3"
// MUI

/* Course Layout 
날짜 : 2022-09-17
내용 : 사용자의 코스등록 진행정도에 따라 보여주는 내용을 변경합니다. 
       마지막 단계에서 api 요청과함께 서버로 데이터가 전송됩니다.
작성자 : 강예정
issue : 중간에 코스등록이 취소 될 시 데이터를 기억해서 다시 불러오는 기능을 추가할 수 있을지 고민 */

const ICONBOXLEFT = {
  zIndex: "10",
  position: "absolute",
  left: "20px",
}

const ICONBOXRIGHT = {
  zIndex: "10",
  position: "absolute",
  right: "20px",
}

const ICON_STYLE = {
  textAlign: "center",
  fontWeight: "bold",
  color: "black",
}

const NAVBAR = {
  height: "42px",
}

const TABARROW = {
  width: "33.3%",
  padding: "0",
  margin: "0 auto",
}

const MIDTITLE = {
  color: "black",
  width: "33.3%",
  fontSize: "18px",
  lineHeight: "135%",
  margin: "0 auto",
  padding: "0",
}

interface PageState {
  state: number
}

const CourseEditLayout = (): JSX.Element => {
  const { id } = useParams<string>()
  const [page, setPage] = useState<number>(1)
  const navigate = useNavigate()

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: number
  ): void => {
    setPage(newValue)
  }

  const { state: pageState } = useLocation() as PageState

  const onClickPrev = (): void => {
    if (pageState < 0) {
      navigate(`/course/${id}/update`, { state: 1 })
    }
    navigate(`/course/${id}/update`, { state: pageState - 1 })
  }

  return (
    { id } && (
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={pageState > 1 ? String(pageState) : String(page)}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="tab Navigation"
              sx={NAVBAR}
            >
              <Tab
                label={
                  <Box>
                    <KeyboardArrowLeft
                      fontSize="small"
                      sx={ICON_STYLE}
                      onClick={onClickPrev}
                    />
                  </Box>
                }
                value="1"
                sx={TABARROW}
              />
              <Tab
                label={`코스등록(${
                  pageState !== null ? String(pageState) : String(page)
                }/3)`}
                value="2"
                sx={MIDTITLE}
                disabled
              />
              <Tab
                label={
                  <Box sx={ICONBOXRIGHT}>
                    <Close fontSize="small" sx={ICON_STYLE} />
                  </Box>
                }
                value="3"
                sx={{ width: "33.3%", padding: "0", margin: "0 auto" }}
                disabled
              />
            </TabList>
          </Box>
          <Box>
            <TabPanel value="1">
              <CourseEditDetail1 id={Number(id)} page={1} setPage={setPage} />
            </TabPanel>
            <TabPanel value="2">
              <CourseEditDetail2 id={Number(id)} page={2} setPage={setPage} />
            </TabPanel>
            <TabPanel value="3">
              <CourseEditDetail3 page={3} setPage={setPage} />
            </TabPanel>
          </Box>
          {/* 
          <CourseNavBar
            page={pageState != null ? pageState : page}
            setPage={setPage}
            id={id!} /> */}
        </TabContext>
      </Box>
    )
  )
}

export default CourseEditLayout
