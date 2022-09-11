import React from "react"
import { styled } from "@mui/material/styles"
import { Divider, Typography } from "@mui/material"
import type { TypographyProps } from "@mui/material"
import { AccountCircleOutlined, DateRangeOutlined } from "@mui/icons-material"

import { ThemeImageListItemBar } from "./ThemeImageListItem"

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
        title3: { regular },
      },
      grayscale,
    },
  }) => ({
    userSelect: "none",
    textAlign: "left",
    color: grayscale[900],
    fontSize: regular.fontSize,
    lineHeight: regular.lineHeight,
  })
)

const CardTitle = ({ text }: { text: string }): JSX.Element => {
  return <CardTitleText>{text}</CardTitleText>
}

const CardSubTitle = ({ text }: { text: string }): JSX.Element => {
  return (
    <>
      <AccountCircleOutlined />
      <CardSubTitleText>{text}</CardSubTitleText>
    </>
  )
}

const CardSubTime = ({ text }: { text: string }): JSX.Element => {
  return (
    <>
      <DateRangeOutlined />
      <CardSubTitleText>
        <time dateTime={text}>{text}</time>
      </CardSubTitleText>
    </>
  )
}

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
    <ThemeImageListItemBar
      title={<CardTitle text={title} />}
      subtitle={
        <>
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
        </>
      }
      position="below"
    />
  )
}

export default CardTexts
