import React from "react"
import { styled } from "@mui/material/styles"
import {
  Avatar,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material"
import type { AvatarProps, TypographyProps } from "@mui/material"
import { green } from "@mui/material/colors"

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
  }
}

const ProfileInfo = ({
  info: {
    title,
    email,
    img: { src, alt },
  },
}: ProfileInfoProps): JSX.Element => {
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
        <ThemeAvatar src={src} alt={alt} />
      </Grid>
      <InfoTitle>{title}</InfoTitle>
      <InfoBody>{email}</InfoBody>
    </Stack>
  )
}

export default ProfileInfo
