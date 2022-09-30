import React from "react"
import { Route, Routes } from "react-router-dom"
import RequireAuth from "components/auth/RequireAuth"
import MeetingListRead from "./MeetingListRead"
import MeetingCreate from "./MeetingCreate"
import MeetingEdit from "./MeetingEdit"

const AuthMeetingListRead = (): JSX.Element => (
  <RequireAuth>
    <MeetingListRead />
  </RequireAuth>
)

const AuthMeetingCreate = (): JSX.Element => (
  <RequireAuth>
    <MeetingCreate />
  </RequireAuth>
)

const AuthMeetingEdit = (): JSX.Element => (
  <RequireAuth>
    <MeetingEdit />
  </RequireAuth>
)

const Meeting = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<AuthMeetingListRead />} />
      <Route path="register" element={<AuthMeetingCreate />} />
      <Route path=":meetingId" element={<AuthMeetingEdit />} />
    </Routes>
  )
}

export default Meeting
