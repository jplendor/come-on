import React, { useEffect, useState, useCallback, CSSProperties } from "react"
import { Box, FormControlLabel, Typography } from "@mui/material"
import Switch, { SwitchProps } from "@mui/material/Switch"
import { useTheme, styled } from "@mui/material/styles"
import { generateComponent, toStringYyyymmdd, getYyyymmddArray } from "utils"
import {
  useCreateMeetingDateMutation,
  useDeleteMeetingDateMutation,
} from "features/meeting/meetingSlice"
import { MeetingDate } from "types/API/meeting-service"
import SelectedDateModal from "./SelectedDateModal"

interface dateInfo {
  date: number
  percentage: number
}

interface CalendarData {
  year: number
  month: number
  dateData: dateInfo[]
}

const getLastDate = (date: Date): number => {
  const [targetY, targetM] = getYyyymmddArray(date)
  const lastDate = new Date(targetY, targetM + 1, 0).getDate()
  return lastDate
}

enum Mode {
  View = "VIEW",
  Select = "SELECT",
}

const IOSSwitch = styled((props: SwitchProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}))

const DAYOFWEEK_LIST = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

const Calendar = ({ meetingInfo }: any): JSX.Element => {
  const { meetingId, startDate, endDate, meetingUsers, meetingDates } =
    meetingInfo
  const totalMemberNumber = meetingUsers.length
  const [allDates, setAllDates] = useState<CalendarData[]>([])
  const [open, setOpen] = useState(false)
  const [targetDateInfo, setTargetDateInfo] = useState({
    date: "",
    dateId: 0,
  })
  const [mode, setMode] = useState<Mode>(Mode.View)

  const [createMeetingDate] = useCreateMeetingDateMutation()
  const [deleteMeetingDate] = useDeleteMeetingDateMutation()

  const theme = useTheme()

  const CALENDAR = {
    maxHeight: "500px",
    px: "10px",
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
  }

  const DAYOFTHEWEEK = {
    flexGrow: "1",
    textAlign: "center",
    lineHeight: "50px",
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
    height: "45px",
    lineHeight: "45px",
    textAlign: "center",
    mt: "5px",
    mb: "5px",
    p: "10px 5px",
  }

  const MODE_CONTROL = {
    backgroundColor: theme.grayscale[100],
    borderRadius: "inherit",
    mt: "10px",
    p: "10px 10px 10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }

  // 임시 스타일
  const FIXED = {
    border: "solid 3px green",
  }

  const getAllDates = useCallback(
    (fromString: string, toString: string): CalendarData[] => {
      const newAllDates: CalendarData[] = []

      const from = new Date(fromString)
      const [fromY, fromM, fromD] = getYyyymmddArray(from)
      const to = new Date(toString)
      const [toY, toM, toD] = getYyyymmddArray(to)

      const getDateInfoByMonth = (year: number, month: number): dateInfo[] => {
        let newData: dateInfo[] = []

        const loop = (start: number, end: number, arr: dateInfo[]): void => {
          for (let i = start; i <= end; i += 1) {
            const filteredMeetingDates = meetingDates.filter(
              (item: any) =>
                item.date === toStringYyyymmdd(new Date(year, month, i))
            )

            arr.push({
              date: i,
              percentage:
                filteredMeetingDates.length === 0
                  ? 0
                  : filteredMeetingDates[0].userCount / totalMemberNumber,
            })
          }
        }

        if (
          year === fromY &&
          month === fromM &&
          year === toY &&
          month === toM
        ) {
          loop(fromD, toD, newData)
        } else if (year === fromY && month === fromM) {
          loop(fromD, getLastDate(from), newData)
        } else if (year === toY && month === toM) {
          loop(1, toD, newData)
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
        let i = new Date(fromY, fromM, 1);
        i <= to;
        i.setMonth(i.getMonth() + 1)
      ) {
        const [iY, iM] = getYyyymmddArray(i)

        newAllDates.push({
          year: iY,
          month: iM,
          dateData: getDateInfoByMonth(iY, iM),
        })
      }

      return newAllDates
    },
    [meetingDates, totalMemberNumber]
  )

  const handleDateClick = async (
    e: React.MouseEvent<HTMLDivElement>
  ): Promise<void> => {
    if (!(e.target instanceof HTMLDivElement)) {
      return
    }
    if (!e.target.dataset.date) {
      return
    }

    const targetDate = e.target.dataset.date
    const filteredMeetingDates = meetingDates.filter(
      (item: MeetingDate) => item.date === targetDate
    )

    if (mode === Mode.Select) {
      const isSelected =
        filteredMeetingDates.length === 0
          ? false
          : filteredMeetingDates[0].isSelected

      try {
        let res

        if (isSelected) {
          res = await deleteMeetingDate({
            meetingId,
            dateId: filteredMeetingDates[0].id,
          }).unwrap()
        } else {
          res = await createMeetingDate({
            meetingId,
            date: targetDate,
          }).unwrap()
        }

        if (res.code !== "SUCCESS") {
          throw new Error(`error code: ${res.code}`)
        }
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message)
        } else {
          alert(`unexpected error: ${error}`)
        }
      }
    }

    if (mode === Mode.View) {
      const dateId =
        filteredMeetingDates.length === 0 ? 0 : filteredMeetingDates[0].id
      setTargetDateInfo({ date: targetDate, dateId })
      setOpen(true)
    }
  }

  const handleClose = (): void => {
    setOpen(false)
  }

  const toggleMode = (): void => {
    setMode(mode === Mode.View ? Mode.Select : Mode.View)
  }

  const getSunStyle = (dayOfWeek: string): { color: string } => {
    if (dayOfWeek === "SUN") {
      return { color: "red" }
    }
    return { color: theme.grayscale[500] }
  }

  // 날짜 상태(dateStatus)에 따른 style
  const getStyleByStatus = (date: string): CSSProperties => {
    const filteredDate: MeetingDate[] = meetingDates.filter(
      (item: MeetingDate) => item.date === date && item.dateStatus === "FIXED"
    )

    return filteredDate.length === 0 ? {} : FIXED
  }

  useEffect(() => {
    setAllDates(getAllDates(startDate, endDate))
  }, [startDate, endDate, getAllDates])

  return (
    <Box>
      <Box sx={CALENDAR}>
        <Box sx={MODE_CONTROL}>
          <Typography>날짜선택 모드로 변경</Typography>
          <FormControlLabel
            control={<IOSSwitch />}
            label=""
            onChange={toggleMode}
          />
        </Box>
        <Box sx={DAYOFTHEWEEK_CONTAINER}>
          {generateComponent(DAYOFWEEK_LIST, (data, key) => (
            <Typography
              key={key}
              sx={{ ...DAYOFTHEWEEK, ...getSunStyle(data) }}
            >
              {data}
            </Typography>
          ))}
        </Box>
        {generateComponent(allDates, (allData, key1) => (
          <Box key={key1} sx={MONTH_CONTAINER}>
            <Typography>
              {allData.year}년 {allData.month + 1}월
            </Typography>
            <Box sx={MONTH}>
              {generateComponent(allData.dateData, (monthData, key2) => (
                <Box key={key2} sx={DATE}>
                  <Box
                    data-date={
                      monthData.date === 0
                        ? null
                        : toStringYyyymmdd(
                            new Date(
                              allData.year,
                              allData.month,
                              monthData.date
                            )
                          )
                    }
                    onClick={handleDateClick}
                    sx={{
                      backgroundColor: `rgba(51,127,254, ${monthData.percentage})`,
                      cursor: "pointer",
                      ...getStyleByStatus(
                        toStringYyyymmdd(
                          new Date(allData.year, allData.month, monthData.date)
                        )
                      ),
                    }}
                  >
                    {monthData.date === 0 ? "" : monthData.date}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        ))}
        <SelectedDateModal
          open={open}
          onClose={handleClose}
          meetingId={meetingId}
          targetDateInfo={targetDateInfo}
          totalMemberNumber={meetingUsers.length}
        />
      </Box>
    </Box>
  )
}

export default Calendar
