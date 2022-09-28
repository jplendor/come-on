/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from "react"
import { styled } from "@mui/material/styles"
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material"
import type { ImageListItemProps, ImageListItemBarProps } from "@mui/material"

import CardTexts from "./CardTexts"
import { CardLikeButton, CardTopInfo } from "./CardItemTitle"

// 우리동네코스 이미지
export const ThemeImage = styled((props: ImageListItemProps) => (
  <ImageListItem {...props} component="article" />
))(() => ({
  "& .MuiImageListItem-img": {
    // height: "180px",
    height: "190px",
    borderRadius: "6px",
  },
}))

// 모임관리 이미지
export const ThemeImageTwo = styled(ThemeImage)({
  "& .MuiImageListItem-img": {
    height: "auto",
    minHeight: "200px",
    maxHeight: "210px",
    borderRadius: "8px",
  },
})

export const ThemeItemBar = styled(ImageListItemBar)<ImageListItemBarProps>(
  ({ theme: { grayscale } }) => ({
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
  })
)

interface CardItemProps {
  info: {
    img: {
      src: string
      alt: string
    }
    isLike: boolean
    courseId: number
    texts: {
      title: string
      userName: string
      time: string
    }
  }
}

// 우리동네코스&모임관리 공통 레이아웃
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CardItemLayout = ({ children }: { children: any }): JSX.Element => {
  return (
    <ImageList cols={1} sx={{ m: 0 }}>
      {children}
    </ImageList>
  )
}

/**
 * 우리동네코스 컴포넌트
 */

export const CardItem = ({ info }: CardItemProps): JSX.Element => {
  const { img, isLike, texts, courseId } = useMemo(() => info, [info])
  return (
    <CardItemLayout>
      <ThemeImage>
        <CardLikeButton isLike={isLike} courseId={courseId} />
        <img src={img.src} alt={img.alt} />
        <CardTexts texts={texts} />
      </ThemeImage>
    </CardItemLayout>
  )
}

/**
 * 모임관리 컴포넌트
 */

export const CardItem2 = ({ info }: CardItemProps): JSX.Element => {
  const { img, texts } = useMemo(() => info, [info])
  return (
    <CardItemLayout>
      <ThemeImageTwo>
        <CardTopInfo />
        <img src={img.src} alt={img.alt} />
        <CardTexts texts={texts} />
      </ThemeImageTwo>
    </CardItemLayout>
  )
}
