import React from "react"
import { Box, ImageList } from "@mui/material"

import CardTexts from "./CardTexts"
import CardLikeButton from "./CardLikeButton"
import { ThemeImageListItem } from "./ThemeImageListItem"

interface CardItemProps {
  info: {
    img: {
      src: string
      alt: string
    }
    isLike: boolean
    texts: {
      title: string
      userName: string
      time: string
    }
  }
}

const CardItem = ({
  info: { img, isLike, texts },
}: CardItemProps): JSX.Element => {
  return (
    <Box
      sx={{
        // height: "240px",
        height: "250px",
        maxHeight: "350px",
      }}
    >
      <ImageList cols={1} sx={{ m: 0 }}>
        <ThemeImageListItem>
          <CardLikeButton isLike={isLike} />
          <img src={img.src} alt={img.alt} loading="lazy" />
          <CardTexts texts={texts} />
        </ThemeImageListItem>
      </ImageList>
    </Box>
  )
}

export default CardItem
