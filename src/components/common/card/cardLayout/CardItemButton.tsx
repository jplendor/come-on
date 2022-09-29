/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState } from "react"

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
  const [like, setLike] = useState(isLike)
  const onClickHandler = () => {
    click(courseId)
    setLike(!like)
  }
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
      {like ? (
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
