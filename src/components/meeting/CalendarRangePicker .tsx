import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react"
import { Box, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles"

import { MeetingInfoType } from "pages/meeting/MeetingCreate"
import { generateComponent, getYyyymmddArray, toStringYyyymmdd } from "utils"

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
  bgcolor: string
}

interface CalendarRangePickerProps {
  meetingInfo: MeetingInfoType
  setMeetingInfo: Dispatch<SetStateAction<MeetingInfoType>>
}

const DAYOFWEEK_LIST = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

const CalendarRangePicker = ({
  meetingInfo,
  setMeetingInfo,
}: CalendarRangePickerProps): JSX.Element => {
  const { startDate, endDate } = meetingInfo

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
        setMeetingInfo({ ...meetingInfo, startDate: ymd })
      } else if (startDate.length !== 0 && endDate.length === 0) {
        if (startDate < ymd) {
          setMeetingInfo({ ...meetingInfo, endDate: ymd })
        } else {
          setMeetingInfo({ ...meetingInfo, startDate: ymd })
        }
      } else if (startDate.length !== 0 && endDate.length !== 0) {
        setMeetingInfo({ ...meetingInfo, startDate: ymd, endDate: "" })
      }
    }
  }

  const getSelectedType = useCallback(
    (y: number, m: number, d: number): selectedType => {
      const itemDate = toStringYyyymmdd(new Date(y, m, d))

      if (startDate.length === 0 && endDate.length === 0) {
        return selectedType.n
      }

      if (startDate.length !== 0 && endDate.length === 0) {
        if (startDate === itemDate) {
          return selectedType.s
        }
        return selectedType.n
      }
      if (startDate.length !== 0 && endDate.length !== 0) {
        if (startDate === itemDate) {
          return selectedType.s
        }
        if (startDate < itemDate && itemDate < endDate) {
          return selectedType.b
        }
        if (itemDate === endDate) {
          return selectedType.e
        }
      }
      return selectedType.n
    },
    [startDate, endDate]
  )

  const setOneYearDateInfo = useCallback((): void => {
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
      dateArr.push({
        y: iY,
        m: iM,
        d: iD,
        selected: getSelectedType(iY, iM, iD),
      })
    }

    setDateInfo(dateArr)
  }, [getSelectedType])

  const getStyle = (selected: string): SelectedDateStyle => {
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

  const dateInfoByMonth = (y: number, m: number): DateInfo[] => {
    let currentMonthDateInfo = dateInfo?.filter(
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

  const getSunStyle = (dayOfWeek: string): { color: string } => {
    if (dayOfWeek === "SUN") {
      return { color: "red" }
    }
    return { color: "inherit" }
  }

  useEffect((): void => {
    setOneYearDateInfo()
  }, [setOneYearDateInfo])

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
