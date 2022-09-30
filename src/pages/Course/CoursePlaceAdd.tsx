import React, { useEffect, useState, useRef } from "react"
import { JsxElement } from "typescript"
import SearchPlace from "./SearchPlace"

enum PlaceType {
  m = "meeting",
  c = "course",
}

const CoursePlaceeAdd = (): JSX.Element => {
  return <SearchPlace mode={PlaceType.c} />
}

export default CoursePlaceeAdd
