import React, { useState } from "react"
import CalendarRangePicker from "../components/CalendarRangePicker "

export interface MeetingInfoType {
  startDate: string
  endDate: string
  title: string
}

const CalendarRangePickerTest = (): JSX.Element => {
  const [meetingInfo, setMeetingInfo] = useState({
    startDate: "",
    endDate: "",
    title: "",
  })

  return (
    <CalendarRangePicker
      meetingInfo={meetingInfo}
      setMeetingInfo={setMeetingInfo}
    />
  )
}

export default CalendarRangePickerTest
