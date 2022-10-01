/* eslint-disable max-len */
import React from "react"
import { Route, Routes } from "react-router-dom"

import Auth from "pages/auth/Auth"
import User from "pages/user/User"
import NeighborhoodCourse from "pages/user/Neighborhood"

// 코스
import Course from "pages/course/Course"
import Meeting from "pages/meeting/Meeting"

const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<NeighborhoodCourse />} />
      <Route path="auth/*" element={<Auth />} />
      <Route path="user/*" element={<User />} />
      <Route path="course/*" element={<Course />} />
      <Route path="meeting/*" element={<Meeting />} />
      <Route path="*" element={<NeighborhoodCourse />} />
    </Routes>
  )
}
export default App
