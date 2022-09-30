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
  maxLength?: number
}

const TextInput = ({
  title,
  name,
  value,
  placeholder,
  multiline,
  rows,
  handleChange,
  maxLength,
}: TextInputProps): JSX.Element => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = e.target.value

    if (inputValue.length > (maxLength || 30)) {
      // TODO: 글자수 초과 막기
      console.log("글자수 초과!")
    }

    handleChange(e)
  }

  return (
    <InputWrapper
      title={title}
      subTitle={
        <div>
          {value.length}/{maxLength}
        </div>
      }
      inputItem={
        <TextField
          multiline={multiline}
          fullWidth
          name={name}
          value={value}
          rows={rows}
          placeholder={placeholder}
          onChange={onChange}
        />
      }
    />
  )
}
TextInput.defaultProps = {
  multiline: false,
  rows: 1,
  maxLength: 30,
}
export default TextInput
