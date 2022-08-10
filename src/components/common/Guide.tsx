import React from "react"
import { Box, Typography, Tooltip, IconButton } from "@mui/material"
import styled from "@emotion/styled"
import PackmanImg from "../../assets/packman.png"

const BOX_CSS = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  margin: "1rem",
}
type guideStrProps = {
  guideStr: string
}

const Guide: React.FC<guideStrProps> = ({ guideStr }) => {
  return (
    <Box sx={BOX_CSS} height="50px">
      <img alt="img" src={PackmanImg} width="50px" height="50px" />
      <Typography
        variant="h6"
        sx={{
          width: "100%",
          fontWeight: "800",
          fontStyle: "bold",
          padding: "10px 10px 10px 15px",
        }}
      >
        {guideStr}
      </Typography>
    </Box>
  )
}

export default Guide
