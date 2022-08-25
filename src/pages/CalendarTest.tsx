import React from "react"
import Calendar from "../components/Calendar"

const DUMMY_DATA = [
  { date: "2021-11-27", idList: ["A", "B", "C"] },
  { date: "2021-11-29", idList: ["B", "D"] },
  { date: "2021-12-02", idList: ["A", "C"] },
]

const CalendarTest = (): JSX.Element => {
  return (
    <Calendar
      fromDate="2021-11-17"
      toDate="2022-01-06"
      selectionData={DUMMY_DATA}
      totalNumberMembers={4}
    />
  )
}

export default CalendarTest
