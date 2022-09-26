/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useCallback } from "react"
import { IconButton } from "@mui/material"
import { FavoriteRounded, FavoriteBorderRounded } from "@mui/icons-material"

import { useClickLikeCourseMutation } from "features/course/courseSlice"
import useAuth from "hooks/auth/useAuth"
import { ThemeImageListItemBar } from "./ThemeImageListItem"

interface CardImgProps {
  isLike: boolean
  courseId: number
}

const CardLikeButton = ({ isLike, courseId }: CardImgProps): JSX.Element => {
  const {
    LoginStatus: { isloggedin },
  } = useAuth()
  const [click] = useClickLikeCourseMutation()
  const onClickHandler = () => click(courseId)
  return (
    <ThemeImageListItemBar
      position="top"
      actionPosition="right"
      actionIcon={
        isloggedin ? (
          <IconButton
            onClick={onClickHandler}
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
        ) : null
      }
    />
  )
}

export default CardLikeButton
