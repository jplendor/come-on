import React, { useCallback, useEffect, useState } from "react"
import { Box } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { getYyyymmddArray, toStringYyyymmdd } from "../utils/date"
import { generateComponent } from "../utils/generateComponent"

interface YmInfo {
  y: number
  m: number
}

interface DateInfo {
  y: number
  m: number
  d: number
  selected: string // "start", "end", "between", "no"
}

interface SelectedDateStyle {
  borderRadius: string
  bgcolor: string
}

interface CalendarRangePickerProps {
  startDate: string
  endDate: string
  setStartDate: (value: string) => void
  setEndDate: (value: string) => void
}

const CalendarRangePicker = (props: CalendarRangePickerProps): JSX.Element => {
  const { startDate, endDate, setStartDate, setEndDate } = props

  const [ymInfo, setYmInfo] = useState<YmInfo[]>()
  const [dateInfo, setDateInfo] = useState<DateInfo[]>()

  const theme = useTheme()

  const START = {
    borderRadius: "50% 0 0 50%",
    bgcolor: theme.palette.secondary.main,
  }

  const END = {
    borderRadius: "0 50% 50% 0",
    bgcolor: theme.palette.secondary.main,
  }

  const BETWEEN = {
    borderRadius: "0",
    bgcolor: theme.palette.secondary.main,
  }

  const NO = {
    borderRadius: "0",
    bgcolor: "",
  }

  const CALENDAR = {
    height: "700px",
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

  const handleClcik = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!(e.target instanceof HTMLDivElement)) {
      return
    }
    const { ymd } = e.target.dataset
    if (ymd === "9999-12-31") {
      return
    }

    if (ymd) {
      if (startDate.length === 0 && endDate.length === 0) {
        setStartDate(ymd)
      } else if (startDate.length !== 0 && endDate.length === 0) {
        if (startDate < ymd) {
          setEndDate(ymd)
        } else {
          setStartDate(ymd)
        }
      } else if (startDate.length !== 0 && endDate.length !== 0) {
        setStartDate(ymd)
        setEndDate("")
      }
    }
  }

  const initialize = (): void => {
    const [y, m, d] = getYyyymmddArray(new Date())

    const YmArr = []
    for (
      let i = new Date(y, m, d);
      i <= new Date(y + 1, m, 0);
      i.setMonth(i.getMonth() + 1)
    ) {
      const [iY, iM] = getYyyymmddArray(i)
      YmArr.push({ y: iY, m: iM })
    }
    setYmInfo(YmArr)

    const dateArr = []
    for (
      let i = new Date(y, m, d);
      i <= new Date(y + 1, m, 0);
      i.setDate(i.getDate() + 1)
    ) {
      const [iY, iM, iD] = getYyyymmddArray(i)
      dateArr.push({ y: iY, m: iM, d: iD, selected: "no" })
    }

    setDateInfo(dateArr)
  }

  const changeStyle = useCallback((): void => {
    if (startDate.length === 0 && endDate.length === 0) {
      return
    }

    if (dateInfo) {
      let newDateInfo
      if (startDate.length !== 0 && endDate.length === 0) {
        newDateInfo = dateInfo.map((item) => {
          const itemDate = toStringYyyymmdd(new Date(item.y, item.m, item.d))
          if (startDate === itemDate) {
            return { ...item, selected: "start" }
          }
          return { ...item, selected: "no" }
        })
      } else if (startDate.length !== 0 && endDate.length !== 0) {
        newDateInfo = dateInfo.map((item) => {
          const itemDate = toStringYyyymmdd(new Date(item.y, item.m, item.d))
          if (startDate === itemDate) {
            return { ...item, selected: "start" }
          }
          if (startDate < itemDate && itemDate < endDate) {
            return { ...item, selected: "between" }
          }
          if (itemDate === endDate) {
            return { ...item, selected: "end" }
          }
          return { ...item, selected: "no" }
        })
      }
      setDateInfo(newDateInfo)
    }
  }, [startDate, endDate])

  const getStyle = (selected: string): SelectedDateStyle => {
    if (selected === "start") {
      return START
    }
    if (selected === "end") {
      return END
    }
    if (selected === "between") {
      return BETWEEN
    }
    return NO
  }

  const dateInfoByMonth = (y: number, m: number): DateInfo[] => {
    let currentMonthDateInfo = dateInfo?.filter(
      (item) => item.y === y && item.m === m
    )

    if (currentMonthDateInfo) {
      const startDay = currentMonthDateInfo[0]
      const startIndex = new Date(startDay.y, startDay.m, startDay.d).getDay()

      currentMonthDateInfo = [
        ...new Array(startIndex).fill({ y: 10000, m: 0, d: 0, selected: "no" }),
        ...currentMonthDateInfo,
      ]
    }

    return currentMonthDateInfo || []
  }

  useEffect((): void => {
    initialize()
  }, [])

  useEffect((): void => {
    changeStyle()
  }, [startDate, endDate, changeStyle])

  return (
    <Box sx={CALENDAR}>
      <Box sx={DAYOFTHEWEEK_CONTAINER}>
        {generateComponent(["S", "M", "T", "W", "T", "F", "S"], (data, key) => (
          <Box key={key} sx={DAYOFTHEWEEK}>
            {data}
          </Box>
        ))}
      </Box>
      {ymInfo &&
        generateComponent(ymInfo, (data1, key1) => (
          <Box key={key1} sx={MONTH_CONTAINER}>
            <Box sx={MONTH_NUMBER}>
              {data1.y}년 {data1.m + 1}월
            </Box>
            <Box sx={MONTH}>
              {dateInfo &&
                generateComponent(
                  dateInfoByMonth(data1.y, data1.m),
                  (data2, key2) => (
                    <Box
                      sx={{ ...DATE, ...getStyle(data2.selected) }}
                      key={key2}
                      data-ymd={toStringYyyymmdd(
                        new Date(data2.y, data2.m, data2.d)
                      )}
                      onClick={handleClcik}
                    >
                      {data2.d !== 0 ? data2.d : ""}
                    </Box>
                  )
                )}
            </Box>
          </Box>
        ))}
    </Box>
  )
}

export default CalendarRangePicker
