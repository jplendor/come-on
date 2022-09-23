import React from "react"
import { join, pipe, split } from "@fxts/core"

import { generateComponent } from "utils"
import { MyCoursesSliceResponse } from "types/API/course-service"

import CardItem from "./CardItem"

interface CardItemsProps {
  info: MyCoursesSliceResponse
}

const conversionToString = (arg0: string): string =>
  pipe(arg0, split("-"), join("."))

const CardItems = ({ info: { contents } }: CardItemsProps): JSX.Element => {
  const Component = generateComponent(
    contents,
    ({ imageUrl, title, userLiked, writer, lastModifiedDate }, key) => (
      <CardItem
        key={key}
        info={{
          img: {
            src: imageUrl,
            alt: title,
          },
          isLike: userLiked,
          texts: {
            title,
            userName: writer.nickname,
            time: conversionToString(lastModifiedDate),
          },
        }}
      />
    )
  )
  return <article>{Component}</article>
}

export default CardItems
