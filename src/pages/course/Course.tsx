import React from "react"
import { Route, Routes } from "react-router-dom"
import RequireAuth from "components/auth/RequireAuth"

import CoursePlaceAdd from "pages/course/CoursePlaceAdd"
import CourseRegiLayout from "./CourseRegiLayout"
import CourseEditLayout from "./CourseEditLayout"
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
    </Routes>
  )
}

export default Course
