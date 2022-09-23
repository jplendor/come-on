import React from "react"
import Basicframe from "components/common/BasicFrame"
import CardItems from "components/common/card/CardItems"
import { MyCoursesResponse } from "types/API/course-service"
import type { QueryProps } from "components/common/BasicFrame"
import { useGetCourseLikeListQuery } from "features/course/courseSlice"
import { CardItemSkeletons } from "components/common/card/CardItemSkeleton"

import CourseTap from "./CourseTap"

interface CourseLikedProps {
  value: number
}

interface MyCoursesQueryProps extends QueryProps {
  data: MyCoursesResponse
}

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
