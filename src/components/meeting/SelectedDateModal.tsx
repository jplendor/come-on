import React from "react"
import {
  Box,
  Dialog,
  Grid,
  Avatar,
  CircularProgress,
  Typography,
  Button,
} from "@mui/material"

import { generateComponent } from "utils"
import {
  useGetMeetingDateQuery,
  useUpdateMeetingDateMutation,
} from "features/meeting/meetingSlice"
import theme from "theme"
import styled from "@emotion/styled"
import { DateStatusType } from "types/API/meeting-service"

interface TargetDateInfo {
  date: string
  dateId: number
}
interface SelectedDateModalProps {
  open: boolean
  onClose: () => void
  meetingId: number
  targetDateInfo: TargetDateInfo
  totalMemberNumber: number
}

const DIALOG_TITLE = {
  height: "60px",
  backgroundColor: theme.grayscale[100],
  color: theme.grayscale[700],
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "bold",
}

const PAPER_PROPS = {
  width: "280px",
  minHeight: "150px",
  borderRadius: "10px",
  display: "flex",
}

const NO_MEMBER = {
  height: "90px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

const GRID_CONTAINER = {
  p: "15px",
}

const GRID_ITEM = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}

const MEMBER_CONTAINER = {
  width: "60%",
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
}

const NICKNAME = {
  overflow: "hidden",
  textOverflow: "ellipsis",
}

const SUMMARY = {
  p: "26px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderTop: `solid 2px ${theme.grayscale[200]}`,
}

const Count = styled.span`
  color: ${theme.palette.primary.main};
`

const DAYOFWEEK_LIST = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

const getDayOfWeek = (date: string): string => {
  const index = new Date(date).getDay()

  return DAYOFWEEK_LIST[index]
}

const SelectedDateModal = (props: SelectedDateModalProps): JSX.Element => {
  const {
    open,
    onClose,
    meetingId,
    targetDateInfo: { date: targetDate, dateId },
    totalMemberNumber,
  } = props

  let content

  const skip = dateId === 0

  const {
    data: response,
    isFetching,
    isSuccess,
  } = useGetMeetingDateQuery(
    { meetingId, dateId },
    { skip, refetchOnMountOrArgChange: true }
  )

  const [updateMeetingDateMutation] = useUpdateMeetingDateMutation()

  const handleClick = async (dateStatus: DateStatusType): Promise<void> => {
    const isFixed = dateStatus === DateStatusType.FIXED

    const res = updateMeetingDateMutation({
      meetingId: Number(meetingId),
      dateId,
      updatedDate: {
        dateStatus: isFixed ? DateStatusType.UNFIXED : DateStatusType.FIXED,
      },
    }).unwrap()
  }

  const makeContent = (
    date: string,
    userCount: number,
    dateUsers: Array<any>,
    dateStatus: DateStatusType
  ): any => {
    return (
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            ...PAPER_PROPS,
            flexDirection: "column",
            justifyContent: "space-between",
          },
        }}
      >
        <Typography sx={{ ...DIALOG_TITLE, ...theme.textStyles.title4 }}>
          {`${date.replaceAll("-", ".")}(${getDayOfWeek(date)})`}
        </Typography>
        {userCount === 0 ? (
          <Box sx={NO_MEMBER}>
            <Typography>가능한 인원이 없습니다</Typography>
          </Box>
        ) : (
          <>
            <Grid container sx={GRID_CONTAINER}>
              <Grid item sx={GRID_ITEM} xs={12}>
                {generateComponent(dateUsers, (data, key) => (
                  <Box key={key} sx={MEMBER_CONTAINER}>
                    <Avatar
                      alt="프로필 이미지"
                      src={data.imageLink}
                      sx={{ mr: "10px" }}
                    />
                    <Typography variant="subtitle1" sx={NICKNAME}>
                      {data.nickname}
                    </Typography>
                  </Box>
                ))}
              </Grid>
            </Grid>
            <Box sx={SUMMARY}>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                sx={{ mb: "16px" }}
              >
                {"가능 인원 : "} <Count> {userCount}</Count>
                {` / ${totalMemberNumber}`}
              </Typography>
              <Button
                variant="contained"
                fullWidth
                sx={{ height: "48px" }}
                onClick={() => {
                  handleClick(dateStatus)
                }}
              >
                {dateStatus === DateStatusType.FIXED
                  ? "모임 날짜 확정 취소하기"
                  : "모임 날짜로 확정하기"}
              </Button>
            </Box>
          </>
        )}
      </Dialog>
    )
  }

  content = makeContent(targetDate, 0, [], DateStatusType.FIXED)

  if (isFetching) {
    content = (
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            ...PAPER_PROPS,
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <CircularProgress />
      </Dialog>
    )
  } else if (isSuccess) {
    const {
      data: { date, userCount, dateUsers, dateStatus },
    } = response
    content = makeContent(date, userCount, dateUsers, dateStatus)
  }

  return <Box>{content}</Box>
}

export default SelectedDateModal
