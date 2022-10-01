import React, { useEffect, useState } from "react"
import type {
  Dispatch,
  ChangeEvent,
  KeyboardEvent,
  SetStateAction,
} from "react"
import { styled } from "@mui/material/styles"
import {
  Grid,
  Stack,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material"
import { useModifyNameMutation } from "features/user/userSlice"
import type { TypographyProps, TextFieldProps } from "@mui/material"

import NameEditButton from "./EditNameButton"

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
        title4: { regular },
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

interface ProfileNickname {
  info: {
    nickname: string
    setOpen: Dispatch<SetStateAction<boolean>>
  }
}

const ProfileNickname = ({
  info: { nickname, setOpen },
}: ProfileNickname): JSX.Element => {
  const [modify, { isLoading, isSuccess }] = useModifyNameMutation()
  const [userName, setUserName] = useState(nickname)
  const [isSubmit, setIsSubmit] = useState(false)

  useEffect(() => {
    if (isSuccess) {
      setOpen(true)
      setIsSubmit(false)
    }
  }, [isSuccess, setOpen])

  useEffect(() => {
    if (isSubmit) modify(userName)
  }, [modify, isSubmit, userName])

  const onChangeHandler = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>): void => {
    if (value.length > 20) return
    setUserName(value)
  }

  const onKeyUpHandler = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === "Enter") setIsSubmit(true)
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
              <NameEditButton isLoading={isLoading} setIsSubmit={setIsSubmit} />
            </InputAdornment>
          ),
        }}
        onKeyUp={onKeyUpHandler}
      />
    </Stack>
  )
}

export default ProfileNickname
