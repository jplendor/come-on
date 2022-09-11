import React from "react"
import { styled } from "@mui/material/styles"
import type { TypographyProps } from "@mui/material"
import { Button, Grid, Typography } from "@mui/material"

const HeaderText = styled(Typography)<TypographyProps>(
  ({
    theme: {
      textStyles: {
        title4: { bold },
      },
      grayscale,
    },
  }) => ({
    userSelect: "none",
    textAlign: "center",
    color: grayscale[900],
    fontSize: bold.fontSize,
    lineHeight: bold.lineHeight,
    fontWeight: bold.fontWeight,
  })
)

const LogoutButtonText = styled(Typography)<TypographyProps>(
  ({
    theme: {
      textStyles: {
        body3: { regular },
      },
      grayscale,
    },
  }) => ({
    userSelect: "none",
    textAlign: "center",
    color: grayscale[500],
    fontSize: regular.fontSize,
    lineHeight: regular.lineHeight,
  })
)

const LogoutButton = ({
  onClickHandler,
}: {
  onClickHandler: () => void
}): JSX.Element => (
  <Button onClick={onClickHandler}>
    <LogoutButtonText>로그아웃</LogoutButtonText>
  </Button>
)

const ProfileHeader = (): JSX.Element => {
  const onClickHandler = (): void => {
    console.log("onClickHandler:로그아웃")
  }
  return (
    <Grid
      item
      container
      component="header"
      alignContent="flex-end"
      alignItems="center"
      sx={{
        pb: "14px",
        mb: "16px",
        height: "65px",
        textAlign: "center",
        borderBottom: "0.5px solid #EEEEEE",
      }}
    >
      <Grid item xs />
      <Grid item xs={7}>
        <HeaderText>마이페이지</HeaderText>
      </Grid>
      <Grid item xs>
        <LogoutButton onClickHandler={onClickHandler} />
      </Grid>
    </Grid>
  )
}

export default ProfileHeader
