import { Box, Typography } from "@mui/material"
import React from "react"
import { FmdGoodOutlined } from "@mui/icons-material"

const BOX_STYLE = {
  width: "100%",
  height: "80px",
  padding: "16px, 10px",
  border: "2px dashed #BDBDBD",
  borderRadius: "4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  cursor: "pointer",
}

interface AddCourseBoxProps {
  onClick: () => void
}

const AddCourseBox = (props: AddCourseBoxProps): JSX.Element => {
  const { onClick } = props

  return (
    <Box sx={BOX_STYLE} onClick={onClick}>
      <FmdGoodOutlined sx={{ color: "#9E9E9E" }} />
      <Typography color="#616161" variant="body1">
        새로운 장소를 추가해보세요
      </Typography>
    </Box>
  )
}

export default AddCourseBox
