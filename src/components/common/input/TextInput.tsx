import React from "react"
import { TextField } from "@mui/material"
import InputWrapper from "./InputWrapper"

interface TextInputProps {
  title: string
  name: string
  value: string
  placeholder?: string
  multiline?: boolean
  rows?: number
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  maxLength?: number
  defaultVal?: string
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
  defaultVal,
}: TextInputProps): JSX.Element => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = e.target.value

    if (inputValue.length > (maxLength || 30)) {
      // TODO: 글자수 초과 막기
      console.log("글자수 초과!")
    }

    handleChange(e)
  }

  const item =
    defaultVal !== "" ? (
      <TextField
        multiline={multiline}
        sx={{ width: "100%" }}
        name={name}
        rows={rows}
        defaultValue={defaultVal}
        onChange={onChange}
      />
    ) : (
      <TextField
        multiline={multiline}
        sx={{ width: "100%" }}
        name={name}
        value={value}
        rows={rows}
        placeholder={placeholder}
        onChange={onChange}
      />
    )

  return (
    <InputWrapper
      title={title}
      subTitle={
        <div>
          {value.length}/{maxLength}
        </div>
      }
      inputItem={item}
    />
  )
}
TextInput.defaultProps = {
  multiline: false,
  rows: 1,
  placeholder: "",
  maxLength: 30,
  defaultVal: "",
}
export default TextInput
