import React, { ChangeEvent, useState } from "react"
import { styled } from "@mui/material/styles"
import {
  Grid,
  Stack,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material"
import type { TypographyProps, TextFieldProps } from "@mui/material"

import EditIcon from "@mui/icons-material/Edit"
import { useModifyNameMutation } from "features/user/userSlice"

const NicknameTitle = styled(Typography)<TypographyProps>(
  ({
    theme: {
      textStyles: {
        body3: { bold },
      },
      grayscale,
    },
  }) => ({
    userSelect: "none",
    textAlign: "left",
    color: grayscale[900],
    fontSize: bold.fontSize,
    lineHeight: bold.lineHeight,
    fontWeight: bold.fontWeight,
  })
)

const NicknameLength = styled(Typography)<TypographyProps>(
  ({
    theme: {
      textStyles: {
        body3: { regular },
      },
      grayscale,
    },
  }) => ({
    userSelect: "none",
    textAlign: "right",
    color: grayscale[500],
    fontSize: regular.fontSize,
    lineHeight: regular.lineHeight,
  })
)

export const NicknameTextField = styled(TextField)<TextFieldProps>(
  ({
    theme: {
      textStyles: {
        body1: { regular },
      },
      grayscale,
    },
  }) => ({
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: `1px solid ${grayscale[200]}`,
        borderRadius: "4px",
      },
      "&:hover fieldset": {
        border: `1px solid ${grayscale[200]}`,
      },
      "&.Mui-focused fieldset": {
        border: `1px solid ${grayscale[200]}`,
      },
    },
    input: {
      gap: "10px",
      padding: "12px",
      color: grayscale[900],
      fontSize: regular.fontSize,
      lineHeight: regular.lineHeight,
    },
  })
)

const ICON_SIZE = 14

interface ProfileNickname {
  info: {
    nickname: string
  }
}

const EditNameButton = ({ value }: { value: string }): JSX.Element => {
  const [modify, { isLoading }] = useModifyNameMutation()
  return (
    <IconButton disabled={isLoading} onClick={() => modify(value)}>
      {isLoading ? (
        <CircularProgress size={ICON_SIZE} />
      ) : (
        <EditIcon sx={{ fontSize: ICON_SIZE }} />
      )}
    </IconButton>
  )
}

const ProfileNickname = ({
  info: { nickname },
}: ProfileNickname): JSX.Element => {
  const [userName, setUserName] = useState(nickname)

  const onChangeHandler = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>): void => {
    if (value.length > 20) return
    setUserName(value)
  }

  return (
    <Stack
      component="article"
      sx={{
        mt: "16px",
        px: "20px",
      }}
    >
      <Grid container pb={1}>
        <Grid item xs>
          <NicknameTitle>닉네임</NicknameTitle>
        </Grid>
        <Grid item xs={7} />
        <Grid item xs>
          <NicknameLength>{`${userName.length}/20`}</NicknameLength>
        </Grid>
      </Grid>
      <NicknameTextField
        fullWidth
        value={userName}
        onChange={onChangeHandler}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <EditNameButton value={userName} />
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  )
}

export default ProfileNickname
