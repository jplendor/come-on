import React from "react"
import { TextField } from "@mui/material"
import InputWrapper from "./InputWrapper"

interface TextInputProps {
  title: string
  name: string
  value: string
  placeholder: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const TextInput = ({
  title,
  name,
  value,
  placeholder,
  handleChange,
}: TextInputProps): JSX.Element => {
  return (
    <InputWrapper
      title={title}
      subTitle={<div>임시</div>}
      inputItem={
        <TextField
          fullWidth
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
        />
      }
    />
  )
}

export default TextInput
