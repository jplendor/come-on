import { Button, Typography } from "@mui/material"
import PlaceAddModal from "components/meeting/PlaceAddModal"
import SearchPlace from "pages/course/SearchPlace"
import React, { useState } from "react"

const MeetingPlaceAdd = (): JSX.Element => {
  const [open, setOpen] = useState(false)

  const openModal = (): void => {
    setOpen(true)
  }

  const closeModal = (): void => {
    setOpen(false)
  }

  return (
    <div>
      <Typography>*** SearchPlace 추가 예정 ***</Typography>
      {/* <SearchPlace /> */}
      <Button variant="contained" type="button" onClick={openModal}>
        장소 추가 버튼
      </Button>
      <PlaceAddModal open={open} onClose={closeModal} />
    </div>
  )
}

export default MeetingPlaceAdd
