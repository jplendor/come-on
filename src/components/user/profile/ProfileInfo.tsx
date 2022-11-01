import React, { ChangeEvent, Dispatch, SetStateAction, useEffect } from "react"
import { styled } from "@mui/material/styles"
import {
  Box,
  Grid,
  Badge,
  Stack,
  Avatar,
  IconButton,
  Typography,
  CircularProgress,
} from "@mui/material"
import PhotoCamera from "@mui/icons-material/PhotoCamera"
import type { AvatarProps, TypographyProps } from "@mui/material"

import theme from "theme"
import { createImgFormData } from "utils"
import { useProfileUploadMutation } from "features/user/userSlice"

const { grayscale: gs } = theme

const ThemeAvatar = styled(Avatar)<AvatarProps>(() => ({
  // 3.500em -> 56px
  width: "3.500em",
  height: "3.500em",
}))

const InfoTitle = styled(Typography)<TypographyProps>(
  ({
    theme: {
      textStyles: {
        title3: { bold },
      },
      grayscale,
    },
  }) => ({
    paddingTop: "8px",

    userSelect: "none",
    color: grayscale[900],
    fontSize: bold.fontSize,
    lineHeight: bold.lineHeight,
    fontWeight: bold.fontWeight,
  })
)

const InfoBody = styled(Typography)<TypographyProps>(
  ({
    theme: {
      textStyles: {
        body1: { regular },
      },
      grayscale,
    },
  }) => ({
    userSelect: "none",
    color: grayscale[500],
    fontSize: regular.fontSize,
    lineHeight: regular.lineHeight,
  })
)

interface ProfileInfoProps {
  info: {
    img: {
      src: string
      alt: string
    }
    title: string
    email: string
    setOpen: Dispatch<SetStateAction<boolean>>
  }
}

const ProfileInfo = ({
  info: {
    title,
    email,
    setOpen,
    img: { src, alt },
  },
}: ProfileInfoProps): JSX.Element => {
  const [upload, { isLoading, isSuccess }] = useProfileUploadMutation()
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const imgFormData = createImgFormData(e)
    if (!imgFormData) return
    upload(imgFormData)
  }
  useEffect(() => {
    if (isSuccess) setOpen(true)
  }, [isSuccess, setOpen])
  return (
    <Stack
      component="article"
      alignItems="center"
      justifyContent="center"
      sx={{
        height: "125px",
      }}
    >
      <Grid justifyContent="center">
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <Box sx={{ backgroundColor: gs[100], borderRadius: 100 }}>
              <IconButton
                size="small"
                color="primary"
                component="label"
                aria-label="upload picture"
              >
                <input
                  hidden
                  multiple
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                />
                {isLoading ? (
                  <CircularProgress size={16} />
                ) : (
                  <PhotoCamera sx={{ color: gs[500], fontSize: 16 }} />
                )}
              </IconButton>
            </Box>
          }
        >
          <ThemeAvatar src={src} alt={alt} />
        </Badge>
      </Grid>
      <InfoTitle>{title}</InfoTitle>
      <InfoBody>{email}</InfoBody>
    </Stack>
  )
}

export default ProfileInfo
