import React from "react"
import { useParams } from "react-router-dom"
import SearchPlace from "./SearchPlace"

enum PlaceType {
  m = "meeting",
  c = "course",
}

const CoursePlaceAdd = (): JSX.Element => {
  return <SearchPlace mode={PlaceType.c} editMode={false} id={undefined} />
}

export const CoursePlaceEditModeAdd = (): JSX.Element => {
  const { id } = useParams()

  return <SearchPlace mode={PlaceType.c} editMode id={Number(id)} />
}

export default CoursePlaceAdd
