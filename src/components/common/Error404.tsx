import React from "react"
import Robot404 from "assets/Robot404.svg"
import Image404 from "assets/Image404.png"

import { Box, Typography } from "@mui/material"
import { useLocation, useParams } from "react-router-dom"

const CONTAINER_STYLE = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "250px",
  height: "80px",
  marginBottom: "48px",
}

const MAIN_CONTAINER = {
  display: "flex",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
}

interface errorPageProps {
  content?: string
}

const Error404 = (): JSX.Element => {
  const location = useLocation()
  const { state } = location
  const { content } = state as errorPageProps

  return (
    <Box sx={MAIN_CONTAINER}>
      <Box sx={CONTAINER_STYLE}>
        <img src={Robot404} width="75px" height="75px" alt="sorry" />
        <img
          src={Image404}
          width="100%"
          height="75px"
          alt="sorry"
          style={{ position: "relative", top: "8px" }}
        />
      </Box>
      <Typography>{content}</Typography>
    </Box>
  )
}

Error404.defaultProps = {
  content: "죄송합니다. 페이지를 찾을 수 없습니다.",
}

export default Error404
