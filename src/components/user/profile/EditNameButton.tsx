import React from "react"
import type { Dispatch, SetStateAction } from "react"
import { CircularProgress, IconButton } from "@mui/material"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"

interface NameEditButtonProps {
  isLoading: boolean
  setIsSubmit: Dispatch<SetStateAction<boolean>>
}

const ICON_SIZE = 14

const NameEditButton = ({
  isLoading,
  setIsSubmit,
}: NameEditButtonProps): JSX.Element => (
  <IconButton disabled={isLoading} onClick={() => setIsSubmit(true)}>
    {isLoading ? (
      <CircularProgress size={ICON_SIZE} />
    ) : (
      <EditOutlinedIcon sx={{ fontSize: ICON_SIZE }} />
    )}
  </IconButton>
)

export default NameEditButton
