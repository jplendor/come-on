/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { CSSProperties, memo } from "react"
import { FixedSizeList, areEqual } from "react-window"
import memoize from "memoize-one"

import { CardItem } from "components/common/card/cardLayout/CardItem"
import {
  useGetCourseListQuery,
  useGetLikedCourseListQuery,
  useGetMyCourseListQuery,
} from "features/course/courseSlice"
import {
  ServerRes as CourseRes,
  CourseListSliceRes,
} from "types/API/course-service"
import { useGetMeetingListQuery } from "features/meeting/meetingSlice"
import Basicframe, { QueryProps } from "components/common/BasicFrame/BasicFrame"
import { CardItemSkeletons } from "components/common/card/cardLayout/CardItemSkeleton"
import {
  MeetingList,
  ServerResponse as MeetingRes,
} from "types/API/meeting-service"

interface InfiniteLoaderProps {
  type: "Metting" | "Neighborhood" | "MyCourse" | "LikedCourse"
}

const endpoint = {
  Metting: {
    getCourseList: useGetMeetingListQuery,
    height: 585,
    query: { size: 500 },
  },
  Neighborhood: {
    getCourseList: useGetCourseListQuery,
    height: 585,
    query: { size: 500 },
  },
  MyCourse: {
    getCourseList: useGetMyCourseListQuery,
    height: 250,
    query: {
      courseStatus: "COMPLETE",
      size: 500,
    },
  },
  LikedCourse: {
    getCourseList: useGetLikedCourseListQuery,
    height: 250,
    query: { size: 500 },
  },
}

interface MyDetialQueryProps extends QueryProps {
  data: CourseRes | MeetingRes<MeetingList>
}

interface ListProps {
  info: CourseListSliceRes
  height: number
}

interface RowProps {
  index: number
  style: CSSProperties
  data: {
    info: CourseListSliceRes
  }
}

const Row = memo(({ index, style, data }: RowProps) => {
  const {
    info: { contents },
  } = data
  const course = contents[index]
  return <CardItem style={style} info={course} key={course.courseId} />
}, areEqual)

const createItemData = memoize((info: CourseListSliceRes) => ({
  info,
}))

const List = ({ info, height }: ListProps): JSX.Element => {
  const itemData = createItemData(info)
  return (
    <FixedSizeList
      height={height}
      width="100%"
      itemCount={info.contents.length}
      itemSize={250}
      itemData={itemData}
    >
      {Row}
    </FixedSizeList>
  )
}

const ListInfiniteLoader = ({ type }: InfiniteLoaderProps): JSX.Element => {
  const { getCourseList, height, query } = endpoint[type]
  const CourseListQuery = getCourseList(query as any)
  const Content = Basicframe(
    CourseListQuery as MyDetialQueryProps,
    [CardItemSkeletons, List],
    {
      height,
    }
  )

  return Content
}

export default ListInfiniteLoader
