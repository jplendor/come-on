/* eslint-disable react/jsx-props-no-spreading */
import React from "react"
import { styled } from "@mui/material/styles"
import { Box, SpeedDial, SpeedDialProps } from "@mui/material"

const ThemeSpeedDial = styled((props: SpeedDialProps) => (
  <Box sx={{ position: "relative" }}>
    <SpeedDial {...props} />
  </Box>
))(({ theme: { palette } }) => ({
  "& .MuiSpeedDial-fab": {
    backgroundColor: palette.primary,
  },
}))

export default ThemeSpeedDial
