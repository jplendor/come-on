import React from "react"

import ListInfiniteLoader from "hooks/course/InfiniteLoader"
import CourseListLayout from "../CourseListLayout"

// 우리동네코스 콘텐츠(리스트) 영역
const Body = (): JSX.Element => {
  return (
    <CourseListLayout>
      <ListInfiniteLoader type="Neighborhood" />
    </CourseListLayout>
  )
}

export default Body
