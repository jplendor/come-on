import React from "react"

import ListInfiniteLoader from "hooks/course/InfiniteLoader"
import CourseTap from "./CourseTap"

interface CourseSharedProps {
  value: number
}

// 내가 공유한 코스 API 조회
const CourseShared = ({ value }: CourseSharedProps): JSX.Element => {
  return (
    <CourseTap value={value} index={0}>
      <ListInfiniteLoader type="MyCourse" />
    </CourseTap>
  )
}

export default CourseShared
