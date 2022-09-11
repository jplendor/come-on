/* eslint-disable react/jsx-props-no-spreading */
import React from "react"
import { styled } from "@mui/material/styles"
import { ImageListItem, ImageListItemBar } from "@mui/material"
import type { ImageListItemProps, ImageListItemBarProps } from "@mui/material"

export const ThemeImageListItem = styled((props: ImageListItemProps) => (
  <ImageListItem {...props} component="article" />
))(() => ({
  "& .MuiImageListItem-img": {
    height: "180px",
    borderRadius: "6px",
  },
}))

export const ThemeImageListItemBar = styled(
  ImageListItemBar
)<ImageListItemBarProps>(({ theme: { grayscale } }) => ({
  "& .MuiImageListItemBar-titleWrap": {
    paddingTop: "8px",
  },
  "&.MuiImageListItemBar-root.MuiImageListItemBar-positionTop": {
    background: "none",
  },
  "& .MuiImageListItemBar-subtitle": {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "19px",
    marginTop: "4px",
    color: grayscale[600],
    "& .MuiSvgIcon-root": {
      width: "13.33px",
      height: "13.33px",
      margin: "1.5px 2px 1.5px 0",
    },
  },
}))
