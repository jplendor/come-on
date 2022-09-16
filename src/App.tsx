/* eslint-disable max-len */
import React from "react"
import { Route, Routes } from "react-router-dom"

// Redux 테스트용
import Auth from "pages/auth/Auth"
import DisplayGeolocation from "features/geolocation/DisplayGeo"

// Auth 테스트용
import User from "pages/user/User"
import Temporary from "pages/auth/Temporary"

// 모임
import MeetingCreate from "pages/meeting/MeetingCreate"
import MeetingEdit from "pages/meeting/MeetingEdit"

// 코스
import SearchPlace from "pages/course/SearchPlace"

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
      <Route path="user/*" element={<User />} />
      <Route path="/course/:id" />
      <Route path="/course/register" element={<SearchPlace />} />
      <Route path="/meeting" />
      <Route path="/meeting/register" element={<MeetingCreate />} />
      <Route path="/meeting/:meetingId" element={<MeetingEdit />} />
      <Route path="/my-info" />
      <Route path="/login" />
    </Routes>
  )
}

export default App
