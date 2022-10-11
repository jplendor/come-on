import React from "react"
import { PlaceType } from "components/common/card/PlaceDetailDraggableCard "
import SearchPlace from "pages/course/SearchPlace"

const MeetingPlaceAdd = (): JSX.Element => {
  return (
    <div>
      <SearchPlace mode={PlaceType.m} />
    </div>
  )
}

export default MeetingPlaceAdd
