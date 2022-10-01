import React from "react"

import ListInfiniteLoader from "hooks/course/InfiniteLoader"
import CourseTap from "./CourseTap"

interface CourseLikedProps {
  value: number
}

// 좋아요한 코스 API 조회
const CourseLiked = ({ value }: CourseLikedProps): JSX.Element => {
  return (
    <CourseTap value={value} index={1}>
      <ListInfiniteLoader type="LikedCourse" />
    </CourseTap>
  )
}

export default CourseLiked
