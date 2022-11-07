import React, { useState } from "react"
import { TextField } from "@mui/material"
import { kMaxLength } from "buffer"
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
  const [inputValue, setInputValue] = useState<string>(value)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = e.target.value
    const ml = maxLength || 30
    if (newValue.length > ml) {
      const v = newValue.slice(0, ml - 1)

      setInputValue(v)
    } else {
      setInputValue(newValue)
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
        value={inputValue}
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
          {inputValue.length}/{maxLength}
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
