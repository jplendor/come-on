/* eslint-disable react/jsx-props-no-spreading */
import React from "react"
import EditIcon from "@mui/icons-material/Edit"
import { SpeedDialAction, SpeedDialIcon } from "@mui/material"

import ThemeSpeedDial from "components/common/speedDial"
import { generateComponent } from "utils"

const actions = [{ icon: <EditIcon />, name: "코스생성" }]

const SpeedDial = (): JSX.Element => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = (): void => setOpen(true)
  const handleClose = (): void => setOpen(false)

  return (
    <ThemeSpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{ position: "absolute", bottom: 20, right: 8 }}
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
