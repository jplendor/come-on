import React from "react"

import { MyCoursesRes } from "types/API/course-service"
import { useGetMyCourseListQuery } from "features/course/courseSlice"
import CardItems from "components/common/card/cardLayout/CardItems"
import Basicframe, { QueryProps } from "components/common/BasicFrame/BasicFrame"
import { CardItemSkeletons } from "components/common/card/cardLayout/CardItemSkeleton"

import CourseTap from "./CourseTap"

interface CourseSharedProps {
  value: number
}

interface MyCoursesQueryProps extends QueryProps {
  data: MyCoursesRes
}

// 내가 공유한 코스 API 조회

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
