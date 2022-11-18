import React from "react"

import ListInfiniteLoader from "hooks/course/InfiniteLoader"
import CourseListLayout from "../CourseListLayout"

const Body = (): JSX.Element => {
  return (
    <CourseListLayout>
      <ListInfiniteLoader type="Meeting" />
    </CourseListLayout>
  )
}

export default Body
