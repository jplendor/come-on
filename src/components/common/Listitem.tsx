import React from "react"
import {
  ImageList,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  ImageListItemProps,
  ImageListItemBarProps,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import FavoriteIcon from "@mui/icons-material/Favorite"

export interface ListItemProp {
  img: {
    src: string
    alt: string
  }
  title: string
  subTitleName: string
  subTitleTime: string
}

interface ListItemProps {
  item: ListItemProp
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ThemeImageListItem = styled(ImageListItem)<ImageListItemProps>((_) => ({
  ".MuiImageListItem-img": {
    // TODO: 사진 너비 회의 가져보기
    width: "100%",
    height: "300px",
    objectFit: "cover",
    objectPosition: "bottom",
    boxShadow: " inset 0px -60px 40px rgba(0, 0, 0, 0.5)",
  },
}))

const ThemeImageListItemBar = styled(ImageListItemBar)<ImageListItemBarProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (_) => ({
    ".MuiImageListItemBar-title": {
      pb: "5px",
      color: "white",
      fontSize: "25px",
      lineHeight: "30px",
    },
    ".MuiImageListItemBar-subtitle": {
      pt: "5px",
      fontSize: "12px",
      lineHeight: "15px",
    },
    ".MuiImageListItemBar-actionIcon": {
      padding: "10px",
    },
  })
)

const IMG_TOP = {
  background: "none",
}

const Listitem: React.FC<ListItemProps> = ({
  item: { img, title, subTitleName, subTitleTime },
}) => {
  return (
    <ImageList cols={1}>
      <ThemeImageListItem>
        <ThemeImageListItemBar
          sx={IMG_TOP}
          position="top"
          actionPosition="right"
          actionIcon={
            <IconButton aria-label="lick this" color="secondary" size="large">
              <FavoriteIcon fontSize="large" />
            </IconButton>
          }
        />
        <img src={img.src} loading="lazy" alt={img.alt} />
        <ThemeImageListItemBar
          title={title}
          subtitle={`${subTitleName} | ${subTitleTime}`}
        />
      </ThemeImageListItem>
    </ImageList>
  )
}

export default Listitem
