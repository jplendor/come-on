import React from "react"
import { IconButton } from "@mui/material"
import { FavoriteRounded, FavoriteBorderRounded } from "@mui/icons-material"

import { ThemeImageListItemBar } from "./ThemeImageListItem"

interface CardImgProps {
  isLike: boolean
}

const CardLikeButton = ({ isLike }: CardImgProps): JSX.Element => {
  return (
    <ThemeImageListItemBar
      position="top"
      actionPosition="right"
      actionIcon={
        <IconButton
          aria-label="like"
          sx={{
            width: "24px",
            height: "24px",
            marginTop: "15px",
            marginRight: "14px",
          }}
        >
          {isLike ? (
            <FavoriteRounded color="secondary" />
          ) : (
            <FavoriteBorderRounded sx={{ color: "#FFFFFF" }} />
          )}
        </IconButton>
      }
    />
  )
}

export default CardLikeButton
