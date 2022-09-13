/* eslint-disable max-len */
import React from "react"
import { Route, Routes } from "react-router-dom"

// Redux 테스트용
import Auth from "pages/auth/Auth"
import DisplayGeolocation from "features/geolocation/DisplayGeo"

// Auth 테스트용
import User from "pages/user/User"
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
      <Route path="user/*" element={<User />} />
    </Routes>
  )
}

export default App
