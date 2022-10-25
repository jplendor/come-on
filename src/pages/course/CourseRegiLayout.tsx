import React, { useEffect } from "react"
import { useLocation } from "react-router-dom"

import { Tab, Box } from "@mui/material"
import { KeyboardArrowLeft, Close } from "@mui/icons-material"
import { TabContext, TabList, TabPanel } from "@mui/lab"

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

const CourseRegiLayout = (): JSX.Element => {
  const [page, setPage] = React.useState(1)

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

  useEffect(() => {
    setPage(pageState)
  }, [pageState])

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={String(page)}>
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
            /
            <Tab
              label={`코스등록(${page}/3)`}
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
        <TabPanel value="1">
          <CourseRegiDetail1 page={1} setPage={setPage} />
        </TabPanel>
        <TabPanel value="2">
          <CourseRegiDetail2 page={2} setPage={setPage} />
        </TabPanel>
        <TabPanel value="3">
          <CourseRegiDetail3 page={3} setPage={setPage} />
        </TabPanel>
      </TabContext>
    </Box>
  )
}

export default CourseRegiLayout
