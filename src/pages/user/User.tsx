import React from "react"
import { Route, Routes } from "react-router-dom"
import RequireAuth from "components/auth/RequireAuth"

import MyPage from "./MyPage"
import ManagingMeetings from "./Meeting"

const AuthMyPage = (): JSX.Element => (
  <RequireAuth>
    <MyPage />
  </RequireAuth>
)

const User = (): JSX.Element => {
  return (
    <Routes>
      <Route index element={<AuthMyPage />} />
      <Route path="my-page" element={<AuthMyPage />} />
      <Route path="my-meetings" element={<ManagingMeetings />} />
    </Routes>
  )
}

export default User
