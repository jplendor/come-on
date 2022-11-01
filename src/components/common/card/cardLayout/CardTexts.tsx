import React from "react"
import { styled } from "@mui/material/styles"
import type { TypographyProps } from "@mui/material"
import { Divider, Grid, Typography } from "@mui/material"
import { AccountCircleOutlined, DateRangeOutlined } from "@mui/icons-material"

import { ThemeItemBar } from "./CardItem"

const CardSubTitleText = styled(Typography)<TypographyProps>(
  ({
    theme: {
      textStyles: {
        body2: { bold },
      },
      grayscale,
    },
  }) => ({
    userSelect: "none",
    color: grayscale[600],
    fontSize: bold.fontSize,
    lineHeight: bold.lineHeight,
    fontWeight: bold.fontWeight,
  })
)

const CardTitleText = styled(Typography)<TypographyProps>(
  ({
    theme: {
      textStyles: {
        title3: { bold },
      },
      grayscale,
    },
  }) => ({
    userSelect: "none",
    textAlign: "left",
    color: grayscale[900],
    fontSize: bold.fontSize,
    lineHeight: bold.lineHeight,
    fontWeight: bold.fontWeight,
  })
)

const CardTitle = ({ text }: { text: string }): JSX.Element => (
  <CardTitleText>{text}</CardTitleText>
)

const CardSubTitle = ({ text }: { text: string }): JSX.Element => (
  <>
    <AccountCircleOutlined />
    <CardSubTitleText>{text}</CardSubTitleText>
  </>
)

const CardSubTime = ({ text }: { text: string }): JSX.Element => (
  <>
    <DateRangeOutlined />
    <CardSubTitleText>
      <time dateTime={text}>{text}</time>
    </CardSubTitleText>
  </>
)

export interface TextsProps {
  title: string
  userName: string
  time: string
}

interface CardTextsProps {
  texts: TextsProps
}

const CardTexts = ({
  texts: { title, userName, time },
}: CardTextsProps): JSX.Element => {
  return (
    <ThemeItemBar
      title={<CardTitle text={title} />}
      subtitle={
        <Grid container>
          <CardSubTitle text={userName} />
          <Divider
            orientation="vertical"
            sx={{
              my: "3.5px",
              mx: "4px",
              height: "12px",
              color: "#E0E0E0",
            }}
          />
          <CardSubTime text={time} />
        </Grid>
      }
      position="below"
    />
  )
}

export default CardTexts
