import React from "react"
import { Route, Routes } from "react-router-dom"
import RequireAuth from "components/auth/RequireAuth"

import MyPage from "./MyPage"
import ManagingMeetings from "./ManagingMeetings"

const AuthMyPage = (): JSX.Element => (
  <RequireAuth>
    <MyPage />
  </RequireAuth>
)

const AuthManagingMeetings = (): JSX.Element => (
  <RequireAuth>
    <ManagingMeetings />
  </RequireAuth>
)

const User = (): JSX.Element => {
  return (
    <Routes>
      <Route index element={<AuthMyPage />} />
      <Route path="my-page" element={<AuthMyPage />} />
      <Route path="my-meetings" element={<AuthManagingMeetings />} />
    </Routes>
  )
}

export default User
