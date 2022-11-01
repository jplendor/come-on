import React, { memo } from "react"
import { styled } from "@mui/material/styles"
import type { TypographyProps } from "@mui/material"
import { Grid, Paper, Stack, Typography } from "@mui/material"
import { CheckCircle, GroupsOutlined } from "@mui/icons-material"

const CardTitleText = styled(Typography)<TypographyProps>(
  ({
    theme: {
      textStyles: {
        body3: { bold },
      },
      palette: { primary },
    },
  }) => ({
    userSelect: "none",
    textAlign: "center",
    color: primary.contrastText,
    fontSize: bold.fontSize,
    lineHeight: bold.lineHeight,
    fontWeight: bold.fontWeight,
  })
)
const CardTitleText2 = styled(CardTitleText)(({ theme: { grayscale } }) => ({
  color: grayscale[500],
}))

const ItemOne = styled(Paper)(({ theme }) => ({
  padding: "3px 6px",
  gap: "2px",
  height: "24px",
  borderRadius: "2px",
  backgroundColor: theme.palette.primary.main,
}))
const ItemTwo = styled(ItemOne)(({ theme: { grayscale } }) => ({
  backgroundColor: grayscale[100],
}))

/**
 * 인원수 표시 컴포넌트
 */

const NumberOfPeople = ({ userCount }: { userCount: number }): JSX.Element => {
  return (
    <ItemOne>
      <Grid container alignItems="center">
        <GroupsOutlined
          sx={{
            marginRight: "2px",
            fontSize: "16px",
            color: "#FFFFFF",
          }}
        />
        <CardTitleText>{`${userCount}명`}</CardTitleText>
      </Grid>
    </ItemOne>
  )
}

/**
 * 확정 표시 컴포넌트
 */

const Decided = (): JSX.Element => {
  return (
    <ItemOne>
      <Grid container alignItems="center">
        <CheckCircle
          sx={{
            marginRight: "2px",
            fontSize: "16px",
            color: "#FFFFFF",
          }}
        />
        <CardTitleText>확정</CardTitleText>
      </Grid>
    </ItemOne>
  )
}

/**
 * 미확정 표시 컴포넌트
 */

const Undecided = (): JSX.Element => {
  return (
    <ItemTwo>
      <Grid container alignItems="center">
        <CardTitleText2>미확정</CardTitleText2>
      </Grid>
    </ItemTwo>
  )
}

/**
 * 모임관리 카드에서 인원수와 모임 결정 여부를 알려주는 컴포넌트.
 */

interface TopInfoProps {
  userCount: number
  meetingStatus: "UNFIXED" | "PROCEEDING" | "END"
}
const TopInfo = memo(
  ({ userCount, meetingStatus }: TopInfoProps): JSX.Element => {
    return (
      <Stack direction="row" spacing="6px">
        <NumberOfPeople userCount={userCount} />
        {meetingStatus === "END" ? <Decided /> : <Undecided />}
      </Stack>
    )
  }
)

export default TopInfo
