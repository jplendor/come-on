import React, { styled } from "@mui/material/styles"
import { Typography, TypographyProps, Box, Grid, Stack } from "@mui/material"

import LoginLogo from "assets/nav/LoginLogo"

interface SocialLoginProps {
  children: JSX.Element
}

const ThemeText = styled(Typography)<TypographyProps>(
  ({ theme: { grayscale } }) => ({
    userSelect: "none",
    color: grayscale[900],
  })
)

const LoginTitle = styled(ThemeText)<TypographyProps>(
  ({
    theme: {
      textStyles: {
        title2: { bold },
      },
    },
  }) => ({
    fontSize: bold.fontSize,
    lineHeight: bold.lineHeight,
    fontWeight: bold.fontWeight,
  })
)

export const LoginBody = styled(ThemeText)<TypographyProps>(
  ({
    theme: {
      grayscale,
      textStyles: {
        body1: { regular },
      },
    },
  }) => ({
    color: grayscale[700],
    fontSize: regular.fontSize,
    lineHeight: regular.lineHeight,
  })
)

const SocialLogin = ({ children }: SocialLoginProps): JSX.Element => {
  return (
    <Grid
      container
      component="main"
      flexWrap="nowrap"
      direction="column"
      sx={{ height: "600px" }}
    >
      <Grid item xs={10} container justifyContent="center" alignItems="center">
        <LoginLogo />
      </Grid>
      <Grid item xs={2} component="section">
        <Box
          sx={{
            px: "20px",
          }}
        >
          <Stack
            mb="28px"
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
          >
            <LoginTitle>로그인</LoginTitle>
            <LoginBody mt={1}>아이디와 비밀번호 입력하기 귀찮으시죠?</LoginBody>
            <LoginBody>카카오로 1초만에 로그인하세요.</LoginBody>
          </Stack>
          {children}
        </Box>
      </Grid>
    </Grid>
  )
}

export default SocialLogin
