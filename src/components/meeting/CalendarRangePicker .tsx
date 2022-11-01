import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react"
import { Box, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles"

import {
  generateComponent,
  getYyyymmddArray,
  isSameDate,
  toStringYyyymmdd,
} from "utils"

interface YmInfo {
  y: number
  m: number
}

enum selectedType {
  s = "start",
  e = "end",
  b = "between",
  n = "no",
}

interface DateInfo {
  y: number
  m: number
  d: number
  selected: selectedType
}

interface SelectedDateStyle {
  borderRadius: string
}

interface CalendarRangePickerProps {
  startDate: string
  endDate: string
  setStartDate: Dispatch<SetStateAction<string>>
  setEndDate: Dispatch<SetStateAction<string>>
  minDate: string
  maxDate: string
}

const DAYOFWEEK_LIST = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

const CalendarRangePicker = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  minDate,
  maxDate,
}: CalendarRangePickerProps): JSX.Element => {
  const [ymInfo, setYmInfo] = useState<YmInfo[]>()
  const [rangeDate, setRangeDate] = useState<DateInfo[]>()

  const theme = useTheme()

  const DEFAULT = {
    height: "90%",
    width: "100%",
    bgcolor: theme.primary[50],
  }

  const START = {
    borderRadius: "50% 0 0 50%",
  }

  const END = {
    borderRadius: "0 50% 50% 0",
  }

  const BETWEEN = {
    borderRadius: "0",
  }

  const NO = {
    borderRadius: "0",
    bgcolor: "inherit",
  }

  const CALENDAR = {
    height: "300px",
    px: "15px",
    overflow: "auto",
    backgroundColor: "#ffffff",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
    borderRadius: "10px",
  }

  const DAYOFTHEWEEK_CONTAINER = {
    backgroundColor: "#ffffff",
    width: "100%",
    height: "50px",
    position: "sticky",
    top: "0px",
    display: "flex",
    color: "gray",
    py: "5px",
  }

  const DAYOFTHEWEEK = {
    flexGrow: "1",
    textAlign: "center",
    lineHeight: "50px",
    color: "#8E8E8E",
  }

  const MONTH_CONTAINER = {
    my: "30px",
  }

  const MONTH = {
    display: "flex",
    flexWrap: "wrap",
  }

  const DATE = {
    width: 1 / 7,
    height: "60px",
    lineHeight: "60px",
    textAlign: "center",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
  }

  const getSunStyle = (dayOfWeek: string): { color: string } => {
    if (dayOfWeek === "SUN") {
      return { color: "red" }
    }
    return { color: "inherit" }
  }

  // 날짜 클릭 시, startDate, EndDate값 update
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

  // 선택 기간 표시 스타일
  const getStyle = (dateInfo: DateInfo): SelectedDateStyle => {
    const { selected } = dateInfo

    if (selected === selectedType.s) {
      return START
    }
    if (selected === selectedType.e) {
      return END
    }
    if (selected === selectedType.b) {
      return BETWEEN
    }
    return NO
  }

  interface DateStyle {
    color: string
    bgcolor: string
    borderRadius: string
  }

  // startDate, EndDate 표시 스타일
  const getStyle2 = (dateInfo: DateInfo): DateStyle => {
    const { y, m, d } = dateInfo

    if (
      isSameDate(new Date(startDate), new Date(y, m, d)) ||
      isSameDate(new Date(endDate), new Date(y, m, d))
    ) {
      return {
        color: "white",
        bgcolor: theme.palette.primary.main,
        borderRadius: "50%",
      }
    }
    return { color: "inherit", bgcolor: "inherit", borderRadius: "inherit" }
  }

  const dateInfoByMonth = (y: number, m: number): DateInfo[] => {
    let currentMonthDateInfo = rangeDate?.filter(
      (item) => item.y === y && item.m === m
    )

    if (currentMonthDateInfo) {
      const startDay = currentMonthDateInfo[0]
      const startIndex = new Date(startDay.y, startDay.m, startDay.d).getDay()

      currentMonthDateInfo = [
        ...new Array(startIndex).fill({
          y: 10000,
          m: 0,
          d: 0,
          selected: selectedType.n,
        }),
        ...currentMonthDateInfo,
      ]
    }

    return currentMonthDateInfo || []
  }

  const getSelectedType = useCallback(
    (y: number, m: number, d: number): selectedType => {
      const target = new Date(y, m, d)
      const targetDate = toStringYyyymmdd(target)
      const isStart =
        isSameDate(target, new Date(y, m, 1)) || target.getDay() === 0
      const isEnd =
        isSameDate(target, new Date(y, m + 1, 0)) || target.getDay() === 6

      // 1) startDate, endDate가 모두 있지는 않은 경우
      if (endDate.length === 0) {
        return selectedType.n
      }

      // 2) startDate, endDate가 모두 있는 경우
      if (startDate.length !== 0 && endDate.length !== 0) {
        if (startDate === targetDate) {
          return selectedType.s
        }
        if (targetDate === endDate) {
          return selectedType.e
        }
        if (startDate < targetDate && targetDate < endDate) {
          if (isStart) {
            return selectedType.s
          }
          if (isEnd) {
            return selectedType.e
          }
          return selectedType.b
        }
      }
      return selectedType.n
    },
    [startDate, endDate]
  )

  // 기간에 해당하는 날짜 정보 생성
  const makeRangeDate = useCallback((): void => {
    const [ey, em, ed] = getYyyymmddArray(new Date(maxDate))

    const YmArr = []
    for (
      let i = new Date(minDate);
      i <= new Date(ey, em, ed);
      i.setMonth(i.getMonth() + 1)
    ) {
      const [iY, iM] = getYyyymmddArray(i)
      YmArr.push({ y: iY, m: iM })
    }
    setYmInfo(YmArr)

    const dateArr = []
    for (
      let i = new Date(minDate);
      i <= new Date(maxDate);
      i.setDate(i.getDate() + 1)
    ) {
      const [iY, iM, iD] = getYyyymmddArray(i)
      dateArr.push({
        y: iY,
        m: iM,
        d: iD,
        selected: getSelectedType(iY, iM, iD),
      })
    }

    setRangeDate(dateArr)
  }, [minDate, maxDate, getSelectedType])

  useEffect((): void => {
    makeRangeDate()
  }, [makeRangeDate])

  return (
    <Box sx={CALENDAR}>
      <Box sx={DAYOFTHEWEEK_CONTAINER}>
        {generateComponent(DAYOFWEEK_LIST, (data, key) => (
          <Typography key={key} sx={{ ...DAYOFTHEWEEK, ...getSunStyle(data) }}>
            {data}
          </Typography>
        ))}
      </Box>
      {ymInfo &&
        generateComponent(ymInfo, (data1, key1) => (
          <Box key={key1} sx={MONTH_CONTAINER}>
            <Typography>
              {data1.y}년 {data1.m + 1}월
            </Typography>
            <Box sx={MONTH}>
              {rangeDate &&
                generateComponent(
                  dateInfoByMonth(data1.y, data1.m),
                  (data2, key2) => (
                    <Box sx={DATE} key={key2}>
                      <Box sx={{ ...DEFAULT, ...getStyle(data2) }}>
                        <Box
                          onClick={handleClcik}
                          data-ymd={toStringYyyymmdd(
                            new Date(data2.y, data2.m, data2.d)
                          )}
                          sx={{ height: "100%", ...getStyle2(data2) }}
                        >
                          {data2.d !== 0 ? data2.d : ""}
                        </Box>
                      </Box>
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
