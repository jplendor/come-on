import React from "react"
import styled from "@emotion/styled"
import { Typography } from "@mui/material"

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
`

const SubTitle = styled.div`
  color: gray;
`

interface InputWrapperProps {
  title: string
  subTitle: JSX.Element // 적절한 이름 필요
  inputItem: JSX.Element
}

const InputWrapper = ({
  title,
  subTitle,
  inputItem,
}: Partial<InputWrapperProps>): JSX.Element => {
  return (
    <>
      <Info>
        <Typography variant="subtitle1" fontWeight="bold">
          {title}
        </Typography>
        <SubTitle>{subTitle}</SubTitle>
      </Info>
      {inputItem}
    </>
  )
}

export default InputWrapper
