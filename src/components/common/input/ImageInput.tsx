import React from "react"
import styled from "@emotion/styled"
import { PhotoCamera } from "@mui/icons-material"
import { useTheme } from "@mui/material/styles"
import { IconButton, Typography, Box } from "@mui/material"
import InputWrapper from "./InputWrapper"

interface ImageInputProps {
  title: string
  alt: string

  message: string
  previewImg: string | null
  handleChangeImg: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ImageInput = ({
  title,
  alt,

  message,
  previewImg,
  handleChangeImg,
}: ImageInputProps): JSX.Element => {
  const theme = useTheme()

  const IMG_NULL = {
    height: "180px",
    bgcolor: "#E5E5E5",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "5px",
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

  const ImgWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 180px;
  `

  const PreviewImg = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 5px;
  `

  return (
    <InputWrapper
      title={title}
      subTitle={<div>임시</div>}
      inputItem={
        previewImg ? (
          <ImgWrapper>
            <PreviewImg src={previewImg} alt={alt} />
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
            <Typography
              variant="body1"
              component="h6"
              sx={{ color: "#9E9E9E" }}
            >
              {message}
            </Typography>
          </Box>
        )
      }
    />
  )
}

export default ImageInput
