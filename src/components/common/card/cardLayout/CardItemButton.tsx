/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from "react"

import theme from "theme"
import { IconButton } from "@mui/material"
import { useClickLikeCourseMutation } from "features/course/courseSlice"
import { FavoriteRounded, FavoriteBorderRounded } from "@mui/icons-material"

interface LikeButtonProps {
  isLike: boolean
  courseId: number
}

const LikeButton = ({ isLike, courseId }: LikeButtonProps): JSX.Element => {
  const [click] = useClickLikeCourseMutation()
  const onClickHandler = () => click(courseId)
  return (
    <IconButton
      aria-label="like"
      onClick={onClickHandler}
      sx={{
        width: "24px",
        height: "24px",
        marginTop: "12px",
        marginRight: "14px",
      }}
    >
      {isLike ? (
        <FavoriteRounded color="secondary" />
      ) : (
        <FavoriteBorderRounded
          sx={{ color: theme.palette.primary.contrastText }}
        />
      )}
    </IconButton>
  )
}

export default LikeButton
