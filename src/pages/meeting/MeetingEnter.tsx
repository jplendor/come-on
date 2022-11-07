import { Box, Button, Grid, TextField, Typography } from "@mui/material"
import LoginLogo from "assets/nav/LoginLogo"
import AlertComponent from "components/common/alert/Alert"
import { useInviteMeetingUserMutation } from "features/meeting/meetingSlice"
import React, { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import theme from "theme"
import { MeetingError } from "types/API/meeting-service"
import { generateComponent } from "utils"

const CONTAINER = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}

const CODE = {
  width: "auto",
  margin: "5px",
  height: "58px",
}

const MeetingEnter = (): JSX.Element => {
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const [open, setOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")

  const [inviteMeetingUserMutation] = useInviteMeetingUserMutation()

  const navigate = useNavigate()

  const inputRefs = useRef<HTMLInputElement[]>([])
  const [focusIdx, setFocusIdx] = useState(0)

  const handleClickEnter = async (): Promise<void> => {
    const stringCode = code.join("")
    try {
      const res = await inviteMeetingUserMutation({
        inviteCode: stringCode,
      }).unwrap()

      const { meetingId } = res.data
      navigate(`../${meetingId}`)
    } catch (error) {
      const err = error as MeetingError
      const { errorCode } = err.data.data
      switch (errorCode) {
        case 103:
          setAlertMessage("초대코드의 형식이 올바르지 않습니다.")
          break
        case 107:
          setAlertMessage("존재하지 않는 초대코드입니다.")
          break
        case 108:
          setAlertMessage("초대코드의 유효기간이 종료되었습니다.")
          break
        case 109:
          setAlertMessage("이미 참여중인 모임입니다.")
          break
        default:
          setAlertMessage("예측할 수 없는 오류입니다. 관리자에게 문의바랍니다.")
      }
      setOpen(true)
      setCode(["", "", "", "", "", ""])
    }
  }

  const handleChangeCode = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    idx: number
  ): void => {
    let { value } = e.target
    const newCode = [...code]

    const isHangul = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(value)
    value = isHangul ? "" : value.toUpperCase()

    let nextIdx = idx

    if (value.length > 0) {
      const arr = value.split("")
      for (let i = 0; i < arr.length; i += 1) {
        if (idx + i < 6) newCode[idx + i] = arr[i]
      }
      nextIdx = idx + arr.length
    } else {
      newCode[idx] = value
    }

    setCode(newCode)
    setFocusIdx(nextIdx)

    // 한글인 경우 알림창 띄우기
    if (isHangul) {
      setOpen(true)
      setAlertMessage("영문 대문자와 숫자만 입력 가능합니다.")
    }
  }

  interface InputStyle {
    backgroundColor: string
  }

  const getStyle = (idx: number): InputStyle => {
    if (code[idx].length > 0) return { backgroundColor: theme.grayscale[200] }
    return { backgroundColor: "inherit" }
  }

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        padding: "35px",
        ...CONTAINER,
      }}
    >
      <AlertComponent open={open} setOpen={setOpen} message={alertMessage} />
      <Grid container spacing={10}>
        <Grid item xs={12} sx={CONTAINER}>
          <LoginLogo />
        </Grid>
        <Grid item xs={12} sx={CONTAINER}>
          <Typography sx={theme.textStyles.title4}>
            전달받은 코드를 입력해주세요
          </Typography>
          <Box sx={{ display: "flex" }}>
            {generateComponent([0, 1, 2, 3, 4, 5], (idx, key) => (
              <TextField
                key={key}
                sx={{ ...CODE, ...getStyle(idx) }}
                value={code[idx]}
                inputProps={{ style: { textAlign: "center" } }}
                onChange={(e) => {
                  handleChangeCode(e, idx)
                }}
                inputRef={(ref): void => {
                  inputRefs.current[idx] = ref
                  if (ref && focusIdx === idx) ref.focus()
                }}
              />
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} sx={CONTAINER}>
          <Button
            variant="contained"
            sx={{ width: "60%", height: "56px" }}
            onClick={handleClickEnter}
          >
            입장하기
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default MeetingEnter
