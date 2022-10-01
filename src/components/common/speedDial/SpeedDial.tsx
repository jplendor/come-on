/* eslint-disable react/jsx-props-no-spreading */
import React from "react"
import { styled } from "@mui/material/styles"
import EditIcon from "@mui/icons-material/Edit"
import type { SpeedDialProps } from "@mui/material"
import {
  Box,
  SpeedDialIcon,
  SpeedDialAction,
  SpeedDial as MuiSpeedDial,
} from "@mui/material"

import { generateComponent } from "utils"

const ThemeSpeedDial = styled((props: SpeedDialProps) => (
  <Box sx={{ position: "relative" }}>
    <MuiSpeedDial {...props} />
  </Box>
))(({ theme: { palette } }) => ({
  "& .MuiSpeedDial-fab": {
    backgroundColor: palette.primary,
  },
}))

const actions = [{ icon: <EditIcon />, name: "코스생성" }]

const SpeedDial = (): JSX.Element => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = (): void => setOpen(true)
  const handleClose = (): void => setOpen(false)

  return (
    <ThemeSpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{ position: "absolute", bottom: 80, right: 3 }}
      icon={<SpeedDialIcon />}
      onOpen={handleOpen}
      onClose={handleClose}
      open={open}
    >
      {generateComponent(actions, (action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
        />
      ))}
    </ThemeSpeedDial>
  )
}

export default SpeedDial
