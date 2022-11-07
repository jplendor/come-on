/* eslint-disable import/prefer-default-export */
import { MeetingPlace } from "types/API/meeting-service"
import { CoursePlace, PlaceType } from "types/API/course-service"
import { DropResult } from "react-beautiful-dnd"

const getReorderedPlaces = (
  result: DropResult,
  places: MeetingPlace[] | CoursePlace[],
  mode: PlaceType
): MeetingPlace[] | CoursePlace[] | null => {
  const copyPlaces = [...places]

  const { destination, source } = result
  if (!destination) {
    return null
  }
  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return null
  }

  const sourcePlace = copyPlaces.splice(source.index, 1)[0]
  copyPlaces.splice(destination.index, 0, sourcePlace)

  const reorderedPlaces = copyPlaces.map(
    (item: MeetingPlace | CoursePlace, index: number) => ({
      ...item,
      order: index + 1,
    })
  )

  if (mode === PlaceType.m) return reorderedPlaces as MeetingPlace[]
  if (mode === PlaceType.c) return reorderedPlaces as CoursePlace[]
  return null
}

export { getReorderedPlaces }
