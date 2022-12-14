import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Grid, Box, Button, Container } from "@mui/material"

import { useTheme } from "@mui/material/styles"
import styled from "@emotion/styled"
import CalendarRangePicker from "components/meeting/CalendarRangePicker "
import { useCreateMeetingMutation } from "features/meeting/meetingSlice"
import ImageInput from "components/common/input/ImageInput"
import TextInput from "components/common/input/TextInput"
import InputWrapper from "components/common/input/InputWrapper"
import Header from "components/meeting/Header"
import { getYyyymmddArray, toStringYyyymmdd } from "utils"

export interface MeetingInfoType {
  [key: string]: string
  title: string
  startDate: string
  endDate: string
}

const MeetingCreate = (): JSX.Element => {
  const [previewImg, setPreviewImg] = useState<null | string>(null)
  const [title, setTitle] = useState<string>("")
  const [startDate, setStartDate] = useState<string>("")
  const [endDate, setEndDate] = useState<string>("")

  const [createMeeting, { isLoading }] = useCreateMeetingMutation()
  const canSubmit =
    [previewImg, startDate, endDate].every(Boolean) && !isLoading

  const theme = useTheme()

  const navigate = useNavigate()

  const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;
    height: 48px;
  `

  const changeFileToObjectUrl = (file: File): void => {
    const fileUrl = URL.createObjectURL(file)
    setPreviewImg(fileUrl)
  }

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      changeFileToObjectUrl(e.target.files[0])
    }
  }

  const checkDateValidation = (
    name: string,
    value: string
  ): [boolean, string] => {
    let isValid = true
    let alertArr: string[] = []

    if (name === "startDate") {
      isValid = !(endDate.length !== 0 && value > endDate)
      alertArr = ["종료일", endDate, "이후"]
    }
    if (name === "endDate") {
      isValid = !(startDate.length !== 0 && value < startDate)
      alertArr = ["시작일", startDate, "이전"]
    }

    return [
      isValid,
      isValid
        ? ""
        : `${alertArr[0]}(${alertArr[1]}) ${alertArr[2]} 날짜는 선택할 수 없습니다.`,
    ]
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    if (["startDate", "endDate"].includes(name)) {
      const [isValid, message] = checkDateValidation(name, value)
      if (!isValid) {
        alert(message)
        return
      }
    }

    if (name === "title") {
      setTitle(value)
    }

    if (name === "startDate") {
      setStartDate(value)
    }

    if (name === "endDate") {
      setEndDate(value)
    }
  }

  const changeObjectUrlToFile = async (): Promise<Blob> => {
    const file = await fetch(previewImg || "").then((r) => r.blob())
    return file
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()

    const data = new FormData(e.currentTarget)
    data.append("startDate", startDate)
    data.append("endDate", endDate)
    const imageFile = await changeObjectUrlToFile()
    data.append("image", imageFile)

    if (canSubmit) {
      try {
        const res = await createMeeting(data).unwrap()

        if (res.code !== "SUCCESS") {
          throw new Error(res.code)
        }

        const meetingId = res.data
        navigate(`/meeting/${meetingId}`)
      } catch (error) {
        // error 처리
      }
    } else {
      let alertMessage = ""
      if (!previewImg) {
        alertMessage = "모임 대표 사진을 추가해보세요."
      }
      if (!startDate || !endDate) {
        alertMessage = "모임 시작 날짜와 종료 날짜를 모두 선택해주세요."
      }
      alert(alertMessage)
    }
  }

  const today = new Date()
  const [y, m, d] = getYyyymmddArray(today)
  const afterOneYear = new Date(y + 1, m, d - 1)

  const content = (
    <>
      <Header text="모임등록" />
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: "20px", mb: "20px" }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ImageInput
              title="사진등록"
              alt="모임대표사진"
              message="사진을 등록해주세요"
              previewImg={previewImg}
              handleChangeImg={handleChangeImg}
            />
          </Grid>
          <Grid item xs={12}>
            <TextInput
              title="모임이름"
              name="title"
              value={title}
              maxLength={10}
              placeholder="모임이름을 입력해주세요!"
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <InputWrapper
              title="모임기간"
              subTitle={
                startDate && endDate ? (
                  <div>{`${startDate.replaceAll("-", ".")}~${endDate.replaceAll(
                    "-",
                    "."
                  )}`}</div>
                ) : (
                  <div>기간 선택</div>
                )
              }
              inputItem={
                <CalendarRangePicker
                  startDate={startDate}
                  endDate={endDate}
                  setStartDate={setStartDate}
                  setEndDate={setEndDate}
                  minDate={toStringYyyymmdd(today)}
                  maxDate={toStringYyyymmdd(afterOneYear)}
                />
              }
            />
          </Grid>
          <Grid item xs={12}>
            <ButtonGroup>
              <Button
                variant="contained"
                sx={{
                  bgcolor: theme.grayscale[300],
                  color: "white",
                  "&:hover": {
                    bgcolor: theme.grayscale[300],
                  },
                  width: "35%",
                }}
                onClick={() => {
                  navigate("/meeting")
                }}
              >
                취소
              </Button>
              <Button
                variant="contained"
                sx={{
                  bgcolor: theme.palette.primary.main,
                  color: "white",
                  "&:hover": {
                    bgcolor: theme.palette.primary.main,
                  },
                  width: "60%",
                }}
                type="submit"
              >
                완료
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Box>
    </>
  )

  return <Container>{content}</Container>
}

export default MeetingCreate
