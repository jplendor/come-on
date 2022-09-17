import React from "react"
import { styled } from "@mui/material/styles"
import { SvgIconComponent } from "@mui/icons-material"
import type { AvatarProps, TypographyProps } from "@mui/material"
import { Grid, Box, Avatar, BoxProps, Typography } from "@mui/material"

import theme from "theme"

const ICON_SIZE = {
  width: "32px",
  height: "32px",
}

const ThemeAvatar = styled(Avatar)<AvatarProps>(() => ICON_SIZE)

const NavbarText = styled(Typography)<TypographyProps>(
  ({
    theme: {
      grayscale,
      textStyles: {
        caption: { regular },
      },
    },
  }) => ({
    userSelect: "none",
    textAlign: "center",
    color: grayscale[700],
    fontSize: regular.fontSize,
    lineHeight: regular.lineHeight,
  })
)

const NavbarContent = styled(Box)<BoxProps>(() => ({
  padding: 0,
  width: "70px",
  height: "46px",
  cursor: "pointer",
  textAlign: "center",
}))

interface NavbarCommonProps {
  text: string
  index: number
  currentIndex: {
    indexState: number
    onClickHandler: (index: number) => void
  }
}

interface NavbarItemProps extends NavbarCommonProps {
  Icon: SvgIconComponent
}

interface NavbarAvatarProps extends NavbarCommonProps {
  img: {
    src: string
    alt: string
  }
}

const {
  grayscale,
  palette: { primary },
} = theme
const isActiveText = (index: number, indexState: number): object =>
  index === indexState
    ? { color: primary.main, fontWeight: 700 }
    : { color: grayscale[700] }

const isActiveAvatar = (index: number, indexState: number): object =>
  index === indexState ? { filter: "none" } : { filter: "grayscale(1)" }

export const NavbarItem = ({
  Icon,
  text,
  index,
  currentIndex: { indexState, onClickHandler },
}: NavbarItemProps): JSX.Element => (
  <NavbarContent onClick={() => onClickHandler(index)}>
    <Icon
      sx={{
        ...ICON_SIZE,
        ...isActiveText(index, indexState),
      }}
    />
    <NavbarText sx={isActiveText(index, indexState)}>{text}</NavbarText>
  </NavbarContent>
)

export const NavbarAvatar = ({
  text,
  index,
  img: { src, alt },
  currentIndex: { indexState, onClickHandler },
}: NavbarAvatarProps): JSX.Element => (
  <NavbarContent onClick={() => onClickHandler(index)}>
    <Grid container justifyContent="center">
      <ThemeAvatar src={src} alt={alt} sx={isActiveAvatar(index, indexState)} />
    </Grid>
    <NavbarText sx={{ paddingTop: "7px", ...isActiveText(index, indexState) }}>
      {text}
    </NavbarText>
  </NavbarContent>
)
