import React from "react"
import { CardItemSkeletons } from "components/common/card/CardItemSkeleton"
import CourseTap from "./CourseTap"

interface CourseLikedProps {
  value: number
}

// TODO: 좋아요한 코스 API 연동하기 [] -> 현재 테스트할 데이터가 없음

const CourseLiked = ({ value }: CourseLikedProps): JSX.Element => {
  return (
    <CourseTap value={value} index={1}>
      <CardItemSkeletons />
    </CourseTap>
  )
}

export default CourseLiked
