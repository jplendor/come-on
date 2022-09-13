import React, { useEffect, useState, useCallback } from "react"
import { Box, Dialog, DialogTitle, Grid, Avatar, Button } from "@mui/material"
import { useTheme } from "@mui/material/styles"

import { generateComponent, toStringYyyymmdd, getYyyymmddArray } from "utils"

interface SelectedDateModalProps {
  open: boolean
  onClose: () => void
  meetingId: number
  meetingDates: Array<any>
  selectedDate: string
  totalMemberNumber: number
}

interface DateInfoType {
  id: number | null
  date: string
  userCount: number
  dateStatus: string | null
  dateUsers: Array<any>
}

const SelectedDateModal = (props: SelectedDateModalProps): JSX.Element => {
  const {
    open,
    onClose,
    meetingId,
    meetingDates,
    selectedDate,
    totalMemberNumber,
  } = props

  const [dateInfo, setDateInfo] = useState<DateInfoType>()

  const DIALOG_TITLE = {
    backgroundColor: "#8E8E8E",
    color: "#FFFFFF",
  }

  const GRID_ITEM = {
    display: "flex",
  }

  const hasDateId = useCallback((): boolean => {
    const filteredMeetingDates = meetingDates.filter(
      (item: any) => item.date === selectedDate
    )

    return filteredMeetingDates.length !== 0
  }, [meetingDates, selectedDate])

  useEffect(() => {
    if (hasDateId()) {
      // 날짜 단건 조회
      // get("/meetings/{meetingId}/dates/{dateId}")
      // 임시 데이터
      setDateInfo({
        id: 10,
        date: "2022-06-30",
        userCount: 2,
        dateStatus: "UNFIXED",
        dateUsers: [
          {
            id: 10,
            nickname: "마라탕마스터",
            imageLink:
              "https://cdn.pixabay.com/photo/2017/11/19/07/30/girl-2961959_960_720.jpg",
            meetingRole: "HOST",
          },
          {
            id: 11,
            nickname: "옥수수수염남",
            imageLink:
              "https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_960_720.jpg",
            meetingRole: "PARTICIPANT",
          },
        ],
      })
    } else {
      setDateInfo({
        id: null,
        date: selectedDate,
        userCount: 0,
        dateStatus: null,
        dateUsers: [],
      })
    }
  }, [selectedDate, hasDateId])

  return (
    <Dialog open={open} onClose={onClose}>
      {dateInfo && (
        <>
          <DialogTitle sx={DIALOG_TITLE}>{dateInfo.date}</DialogTitle>
          <Grid container>
            {dateInfo.userCount === 0
              ? "해당 날짜를 선택한 멤버가 없습니다"
              : generateComponent(dateInfo.dateUsers, (data, key) => (
                  <Grid item key={key} sx={GRID_ITEM} xs={12}>
                    <Avatar alt="프로필 이미지" src={data.imageLink} />
                    <Box>{data.nickname}</Box>
                  </Grid>
                ))}
          </Grid>
          <Box>{`가능 인원 : ${dateInfo.userCount} / ${totalMemberNumber}`}</Box>
        </>
      )}

      <Button variant="contained" onClick={onClose}>
        닫기
      </Button>
    </Dialog>
  )
}

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

const Calendar = ({ meetingInfo }: any): JSX.Element => {
  const { meetingId, startDate, endDate, meetingUsers, meetingDates } =
    meetingInfo
  const totalMemberNumber = meetingUsers.length
  const [allDates, setAllDates] = useState<CalendarData[]>([])
  const [open, setOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState("")
  const [mode, setMode] = useState<Mode>(Mode.View)

  const theme = useTheme()

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

  const handleDateClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!(e.target instanceof HTMLDivElement)) {
      return
    }
    if (!e.target.dataset.date) {
      return
    }

    const targetDate = e.target.dataset.date

    if (mode === Mode.Select) {
      // 날짜 생성
      // post("/meetings/{meetingId}/dates")
    }

    if (mode === Mode.View) {
      setSelectedDate(targetDate)
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
          {generateComponent(
            ["S", "M", "T", "W", "T", "F", "S"],
            (data, key) => (
              <Box key={key} sx={DAYOFTHEWEEK}>
                {data}
              </Box>
            )
          )}
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
                    backgroundColor: `rgba(255, 165, 165, ${monthData.percentage})`,
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
          meetingDates={meetingDates}
          selectedDate={selectedDate}
          totalMemberNumber={totalMemberNumber}
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
