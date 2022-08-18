import React, { useEffect, useState, useCallback } from "react"
import { Box } from "@mui/material"

import { generateComponent } from "../utils"

interface Selection {
  date: string
  idList: string[]
}

interface CalendarProps {
  fromDate: string
  toDate: string
  selectionData: Selection[]
  totalNumberMembers: number
}

interface dateData {
  date: number
  percentage: number
}

interface CalendarData {
  year: number
  month: number
  dateData: dateData[]
}

const toStringYyyymmdd = (dateParam: Date): string => {
  const [yyyy, month, date] = [
    dateParam.getFullYear(),
    dateParam.getMonth(),
    dateParam.getDate(),
  ]
  const mm = month < 9 ? `0${month + 1}` : month + 1
  const dd = date < 10 ? `0${date}` : date
  return `${yyyy}-${mm}-${dd}`
}

const getLastDate = (date: Date): number => {
  const lastDate = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate()
  return lastDate
}

const Calendar = ({
  fromDate,
  toDate,
  selectionData: selectionDataProp,
  totalNumberMembers: totalNumberMembersProp,
}: CalendarProps): JSX.Element => {
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

  const MONTH = {
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
    display: "flex",
    flexWrap: "wrap",
  }

  const DATE = {
    width: 1 / 7,
    height: "80px",
    lineHeight: "80px",
    textAlign: "center",
  }

  const getAllDates = useCallback(
    (fromString: string, toString: string): CalendarData[] => {
      const newAllDates: CalendarData[] = []

      const from = new Date(fromString)
      const to = new Date(toString)

      // 월별 일자 구하기
      const getDates = (year: number, month: number): dateData[] => {
        let newData: dateData[] = []

        const loop = (start: number, end: number, arr: dateData[]): void => {
          for (let i = start; i <= end; i += 1) {
            const filteredSelectionData = selectionDataProp.filter(
              (item) => item.date === toStringYyyymmdd(new Date(year, month, i))
            )
            const selectionCount =
              filteredSelectionData.length === 0
                ? 0
                : filteredSelectionData[0].idList.length

            arr.push({
              date: i,
              percentage: selectionCount / totalNumberMembersProp,
            })
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
        const startDay = new Date(year, month, newData[0].date).getDay()
        newData = [
          ...new Array(startDay).fill({ date: 0, percentage: 0 }),
          ...newData,
        ]

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
          dateData: getDates(i.getFullYear(), i.getMonth()),
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
      {generateComponent(allDates, (data1, key1) => (
        <Box key={key1} sx={MONTH_CONTAINER}>
          <Box sx={MONTH_NUMBER}>{`${data1.month + 1}`}</Box>
          <Box sx={MONTH}>
            {generateComponent(data1.dateData, (data2, key2) => (
              <Box
                sx={{
                  ...DATE,
                  backgroundColor: `rgba(255, 165, 165, ${data2.percentage})`,
                }}
                key={key2}
              >
                {data2.date === 0 ? "" : data2.date}
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default Calendar
