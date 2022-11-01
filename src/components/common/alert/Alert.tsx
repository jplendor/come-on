import React from "react"
import type { Dispatch, SetStateAction } from "react"
import CloseIcon from "@mui/icons-material/Close"
import { Alert, Box, Collapse, IconButton } from "@mui/material"

interface AlertComponentProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  message: string
}
const AlertComponent = ({
  open,
  setOpen,
  message,
}: AlertComponentProps): JSX.Element => {
  return (
    <Box sx={{ width: "100%", position: "sticky" }}>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setOpen(false)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      </Collapse>
    </Box>
  )
}

export default AlertComponent
