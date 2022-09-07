import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Grid,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
} from "@mui/material"
import { PhotoCamera } from "@mui/icons-material"
import { useTheme } from "@mui/material/styles"
import styled from "@emotion/styled"
import * as Api from "../../api"

interface MeetingInfo {
  [key: string]: string
  title: string
  startDate: string
  endDate: string
}

const MeetingCreate = (): JSX.Element => {
  const [previewImg, setPreviewImg] = useState({ src: "", name: "" })
  const [meetingInfo, setMeetingInfo] = useState<MeetingInfo>({
    title: "",
    startDate: "",
    endDate: "",
  })

  const theme = useTheme()

  const navigate = useNavigate()

  const IMG_NULL = {
    height: "300px",
    bgcolor: "#D9D9D9",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }

  const CAMERA_ICON = {
    cursor: "pointer",
    color: "white",
    bgcolor: theme.palette.secondary.main,
    mb: "10px",
    "&:hover": {
      bgcolor: theme.palette.secondary.main,
    },
  }

  const IMG_NOT_NULL = {
    position: "absolute",
    right: "20px",
    top: "20px",
  }

  const Form = {
    p: "30px",
  }

  const ImgWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 300px;
  `

  const PreviewImg = styled.img`
    width: 100%;
    height: 100%;
  `

  const InputLabel = styled.label`
    display: block;
    font-size: 1.5rem;
    font-weight: bold;
  `

  const InputSubLabel = styled.label`
    display: block;
    font-size: 1.2rem;
    font-weight: bold;
  `

  const ButtonGroup = styled.div`
    display: flex;
    justify-content: center;
  `

  const changeFileToObjectUrl = (file: File): void => {
    const fileUrl = URL.createObjectURL(file)
    setPreviewImg({ name: file.name, src: fileUrl })
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
      isValid = !(
        meetingInfo.endDate.length !== 0 && value > meetingInfo.endDate
      )
      alertArr = ["종료일", "endDate", "이후"]
    }
    if (name === "endDate") {
      isValid = !(
        meetingInfo.startDate.length !== 0 && value < meetingInfo.startDate
      )
      alertArr = ["시작일", "startDate", "이전"]
    }

    return [
      isValid,
      isValid
        ? ""
        : `${alertArr[0]}(${meetingInfo[alertArr[1]]}) ${
            alertArr[2]
          } 날짜는 선택할 수 없습니다.`,
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

    const newMeetingInfo = { ...meetingInfo, [name]: value }
    setMeetingInfo(newMeetingInfo)
  }

  const changeObjectUrlToFile = async (): Promise<Blob> => {
    const file = await fetch(previewImg.src).then((r) => r.blob())
    return file
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<any> => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const imageFile = await changeObjectUrlToFile()
    data.append("image", imageFile)

    try {
      const res = await Api.post("/meetings", data, true)

      if (res.data.code !== "SUCCESS") {
        throw new Error(`error code: ${res.code}`)
      }

      const meetingId = res.data.data
      navigate(`/meetings/${meetingId}`)
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      } else {
        alert(`unexpected error: ${error}`)
      }
    }
  }

  return (
    <>
      {previewImg.src ? (
        <ImgWrapper>
          <PreviewImg src={previewImg.src} alt="모임 대표 사진" />
          <IconButton
            aria-label="upload picture"
            component="label"
            sx={{ ...CAMERA_ICON, ...IMG_NOT_NULL }}
          >
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handleChangeImg}
            />
            <PhotoCamera />
          </IconButton>
        </ImgWrapper>
      ) : (
        <Box sx={IMG_NULL}>
          <IconButton
            aria-label="upload picture"
            component="label"
            sx={CAMERA_ICON}
          >
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handleChangeImg}
            />
            <PhotoCamera />
          </IconButton>
          <Typography variant="h6" component="h6">
            모임 대표 사진 추가
          </Typography>
        </Box>
      )}
      <Box component="form" onSubmit={handleSubmit} sx={Form}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <InputLabel>모임 이름</InputLabel>
            <TextField
              fullWidth
              required
              variant="standard"
              name="title"
              value={meetingInfo.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel>모임 날짜</InputLabel>
            <InputSubLabel>시작일</InputSubLabel>
            <TextField
              required
              variant="standard"
              type="date"
              name="startDate"
              value={meetingInfo.startDate}
              onChange={handleChange}
            />
            <InputSubLabel>종료일</InputSubLabel>
            <TextField
              required
              variant="standard"
              type="date"
              name="endDate"
              value={meetingInfo.endDate}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <ButtonGroup>
              <Button
                variant="contained"
                sx={{
                  bgcolor: theme.palette.error.main,
                  color: "white",
                  "&:hover": {
                    bgcolor: theme.palette.error.main,
                  },
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
                  bgcolor: theme.palette.secondary.main,
                  color: "white",
                  "&:hover": {
                    bgcolor: theme.palette.secondary.main,
                  },
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
}

export default MeetingCreate
