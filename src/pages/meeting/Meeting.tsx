import React from "react"
import { Route, Routes } from "react-router-dom"
import RequireAuth from "components/auth/RequireAuth"
import ManagingMeetings from "pages/user/Meeting"
import MeetingCreate from "./MeetingCreate"
import MeetingEdit from "./MeetingEdit"
import MeetingPlaceAdd from "./MeetingPlaceAdd"

const AuthMeetingListRead = (): JSX.Element => (
  <RequireAuth>
    <ManagingMeetings />
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

const AuthMeetingPlaceAdd = (): JSX.Element => (
  <RequireAuth>
    <MeetingPlaceAdd />
  </RequireAuth>
)

const Meeting = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<AuthMeetingListRead />} />
      <Route path="register" element={<AuthMeetingCreate />} />
      <Route path=":meetingId" element={<AuthMeetingEdit />} />
      <Route path=":meetingId/place" element={<AuthMeetingPlaceAdd />} />
    </Routes>
  )
}

export default Meeting
