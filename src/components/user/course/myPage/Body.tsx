import React, { SyntheticEvent } from "react"

import CourseLiked from "../CourseLiked"
import CourseShared from "../CourseShared"
import CourseTaps from "../CourseTaps"

const Body = (): JSX.Element => {
  const [currentIndex, setIndex] = React.useState(0)
  const handleChange = (_event: SyntheticEvent, newValue: number): void =>
    setIndex(newValue)
  return (
    <>
      {/* TAPS */}
      <CourseTaps value={currentIndex} onChangeHandler={handleChange} />
      {/*  내가 공유한 코스 리스트 */}
      <CourseShared value={currentIndex} />
      {/* 좋아요한 코스 리스트 */}
      <CourseLiked value={currentIndex} />
    </>
  )
}

export default Body
