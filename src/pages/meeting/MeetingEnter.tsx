import { Box, Button, Grid, TextField, Typography } from "@mui/material"
import LoginLogo from "assets/nav/LoginLogo"
import AlertComponent from "components/common/alert/Alert"
import React, { useState } from "react"
import theme from "theme"
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
  // TODO
  // 4) 한칸 입력하면 다음칸으로 자동으로 넘어가기
  // 6) 입장하기 클릭 => 성공하면 모임 리스트 화면으로 이동
  //                 => 실패하면 코드 다 리셋하고, 없는 모임코드 입니다. 알림창 띄우기
  // 7) 첫번째 칸에 붙여넣기하면, 6칸에 각 자리 코드 입력되게

  const [code, setCode] = useState(["", "", "", "", "", ""])
  const [open, setOpen] = useState(false)

  const handleClickEnter = (): void => {
    const stringCode = code.join("")
    // 유저 생성 api 연결
  }

  const handleChangeCode = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    idx: number
  ): void => {
    let { value } = e.target
    const isHangul = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(value)

    value = isHangul ? "" : value.toUpperCase()

    const newCode = [...code]
    newCode[idx] = value
    setCode(newCode)

    // 한글인 경우 알림창 띄우기
    if (isHangul) setOpen(true)
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
        height: "100%",
        padding: "35px",
        ...CONTAINER,
      }}
    >
      <AlertComponent
        open={open}
        setOpen={setOpen}
        message="영어 대문자와 숫자만 입력 가능합니다."
      />
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
                inputProps={{ maxLength: 1, style: { textAlign: "center" } }}
                onChange={(e) => {
                  handleChangeCode(e, idx)
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
