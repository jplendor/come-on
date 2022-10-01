import React from "react"
import { TextField } from "@mui/material"
import { styled } from "@mui/material/styles"
import type { TextFieldProps } from "@mui/material"

/**
 * 모임관리 검색필드 & 우리동네코스 검색필드 공용 컴포넌트
 */

const SerchTextField = styled(TextField)<TextFieldProps>(
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
      },
      "&:hover fieldset": {
        border: `1px solid ${grayscale[200]}`,
      },
      "&.Mui-focused fieldset": {
        border: `1px solid ${grayscale[200]}`,
      },
    },
    "& ::placeholder": {
      color: grayscale[500],
    },
    width: "100%",
    borderRadius: "4px",
    backgroundColor: grayscale[100],
    input: {
      gap: "2px",
      padding: "10px 8px",
      fontSize: regular.fontSize,
      lineHeight: regular.lineHeight,
    },
  })
)

export default SerchTextField
