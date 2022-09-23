/* eslint-disable max-len */
import React from "react"
import { Route, Routes } from "react-router-dom"

import Auth from "pages/auth/Auth"
import User from "pages/user/User"
import MeetingCreate from "pages/meeting/MeetingCreate"
import NeighborhoodCourse from "pages/Course/NeighborhoodCourse"

// 모임
import MeetingCreate from "pages/meeting/MeetingCreate"
import MeetingEdit from "pages/meeting/MeetingEdit"

// 코스
import SearchPlace from "pages/course/SearchPlace"
import Course from "pages/course/Course"
import CourseRegiLayout from "pages/course/CourseRegiLayout"
import CourseRegiDetail2 from "pages/course/CourseRegiDetail2"

const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<NeighborhoodCourse />} />
      <Route path="auth/*" element={<Auth />} />
      <Route path="user/*" element={<User />} />
      <Route path="/course/:id" />
      <Route path="/course/register" element={<SearchPlace />} />
      <Route path="/meeting" />
      <Route path="/meeting/register" element={<MeetingCreate />} />
      {/* <Route path="/meeting/:id" element={<MeetingEdit />} /> */}
      <Route path="*" element={<NeighborhoodCourse />} />
    </Routes>
  )
}

export default App
