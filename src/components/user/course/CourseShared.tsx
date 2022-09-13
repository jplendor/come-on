import React from "react"
import CardItem from "components/common/card/CardItem"

import img from "assets/course/course2.jpg"
import CourseTap from "./CourseTap"

interface CourseSharedProps {
  value: number
}

const testPorsp = {
  img: {
    src: img,
    alt: "Breakfast2",
  },
  isLike: false,
  texts: {
    title: "사진찍기 좋은 부산 여행 코스2",
    userName: "여행마스터",
    time: "2022.08.03",
  },
}

const CourseShared = ({ value }: CourseSharedProps): JSX.Element => {
  return (
    <CourseTap value={value} index={0}>
      <CardItem info={testPorsp} />
      <CardItem info={testPorsp} />
      <CardItem info={testPorsp} />
      <CardItem info={testPorsp} />
    </CourseTap>
  )
}

export default CourseShared
