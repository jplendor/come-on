/* eslint-disable max-len */
import React from "react"
import { Route, Routes } from "react-router-dom"

import Course from "./pages/Course"

// Redux 테스트용
import DisplayGeolocation from "./features/geolocation/DisplayGeo"
// 2022-08-22
import Login from "./pages/auth/Login"
import LoginRedirect from "./pages/auth/LoginRedirect"

const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<DisplayGeolocation />} />
      <Route path="auth">
        <Route path="login" element={<Login />} />
        <Route path="redirect" element={<LoginRedirect />} />
      </Route>

      {/* <Route path="/course/:id" element={<Course />} />
        <Route path="/course/register" />
        <Route path="/meeting" />
        <Route path="/meeting/:id" />
        <Route path="/meeting/:id/register" />
        <Route path="/my-info" /> */}
    </Routes>
  )
}

export default App
