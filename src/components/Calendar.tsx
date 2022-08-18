import React, { useEffect, useState, useCallback } from "react"
import { Box } from "@mui/material"

import { generateComponent } from "../utils"

const Month = ({ dates }: { dates: number[] }): JSX.Element => {
  const MONTH = {
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
  }

  const DATE = {
    width: 1 / 7,
    height: "80px",
    lineHeight: "80px",
    display: "inline-block",
    textAlign: "center",
  }

  return (
    <Box sx={MONTH}>
      {generateComponent(dates, (data, key) => (
        <Box sx={DATE} key={key}>
          {data}
        </Box>
      ))}
    </Box>
  )
}

interface CalendarProps {
  fromDate: string
  toDate: string
}
interface CalendarData {
  year: number
  month: number
  date: number[]
}

const Calendar = ({ fromDate, toDate }: CalendarProps): JSX.Element => {
  const [allDates, setAllDates] = useState<CalendarData[]>([])

  const CALENDAR = {
    height: "500px",
    px: "10px",
    overflow: "auto",
    backgroundColor: "#ffffff",
  }

  const DAYOFTHEWEEK_CONTAINER = {
    backgroundColor: "#ffffff",
    width: "100%",
    height: "50px",
    position: "sticky",
    top: "0px",
    display: "flex",
  }

  const DAYOFTHEWEEK = {
    flexGrow: "1",
    textAlign: "center",
    lineHeight: "50px",
    color: "#8E8E8E",
    fontWeight: "bold",
  }

  const MONTH_CONTAINER = {
    my: "30px",
  }

  const MONTH_NUMBER = {
    height: "30px",
    m: "10px",
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "bold",
  }

  const getLastDate = (date: Date): number => {
    const lastDate = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate()
    return lastDate
  }

  const getAllDates = useCallback(
    (fromString: string, toString: string): CalendarData[] => {
      const newAllDates: CalendarData[] = []

      const from = new Date(fromString)
      const to = new Date(toString)

      // 월별 일자 구하기
      const getDates = (year: number, month: number): number[] => {
        let newData: number[] = []

        const loop = (start: number, end: number, arr: number[]): void => {
          for (let i = start; i <= end; i += 1) {
            arr.push(i)
          }
        }

        if (month === from.getMonth() && month === to.getMonth()) {
          loop(from.getDate(), to.getDate(), newData)
        } else if (month === from.getMonth()) {
          loop(from.getDate(), getLastDate(from), newData)
        } else if (month === to.getMonth()) {
          loop(1, to.getDate(), newData)
        } else {
          loop(1, getLastDate(new Date(year, month)), newData)
        }

        // 첫 날 요일만큼 빈 데이터 넣기
        const startDay = new Date(year, month, newData[0]).getDay()
        newData = [...new Array(startDay).fill(""), ...newData]

        return newData
      }

      for (
        let i = new Date(from.getFullYear(), from.getMonth(), 1);
        i <= to;
        i.setMonth(i.getMonth() + 1)
      ) {
        newAllDates.push({
          year: i.getFullYear(),
          month: i.getMonth(),
          date: getDates(i.getFullYear(), i.getMonth()),
        })
      }

      return newAllDates
    },
    []
  )

  useEffect(() => {
    setAllDates(getAllDates(fromDate, toDate))
  }, [fromDate, toDate, getAllDates])

  return (
    <Box sx={CALENDAR}>
      <Box sx={DAYOFTHEWEEK_CONTAINER}>
        {generateComponent(["S", "M", "T", "W", "T", "F", "S"], (data, key) => (
          <Box key={key} sx={DAYOFTHEWEEK}>
            {data}
          </Box>
        ))}
      </Box>
      {generateComponent(allDates, (data, key) => (
        <Box key={key} sx={MONTH_CONTAINER}>
          <Box sx={MONTH_NUMBER}>{`${data.month + 1}`}</Box>
          <Month dates={data.date} />
        </Box>
      ))}
    </Box>
  )
}

export default Calendar
