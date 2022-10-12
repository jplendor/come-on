import { styled } from "@mui/material/styles"
import { Button, Typography } from "@mui/material"
import React, { memo, useCallback } from "react"
import { FavoriteRounded, FavoriteBorderRounded } from "@mui/icons-material"

interface LikeButtonProps {
  isLike: boolean
  courseId: number
  likeCount: number
  // eslint-disable-next-line react/require-default-props
  onClickHandler: (courseId: number) => void
}

const ThemeButton = styled(Button)(
  ({
    theme: {
      palette: { primary },
    },
  }) => ({
    gap: "4px",
    width: "45px",
    height: "28px",
    marginTop: "12px",
    marginRight: "14px",
    borderRadius: "999px",
    color: primary.contrastText,
    "& .MuiButton-startIcon": {
      marginRight: 0,
    },
  })
)

const BtnText = styled(Typography)(
  ({
    theme: {
      grayscale,
      textStyles: {
        body1: { regular },
      },
    },
  }) => ({
    fontSize: regular.fontSize,
    lineHeight: regular.lineHeight,

    color: grayscale[50],
  })
)

const ThemeClickedButton = styled(ThemeButton)(
  ({
    theme: {
      palette: { secondary },
    },
  }) => ({
    backgroundColor: secondary.main,
    "&:hover": {
      backgroundColor: secondary.main,
    },
  })
)

const ThemeUnclickedButton = styled(ThemeButton)(() => ({
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
}))

interface likeButtonProps {
  count: number
  onClick: () => void
}

const ClickedButton = ({ count, onClick }: likeButtonProps): JSX.Element => {
  return (
    <ThemeClickedButton
      aria-label="like"
      startIcon={<FavoriteBorderRounded />}
      onClick={onClick}
    >
      <BtnText>{count}</BtnText>
    </ThemeClickedButton>
  )
}

const UnclickedButton = ({ count, onClick }: likeButtonProps): JSX.Element => {
  return (
    <ThemeUnclickedButton
      aria-label="like"
      startIcon={<FavoriteRounded />}
      onClick={onClick}
    >
      <BtnText>{count}</BtnText>
    </ThemeUnclickedButton>
  )
}

const LikeButton = memo(
  ({
    isLike,
    likeCount,
    courseId,
    onClickHandler,
  }: LikeButtonProps): JSX.Element => {
    const onClick = useCallback(() => {
      onClickHandler(courseId)
    }, [courseId, onClickHandler])

    return isLike ? (
      <ClickedButton count={likeCount} onClick={onClick} />
    ) : (
      <UnclickedButton count={likeCount} onClick={onClick} />
    )
  }
)

export default LikeButton
