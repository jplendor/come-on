import React from "react"
import { TextField } from "@mui/material"
import InputWrapper from "./InputWrapper"

interface TextInputProps {
  title: string
  name: string
  value: string
  placeholder: string
  multiline?: boolean
  rows?: number
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const TextInput = ({
  title,
  name,
  value,
  placeholder,
  multiline,
  rows,
  handleChange,
}: TextInputProps): JSX.Element => {
  return (
    <InputWrapper
      title={title}
      subTitle={<div>임시</div>}
      inputItem={
        <TextField
          multiline
          fullWidth
          name={name}
          value={value}
          rows={rows}
          placeholder={placeholder}
          onChange={handleChange}
        />
      }
    />
  )
}
TextInput.defaultProps = {
  multiline: false,
  rows: 1,
}
export default TextInput
