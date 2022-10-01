import { Box, Typography } from "@mui/material"
import React from "react"
import styled from "@emotion/styled"
import { Close } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

interface HeaderProps {
  text: string
}

const Wrapper = {
  borderBottom: "solid 1px lightgray",
  height: "50px",
  display: "flex",
}

const Text = {
  width: "80%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

const LeftBtn = styled.div`
  width: 10%;
  display: flex;
  justify-content: start;
  align-items: center;
`

const RightBtn = styled.div`
  width: 10%;
  display: flex;
  justify-content: end;
  align-items: center;
  cursor: pointer;
`

const Header = ({ text }: HeaderProps): JSX.Element => {
  const navigate = useNavigate()

  return (
    <Box sx={Wrapper}>
      <LeftBtn />
      <Typography variant="h6" component="h1" fontWeight="bold" sx={Text}>
        {text}
      </Typography>
      <RightBtn>
        <Close onClick={() => navigate("/meeting")} />
      </RightBtn>
    </Box>
  )
}

export default Header
