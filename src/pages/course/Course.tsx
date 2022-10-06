import React from "react"
import { Route, Routes } from "react-router-dom"
import RequireAuth from "components/auth/RequireAuth"

import CoursePlaceeAdd from "pages/course/CoursePlaceAdd"
import CourseRegiLayout from "./CourseRegiLayout"
import CoursePage from "./CoursePage"

const AuthCoursePage = (): JSX.Element => (
  <RequireAuth>
    <CourseRegiLayout />
  </RequireAuth>
)

const Course = (): JSX.Element => {
  return (
    <Routes>
      <Route index element={<AuthCoursePage />} />
      <Route path="/register" element={<CoursePlaceeAdd />} />
      <Route path="/:id" element={<CoursePage />} />
    </Routes>
  )
}

export default Course
