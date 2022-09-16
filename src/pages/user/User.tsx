import React from "react"
import { Route, Routes } from "react-router-dom"

import RequireAuth from "components/auth/RequireAuth"

import MyPage from "./MyPage"

const RequireAuthMyPage = (): JSX.Element => (
  <RequireAuth>
    <MyPage />
  </RequireAuth>
)

const User = (): JSX.Element => {
  return (
    <Routes>
      <Route index element={<RequireAuthMyPage />} />
      <Route path="my-page" element={<RequireAuthMyPage />} />
    </Routes>
  )
}

export default User
