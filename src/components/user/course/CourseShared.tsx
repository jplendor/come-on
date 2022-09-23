import React from "react"

import CardItems from "components/common/card/CardItems"
import { MyCoursesRes } from "types/API/course-service"
import Basicframe, { QueryProps } from "components/common/BasicFrame"
import { useGetMyCourseListQuery } from "features/course/courseSlice"
import { CardItemSkeletons } from "components/common/card/CardItemSkeleton"

import CourseTap from "./CourseTap"

interface CourseSharedProps {
  value: number
}

interface MyCoursesQueryProps extends QueryProps {
  data: MyCoursesRes
}

const CourseShared = ({ value }: CourseSharedProps): JSX.Element => {
  const getCourseQuery = useGetMyCourseListQuery({
    courseStatus: "COMPLETE",
  }) as MyCoursesQueryProps
  const Content = Basicframe(getCourseQuery, [CardItemSkeletons, CardItems])
  return (
    <CourseTap value={value} index={0}>
      {Content}
    </CourseTap>
  )
}

export default CourseShared
