import React, { useState } from "react"
import CalendarRangePicker from "../components/CalendarRangePicker "

const CalendarRangePickerTest = (): JSX.Element => {
  const [meetingInfo, setMeetingInfo] = useState({
    startDate: "",
    endDate: "",
    title: "",
  })

  return (
    <CalendarRangePicker
      startDate={meetingInfo.startDate}
      endDate={meetingInfo.endDate}
      setStartDate={(startDate: string) =>
        setMeetingInfo({ ...meetingInfo, startDate })
      }
      setEndDate={(endDate: string) =>
        setMeetingInfo({ ...meetingInfo, endDate })
      }
    />
  )
}

export default CalendarRangePickerTest
