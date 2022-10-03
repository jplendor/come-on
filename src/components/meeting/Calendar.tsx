import React, { useEffect, useState, useCallback } from "react"
import { useTheme } from "@mui/material/styles"
import { Box, Button, Typography } from "@mui/material"
import { generateComponent, toStringYyyymmdd, getYyyymmddArray } from "utils"
import {
  useCreateMeetingDateMutation,
  useDeleteMeetingDateMutation,
} from "features/meeting/meetingSlice"
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
    color: "#8E8E8E",
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
    display: "flex",
    flexWrap: "wrap",
  }

  const DATE = {
    width: 1 / 7,
    height: "50px",
    lineHeight: "50px",
    textAlign: "center",
    mt: "5px",
    mb: "5px",
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
      (item: any) => item.date === targetDate
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

  useEffect(() => {
    setAllDates(getAllDates(startDate, endDate))
  }, [startDate, endDate, getAllDates])

  return (
    <Box>
      <Box sx={CALENDAR}>
        <Box sx={DAYOFTHEWEEK_CONTAINER}>
          {generateComponent(DAYOFWEEK_LIST, (data, key) => (
            <Typography key={key} sx={DAYOFTHEWEEK}>
              {data}
            </Typography>
          ))}
        </Box>
        {generateComponent(allDates, (allData, key1) => (
          <Box key={key1} sx={MONTH_CONTAINER}>
            <Box sx={MONTH_NUMBER}>{`${allData.month + 1}`}</Box>
            <Box sx={MONTH}>
              {generateComponent(allData.dateData, (monthData, key2) => (
                <Box
                  key={key2}
                  sx={{
                    ...DATE,
                    backgroundColor: `rgba(51,127,254, ${monthData.percentage})`,
                  }}
                  data-date={
                    monthData.date === 0
                      ? null
                      : toStringYyyymmdd(
                          new Date(allData.year, allData.month, monthData.date)
                        )
                  }
                  onClick={handleDateClick}
                >
                  {monthData.date === 0 ? "" : monthData.date}
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
      <Button
        type="button"
        variant="contained"
        sx={{
          bgcolor: theme.palette.secondary.main,
          color: "white",
          "&:hover": {
            bgcolor: theme.palette.secondary.main,
          },
        }}
        onClick={toggleMode}
      >
        {mode}
      </Button>
    </Box>
  )
}

export default Calendar
