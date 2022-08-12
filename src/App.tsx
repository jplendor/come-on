/* eslint-disable max-len */
import React from "react"
import { Route, BrowserRouter, Routes } from "react-router-dom"
import { generateComponent } from "./utils"

import MapContainer from "./components/common/MapContainer"
import Navbar from "./components/common/NavBar"
import Guide from "./components/common/Guide"

import ListDetailCard, {
  ListDetailCardProp,
} from "./components/common/ListDetailCard"
import Listitem, { ListItemProp } from "./components/common/Listitem"

import Course from "./pages/Course"
import Layout from "./components/Layout"

const SAMPLE_DATA1: ListItemProp[] = [
  {
    img: {
      src: "https://images.unsplash.com/photo-1527142879-95b61a0b8226?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODN8fHRyYXZlbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      alt: "data-1",
    },
    title: "사진찍기 좋은 부산여행코스",
    subTitleName: "여행마스터",
    subTitleTime: "2022-08-03",
  },
  {
    img: {
      src: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Njh8fHRyYXZlbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      alt: "data-2",
    },
    title: "걷기 좋은 가을 산책길 코스",
    subTitleName: "이영지",
    subTitleTime: "2022-09-17",
  },
  {
    img: {
      src: "https://images.unsplash.com/photo-1553697388-94e804e2f0f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjJ8fHRyYXZlbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      alt: "data-3",
    },
    title: "러시아 추천 코스",
    subTitleName: "우크라이나이겨라",
    subTitleTime: "2022-06-13",
  },
]

const SAMPLE_DATA2: ListDetailCardProp[] = [
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

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      {/* <Guide guideStr="정보를 입력해주세요!" />
      {generateComponent(SAMPLE_DATA1, (item, key) => (
        <Listitem item={item} key={key} />
      ))}
      {generateComponent(SAMPLE_DATA2, (item, key) => (
        <ListDetailCard item={item} key={key} />
      ))} */}
      <Routes>
        <Route path="/" />
        <Route path="/course/:id" element={<Course />} />
        <Route path="/course/register" />
        <Route path="/meeting" />
        <Route path="/meeting/:id" />
        <Route path="/meeting/:id/register" />
        <Route path="/my-info" />
        <Route path="/login" />
      </Routes>
      <Navbar />
    </BrowserRouter>
  )
}

export default App
