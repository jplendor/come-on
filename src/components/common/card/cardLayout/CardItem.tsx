/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React, { CSSProperties, memo, useMemo } from "react"
import { styled } from "@mui/material/styles"
import { join, map, pipe, split, toArray } from "@fxts/core"
import type { ImageListItemProps, ImageListItemBarProps } from "@mui/material"
import { Box, ImageList, ImageListItem, ImageListItemBar } from "@mui/material"

import imgT from "assets/course/course2.jpg"
import { MeetingList } from "types/API/meeting-service"
import { CourseList, MyCourses } from "types/API/course-service"

import { useNavigate } from "react-router-dom"
import CardTexts from "./CardTexts"
import { CardLikeButton, CardTopInfo } from "./CardItemTitle"

// 우리동네코스 이미지
export const ThemeImage = styled((props: ImageListItemProps) => (
  <ImageListItem {...props} component="article" />
))(() => ({
  "& .MuiImageListItem-img": {
    height: "200px",
    borderRadius: "6px",
  },
}))

// 모임관리 이미지
export const ThemeImageTwo = styled(ThemeImage)({
  "& .MuiImageListItem-img": {
    height: "auto",
    minHeight: "210px",
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
  info: CourseList | MyCourses | MeetingList
  style: CSSProperties
  onClickHandler: (courseId: number) => void
}

interface CardItem2Props {
  info: CourseList | MyCourses | MeetingList
  style: CSSProperties
}

// 우리동네코스 & 모임관리 공통 레이아웃
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CardItemLayout = ({
  children,
  style,
  onClickCard,
}: {
  children: any
  style?: CSSProperties
  onClickCard: () => void
}): JSX.Element => {
  return (
    <Box style={style} onClick={onClickCard} sx={{ cursor: "pointer" }}>
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
const conversion = (arg0: string): string => pipe(arg0, split("-"), join("."))
const conversionToString = (arg0: string[]): string[] =>
  pipe(map(conversion, arg0), toArray)

export const CardItem = memo(
  ({ info, style, onClickHandler }: CardItemProps): JSX.Element => {
    const {
      writer,
      title,
      courseId,
      imageUrl,
      userLiked,
      likeCount,
      updatedDate,
    } = useMemo(() => info, [info]) as CourseList

    const navigate = useNavigate()

    const handleClickCard = (): void => {
      navigate(`./course/${courseId}`)
    }

    return (
      <CardItemLayout style={style} onClickCard={handleClickCard}>
        <ThemeImage>
          <CardLikeButton
            isLike={userLiked}
            likeCount={likeCount}
            courseId={courseId}
            onClickHandler={onClickHandler}
          />
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
)

/**
 * 모임관리 컴포넌트
 */

export const CardItem2 = memo(
  ({ info, style }: CardItem2Props): JSX.Element => {
    const {
      imageLink,
      title,
      endDate,
      startDate,
      userCount,
      id: codeId,
      meetingCodeId,
      hostNickname,
      meetingStatus,
      myMeetingRole,
    } = useMemo(() => info, [info]) as MeetingList

    const [start, end] = conversionToString([startDate, endDate])

    const navigate = useNavigate()

    const handleClickCard = (): void => {
      navigate(`./${meetingCodeId}`)
    }

    return (
      <CardItemLayout style={style} onClickCard={handleClickCard}>
        <ThemeImageTwo>
          <CardTopInfo
            meetingId={codeId}
            userCount={userCount}
            meetingStatus={meetingStatus}
            meetingCodeId={meetingCodeId}
            myMeetingRole={myMeetingRole}
          />
          <img src={imgT} alt={title} />
          <CardTexts
            texts={{
              title,
              userName: hostNickname,
              time: `${start}~${end}`,
            }}
          />
        </ThemeImageTwo>
      </CardItemLayout>
    )
  }
)
