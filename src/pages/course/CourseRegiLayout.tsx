import React, { useEffect, useState } from "react"

import { useLocation } from "react-router-dom"

import { TabContext, TabList, TabPanel } from "@mui/lab"
import { Tab, Box, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { RootState } from "store"
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

interface PageState {
  state: number
}

const CourseRegiLayout = (): JSX.Element => {
  const [page, setPage] = React.useState(1)
  const courseList = useSelector((state: RootState) => {
    return state.course
  })

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: number
  ): void => {
    setPage(newValue)
  }
  const { state: pageState } = useLocation() as PageState

  useEffect(() => {
    if (pageState === 200) {
      setPage(2)
    }
  }, [pageState])

  const onClicKPostCourse = (): void => {
    // 해당 api로 코스등록을 두번 보냄
    console.log(courseList)
    // 상세설명 전송

    // 코스리스트 전송
  }

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={String(page)}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="tab Navigation">
            <Tab label="" value="1" sx={{ width: "33.3%" }} disabled />
            <Tab
              label={`코스등록(${page}/3)`}
              value="2"
              sx={{ width: "33.3%" }}
              disabled
            />
            <Tab label="" value="3" sx={{ width: "33.3%" }} disabled />
          </TabList>
        </Box>
        <TabPanel value="1">
          <CourseRegiDetail1 page={1} setPage={setPage} />
        </TabPanel>
        <TabPanel value="2">
          <CourseRegiDetail2 page={2} setPage={setPage} />
        </TabPanel>
        <TabPanel value="3">
          <CourseRegiDetail3 />
        </TabPanel>
      </TabContext>
    </Box>
  )
}

export default CourseRegiLayout
