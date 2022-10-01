import React from "react"
import { styled } from "@mui/material/styles"
import { Button, Typography } from "@mui/material"
import type { TypographyProps } from "@mui/material"

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

export default LogoutButton
