import React from "react"
import styled from "@emotion/styled"

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
`

const Title = styled.div`
  font-weight: bold;
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
}: InputWrapperProps): JSX.Element => {
  return (
    <>
      <Info>
        <Title>{title}</Title>
        {subTitle}
      </Info>
      {inputItem}
    </>
  )
}

export default InputWrapper
