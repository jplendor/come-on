/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { CSSProperties, memo } from "react"
import memoize from "memoize-one"
import { isEmpty } from "@fxts/core"
import { FixedSizeList, areEqual } from "react-window"

import { CardItem, CardItem2 } from "components/common/card/cardLayout/CardItem"
import {
  useGetCourseListQuery,
  useGetLikedCourseListQuery,
  useGetMyCourseListQuery,
} from "features/course/courseSlice"
import {
  ServerRes as CourseRes,
  CourseListSliceRes,
  CourseList,
} from "types/API/course-service"
import { useGetMeetingListQuery } from "features/meeting/meetingSlice"
import Basicframe, { QueryProps } from "components/common/BasicFrame/BasicFrame"
import { CardItemSkeletons } from "components/common/card/cardLayout/CardItemSkeleton"
import {
  MeetingList,
  MyCoursesSliceRes,
  ServerResponse as MeetingRes,
} from "types/API/meeting-service"
import { GetLatLng } from "hooks/geolocation/useGeolocation"
import EmptyCard from "components/common/card/cardLayout/CardEmpty"
import useCourse from "./useCourse"

export type LoaderType = "Metting" | "Neighborhood" | "MyCourse" | "LikedCourse"
interface InfiniteLoaderProps {
  type: LoaderType
}

const endpoint = {
  Metting: {
    getCourseList: useGetMeetingListQuery,
    height: 605,
    itemSize: 277,
    query: { size: 500 },
  },
  Neighborhood: {
    getCourseList: useGetCourseListQuery,
    height: 605,
    itemSize: 267,
    query: { size: 500 },
  },
  MyCourse: {
    getCourseList: useGetMyCourseListQuery,
    height: 275,
    itemSize: 267,
    query: {
      courseStatus: "COMPLETE",
      size: 500,
    },
  },
  LikedCourse: {
    getCourseList: useGetLikedCourseListQuery,
    height: 275,
    itemSize: 267,
    query: { size: 500 },
  },
}

interface MyDetialQueryProps extends QueryProps {
  data: CourseRes | MeetingRes<MyCoursesSliceRes>
}
type Info = CourseListSliceRes | MyCoursesSliceRes
export type Option = { height: number; itemSize: number; type: LoaderType }
interface ListProps {
  info: Info
  option: Option
}

interface RowProps {
  index: number
  style: CSSProperties
  data: ListProps
}

const Row = memo(({ index, style, data }: RowProps) => {
  const {
    info: { contents = [] },
    option: { type },
  } = data
  if (type !== "Metting") {
    const course = contents[index] as CourseList
    return <CardItem style={style} info={course} key={course.courseId} />
  }
  const course = contents[index] as MeetingList
  return <CardItem2 style={style} info={course} key={course.id} />
}, areEqual)

const createItemData = memoize((info: Info, option: Option) => ({
  info,
  option,
}))

const List = ({ info, option }: ListProps): JSX.Element => {
  const itemData = createItemData(info, option)
  const {
    info: { contents },
    option: { height, itemSize },
  } = itemData
  if (isEmpty(contents)) return <EmptyCard height={height} />
  return (
    <FixedSizeList
      height={height}
      width="100%"
      itemCount={contents.length}
      itemSize={itemSize}
      itemData={itemData}
    >
      {Row}
    </FixedSizeList>
  )
}

const ListInfiniteLoader = ({ type }: InfiniteLoaderProps): JSX.Element => {
  const { lat, lng } = GetLatLng()
  const { searchText } = useCourse()
  const { getCourseList, height, itemSize, query } = endpoint[type]
  const option = { type, height, itemSize }

  const queryString = {
    ...query,
    lat,
    lng,
    title: searchText,
  }

  const CourseListQuery = getCourseList(queryString as any)
  const Content = Basicframe(
    CourseListQuery as MyDetialQueryProps,
    [CardItemSkeletons, List],
    option
  )

  return Content
}

export default ListInfiniteLoader
