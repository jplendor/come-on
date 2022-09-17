import React from "react"
import CardItem from "components/common/card/CardItem"

import img from "assets/course/course1.jpg"
import CourseTap from "./CourseTap"

interface CourseLikedProps {
  value: number
}

const testPorsp = {
  img: {
    src: img,
    alt: "Breakfast1",
  },
  isLike: true,
  texts: {
    title: "사진찍기 좋은 부산 여행 코스",
    userName: "여행마스터",
    time: "2022.08.03",
  },
}

const CourseLiked = ({ value }: CourseLikedProps): JSX.Element => {
  return (
    <CourseTap value={value} index={1}>
      <CardItem info={testPorsp} />
      <CardItem info={testPorsp} />
      <CardItem info={testPorsp} />
      <CardItem info={testPorsp} />
      <CardItem info={testPorsp} />
    </CourseTap>
  )
}

export default CourseLiked
