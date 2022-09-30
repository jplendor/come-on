/* eslint-disable max-len */
import React from "react"
import { Route, Routes } from "react-router-dom"

import Auth from "pages/auth/Auth"
import User from "pages/user/User"
import NeighborhoodCourse from "pages/course/NeighborhoodCourse"

// 코스
import Course from "pages/course/Course"
import SearchPlace from "pages/course/SearchPlace"
import CourseRegiLayout from "pages/course/CourseRegiLayout"
import CourseRegiDetail2 from "pages/course/CourseRegiDetail2"
import Meeting from "pages/meeting/Meeting"
import CoursePlaceeAdd from "pages/course/CoursePlaceAdd"

const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<NeighborhoodCourse />} />
      <Route path="auth/*" element={<Auth />} />
      <Route path="user/*" element={<User />} />
      <Route path="/course" element={<CourseRegiLayout />} />
      <Route path="/course/:id" element={<Course />} />
      <Route path="/course/register" element={<CoursePlaceeAdd />} />
      <Route path="meeting/*" element={<Meeting />} />
      <Route path="*" element={<NeighborhoodCourse />} />
    </Routes>
  )
}

export default App
