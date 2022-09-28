/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from "react"
import { join, pipe, split } from "@fxts/core"

import { generateComponent } from "utils"
import { MyCoursesSliceRes } from "types/API/course-service"
import { CardItem } from "./CardItem"

interface CardItemsProps {
  info: MyCoursesSliceRes
}

const conversionToString = (arg0: string): string =>
  pipe(arg0, split("-"), join("."))

const CardItems = ({ info: { contents } }: CardItemsProps) => {
  const Component = generateComponent(
    contents,
    ({ imageUrl, title, userLiked, writer, updatedDate, courseId }, key) => (
      <CardItem
        key={key}
        info={{
          img: {
            src: imageUrl,
            alt: title,
          },
          isLike: userLiked,
          courseId,
          texts: {
            title,
            userName: writer.nickname,
            time: conversionToString(updatedDate),
          },
        }}
      />
    )
  )
  return Component
}

export default CardItems
