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
    
        <Route path="/course/:id" />
        <Route path="/course/register" element={<SearchPlace />} />
        <Route path="/meeting" />
        <Route path="/meeting/:id" />
        <Route path="/meeting/:id/register" />
        <Route path="/my-info" />
        <Route path="/login" />
      </Routes>
      <Navbar />
    </BrowserRouter>
  )
}

export default App
