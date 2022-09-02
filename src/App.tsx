/* eslint-disable max-len */
import React from "react"
import { Route, Routes } from "react-router-dom"

// Redux 테스트용
import Auth from "pages/auth/Auth"
import DisplayGeolocation from "features/geolocation/DisplayGeo"

// Auth 테스트용
import Temporary from "pages/auth/Temporary"

const App = (): JSX.Element => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Temporary />
            <DisplayGeolocation />
          </>
        }
      />
      <Route path="auth/*" element={<Auth />} />
      {/* <Route path="/course/:id" element={<Course />} />
        <Route path="/course/register" />
        <Route path="/meeting" />
        <Route path="/meeting/register" element={<MeetingCreate />} />
        <Route path="/meeting/:id" />
        <Route path="/meeting/:id/register" />
        <Route path="/my-info" /> */}
    </Routes>
  )
}

export default App
