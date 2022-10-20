import React, { useEffect, useState, useRef } from "react"
import { JsxElement } from "typescript"
import { useLocation, useParams } from "react-router-dom"
import { CoursePlaceProps } from "types/API/course-service"
import SearchPlace from "./SearchPlace"

enum PlaceType {
  m = "meeting",
  c = "course",
}

interface EditMode {
  id: number | undefined
  itemsLen: number
  toModify: CoursePlaceProps[]
  setPage: () => void
}

interface stateProps {
  state: EditMode
}

const CoursePlaceAdd = (): JSX.Element => {
  return (
    <SearchPlace
      mode={PlaceType.c}
      editMode={false}
      id={undefined}
      itemsLen={0}
    />
  )
}

export const CoursePlaceEditModeAdd = (): JSX.Element => {
  const { id } = useParams()
  const location = useLocation()

  return <SearchPlace mode={PlaceType.c} editMode id={Number(id)} />
}

export default CoursePlaceAdd
