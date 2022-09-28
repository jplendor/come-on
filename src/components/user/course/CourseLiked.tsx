import React from "react"
import { MyCoursesRes } from "types/API/course-service"
import Basicframe from "components/common/BasicFrame/BasicFrame"
import { useGetCourseLikeListQuery } from "features/course/courseSlice"
import type { QueryProps } from "components/common/BasicFrame/BasicFrame"
import CardItems from "components/common/card/cardLayout/CardItems"
import { CardItemSkeletons } from "components/common/card/cardLayout/CardItemSkeleton"

import CourseTap from "./CourseTap"

interface CourseLikedProps {
  value: number
}

interface MyCoursesQueryProps extends QueryProps {
  data: MyCoursesRes
}

// 좋아요한 코스 API 조회
const CourseLiked = ({ value }: CourseLikedProps): JSX.Element => {
  const getLikeCourseQuery = useGetCourseLikeListQuery(
    {}
  ) as MyCoursesQueryProps
  const Content = Basicframe(getLikeCourseQuery, [CardItemSkeletons, CardItems])
  return (
    <CourseTap value={value} index={1}>
      {Content}
    </CourseTap>
  )
}

export default CourseLiked
