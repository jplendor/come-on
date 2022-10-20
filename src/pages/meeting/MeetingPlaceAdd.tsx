import React from "react"
import { PlaceType } from "types/API/course-service"
import SearchPlace from "pages/course/SearchPlace"

const MeetingPlaceAdd = (): JSX.Element => {
  return (
    <div>
      <SearchPlace mode={PlaceType.m} />
    </div>
  )
}

export default MeetingPlaceAdd
