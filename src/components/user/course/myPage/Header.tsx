import React from "react"
import { styled } from "@mui/material/styles"
import { Grid, Typography } from "@mui/material"
import type { TypographyProps } from "@mui/material"

import useAuth from "hooks/auth/useAuth"
import LogoutButton from "./LogoutButton"

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

const Header = (): JSX.Element => {
  const { loggedOutDispatch } = useAuth()
  return (
    <>
      <Grid item xs />
      <Grid item xs={7}>
        <HeaderText>마이페이지</HeaderText>
      </Grid>
      <Grid item xs>
        <LogoutButton onClickHandler={loggedOutDispatch} />
      </Grid>
    </>
  )
}

export default Header
