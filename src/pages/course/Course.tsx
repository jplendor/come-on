import React from "react"
import { Route, Routes } from "react-router-dom"
import RequireAuth from "components/auth/RequireAuth"

import CoursePlaceAdd from "pages/course/CoursePlaceAdd"
import Error404 from "components/common/Error404"
import CourseRegiLayout from "./CourseRegiLayout"
import CoursePage from "./CoursePage"
import CourseUpdate from "./CourseUpdate"

const AuthCoursePage = (): JSX.Element => (
  <RequireAuth>
    <CourseRegiLayout />
  </RequireAuth>
)

const Course = (): JSX.Element => {
  return (
    <Routes>
      <Route index element={<AuthCoursePage />} />
      <Route path="/register" element={<CoursePlaceAdd />} />
      <Route path="/:id/update/*" element={<CourseUpdate />} />
      <Route path="/:id" element={<CoursePage />} />
      <Route path="/*" element={<Error404 />} />
    </Routes>
  )
}

export default Course
