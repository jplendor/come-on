import React from "react"
import { Route, Routes } from "react-router-dom"
import RequireAuth from "components/auth/RequireAuth"

import CoursePlaceeAdd from "pages/course/CoursePlaceAdd"
import CoursePage from "./CoursePage"
import CourseRegiLayout from "./CourseRegiLayout"

const AuthCoursePage = (): JSX.Element => (
  <RequireAuth>
    <CourseRegiLayout />
  </RequireAuth>
)

const Course = (): JSX.Element => {
  return (
    <Routes>
      <Route index element={<AuthCoursePage />} />
      <Route path="course/register" element={<CoursePlaceeAdd />} />
    </Routes>
  )
}

export default Course
