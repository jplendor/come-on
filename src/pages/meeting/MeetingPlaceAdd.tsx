import { PlaceType } from "components/common/card/DisplayListDetailCard"
import SearchPlace from "pages/course/SearchPlace"
import React from "react"

const MeetingPlaceAdd = (): JSX.Element => {
  return (
    <div>
      <SearchPlace mode={PlaceType.m} />
    </div>
  )
}

export default MeetingPlaceAdd
