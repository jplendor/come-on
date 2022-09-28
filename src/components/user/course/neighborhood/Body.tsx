import React from "react"

import { CourseListRes } from "types/API/course-service"
import { useGetCourseListQuery } from "features/course/courseSlice"
import CardItems from "components/common/card/cardLayout/CardItems"
import Basicframe, { QueryProps } from "components/common/BasicFrame/BasicFrame"
import { CardItemSkeletons } from "components/common/card/cardLayout/CardItemSkeleton"

import CourseListLayout from "../CourseListLayout"

interface CourseListQueryProps extends QueryProps {
  data: CourseListRes
}

// 우리동네코스 콘텐츠(리스트) 영역
const Body = (): JSX.Element => {
  const getCourseListQuery = useGetCourseListQuery({
    size: 4,
  }) as CourseListQueryProps
  const Content = Basicframe(getCourseListQuery, [CardItemSkeletons, CardItems])
  return <CourseListLayout>{Content}</CourseListLayout>
}

export default Body
