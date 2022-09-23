import React, { memo } from "react"
import type { Dispatch, SetStateAction } from "react"
import { Edit as EditIcon } from "@mui/icons-material"
import { CircularProgress, IconButton } from "@mui/material"

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
      <EditIcon sx={{ fontSize: ICON_SIZE }} />
    )}
  </IconButton>
)

export default memo(NameEditButton)
