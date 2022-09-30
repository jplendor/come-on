import { Box, Typography } from "@mui/material"
import React from "react"
import styled from "@emotion/styled"

interface HeaderProps {
  text: string
  leftBtn: JSX.Element
  rightBtn: JSX.Element
}

const Wrapper = {
  borderBottom: "solid 1px lightgray",
  height: "50px",
  display: "flex",
}

const Text = {
  width: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

const LeftBtn = styled.div`
  width: 25%;
  display: flex;
  justify-content: start;
  align-items: center;
`

const RightBtn = styled.div`
  width: 25%;
  display: flex;
  justify-content: end;
  align-items: center;
`

const Header = ({
  text,
  leftBtn,
  rightBtn,
}: Partial<HeaderProps>): JSX.Element => {
  return (
    <Box sx={Wrapper}>
      <LeftBtn>{leftBtn}</LeftBtn>
      <Typography variant="h6" fontWeight="bold" sx={Text}>
        {text}
      </Typography>
      <RightBtn>{rightBtn}</RightBtn>
    </Box>
  )
}

export default Header
