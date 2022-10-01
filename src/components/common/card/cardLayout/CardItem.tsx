/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React, { CSSProperties, useMemo } from "react"
import { styled } from "@mui/material/styles"
import { join, pipe, split } from "@fxts/core"
import type { ImageListItemProps, ImageListItemBarProps } from "@mui/material"
import { Box, ImageList, ImageListItem, ImageListItemBar } from "@mui/material"

import { CourseList, MyCourses } from "types/API/course-service"
import { CardLikeButton, CardTopInfo } from "./CardItemTitle"
import CardTexts from "./CardTexts"

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
  info: CourseList | MyCourses
  style: CSSProperties
}

// 우리동네코스 & 모임관리 공통 레이아웃
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CardItemLayout = ({
  children,
  style,
}: {
  children: any
  style?: CSSProperties
}): JSX.Element => {
  return (
    <Box style={style}>
      <ImageList cols={1} sx={{ m: 0 }}>
        {children}
      </ImageList>
    </Box>
  )
}

/**
 * 우리동네코스 & 내가공유한코스 & 좋아요한코스
 */

// 곧 사용할 예정
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const conversionToString = (arg0: string): string =>
  pipe(arg0, split("-"), join("."))

// 인피니티 스크롤 전용 리스트 컴포넌트 (작업중)
export const CardItem = ({ info, style }: CardItemProps): JSX.Element => {
  const { courseId, userLiked, writer, title, imageUrl, updatedDate } = useMemo(
    () => info,
    [info]
  ) as CourseList
  return (
    <CardItemLayout style={style}>
      <ThemeImage>
        <CardLikeButton isLike={userLiked} courseId={courseId} />
        <img src={imageUrl} alt={title} />
        <CardTexts
          texts={{
            title,
            userName: writer.nickname,
            time: updatedDate,
          }}
        />
      </ThemeImage>
    </CardItemLayout>
  )
}

/**
 * 모임관리 컴포넌트
 */

export const CardItem2 = ({ info }: any): JSX.Element => {
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
