import React, { useEffect, useState, useCallback } from "react"
import { Box, Dialog, DialogTitle, Grid, Avatar, Button } from "@mui/material"

import { generateComponent } from "../utils"

interface Selection {
  date: string
  idList: string[]
}
interface SelectionDataModalProps {
  open: boolean
  onClose: () => void
  targetDateData: Selection
  totalNumberMembers: number
}

const SelectionDataModal = (props: SelectionDataModalProps): JSX.Element => {
  const { open, onClose, targetDateData, totalNumberMembers } = props

  const DIALOG_TITLE = {
    backgroundColor: "#8E8E8E",
    color: "#FFFFFF",
  }

  const GRID_ITEM = {
    display: "flex",
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={DIALOG_TITLE}>{targetDateData.date}</DialogTitle>
      <Grid container>
        {targetDateData.idList.length === 0
          ? "해당 날짜를 선택한 멤버가 없습니다"
          : generateComponent(targetDateData.idList, (data, key) => (
              <Grid item key={key} sx={GRID_ITEM} xs={12}>
                <Avatar
                  alt="프로필 이미지"
                  src="https://cdn.pixabay.com/photo/2015/03/03/18/58/woman-657753_960_720.jpg"
                />
                <Box>{data}</Box>
              </Grid>
            ))}
      </Grid>
      <Box>{`가능 인원 : ${targetDateData.idList.length} / ${totalNumberMembers}`}</Box>
      <Button variant="contained" onClick={onClose}>
        닫기
      </Button>
    </Dialog>
  )
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
  const [open, setOpen] = useState(false)
  const [targetDateData, setTargetDateData] = useState<Selection>({
    date: "",
    idList: [],
  })

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

  // 모든 날짜 구하기
  const getAllDates = useCallback(
    (fromString: string, toString: string): CalendarData[] => {
      const newAllDates: CalendarData[] = []

      const from = new Date(fromString)
      const [fromY, fromM, fromD] = [
        from.getFullYear(),
        from.getMonth(),
        from.getDate(),
      ]
      const to = new Date(toString)
      const [toY, toM, toD] = [to.getFullYear(), to.getMonth(), to.getDate()]

      // 월별 날짜정보(날짜, 선택율) 구하기
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
        const [iY, iM] = [i.getFullYear(), i.getMonth()]

        newAllDates.push({
          year: iY,
          month: iM,
          dateData: getDates(iY, iM),
        })
      }

      return newAllDates
    },
    []
  )

  const handleDateClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!(e.target instanceof HTMLDivElement)) {
      return
    }
    if (!e.target.dataset.date) {
      return
    }

    const targetDate = e.target.dataset.date
    const filteredSelectionData = selectionDataProp.filter(
      (item) => item.date === targetDate
    )[0]

    setTargetDateData(
      filteredSelectionData === undefined
        ? {
            date: targetDate,
            idList: [],
          }
        : filteredSelectionData
    )
    setOpen(true)
  }

  const handleClose = (): void => {
    setOpen(false)
  }

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
      <SelectionDataModal
        open={open}
        onClose={handleClose}
        targetDateData={targetDateData}
        totalNumberMembers={totalNumberMembersProp}
      />
    </Box>
  )
}

export default Calendar
