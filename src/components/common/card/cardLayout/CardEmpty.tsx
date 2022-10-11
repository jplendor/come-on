import React from "react"
import { styled } from "@mui/material/styles"
import { Button, Grid, Stack, Typography } from "@mui/material"
import type { ButtonProps, TypographyProps } from "@mui/material"

import LoginLogo from "assets/nav/LoginLogo"
import { LoginBody } from "components/login/SocialLogin"

// Link to course  registration
const EmptyCardBtn = styled(Button)<ButtonProps>(
  ({
    theme: {
      palette: { primary },
    },
  }) => ({
    backgroundColor: primary.main,
    "&:hover": {
      backgroundColor: primary.main,
    },
    gap: "10px",
    width: "192px",
    height: "56px",
    borderRadius: "4px",
    padding: "17px 26px",
  })
)

const EmptyCardBtnText = styled(Typography)<TypographyProps>(
  ({
    theme: {
      textStyles: {
        title4: { bold },
      },
      palette: {
        primary: { contrastText },
      },
    },
  }) => ({
    fontSize: bold.fontSize,
    lineHeight: bold.lineHeight,
    fontWeight: bold.fontWeight,
    color: contrastText,
  })
)

const EmptyCard = ({ height }: { height: number }): JSX.Element => {
  const mt = height > 300 ? "130px" : "7px"
  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Stack mb="28px" mt={mt} direction="column" alignItems="center">
        <LoginLogo />
        <EmptyCardBtn
          sx={{
            mt: "48px",
          }}
        >
          <EmptyCardBtnText>코스 등록하러 가기</EmptyCardBtnText>
        </EmptyCardBtn>
        <LoginBody mt={1}>
          등록된 코스가 없습니다. 코스를 등록해주세요!
        </LoginBody>
      </Stack>
    </Grid>
  )
}

export default EmptyCard
