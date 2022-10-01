import React from "react"
import { CardItem2 } from "components/common/card/cardLayout/CardItem"

import imgT from "assets/course/course2.jpg"
import CourseListLayout from "../CourseListLayout"

const testPorsp = {
  img: {
    src: imgT,
    alt: "Breakfast2",
  },
  isLike: false,
  courseId: 0,
  texts: {
    title: "사진찍기 좋은 부산 여행 코스2",
    userName: "여행마스터",
    time: "2022.08.03",
  },
}

const Body = (): JSX.Element => {
  return (
    <CourseListLayout>
      <CardItem2 info={testPorsp} />
      <CardItem2 info={testPorsp} />
      <CardItem2 info={testPorsp} />
      <CardItem2 info={testPorsp} />
    </CourseListLayout>
  )
}

export default Body
