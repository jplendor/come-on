import React from "react"
import { FixedSizeList } from "react-window"
import InfiniteLoader from "react-window-infinite-loader"

import { CardItem } from "components/common/card/cardLayout/CardItem"
import useCourse from "./useCourse"

interface InfiniteLoaderProps {
  type: "Metting" | "Neighborhood" | "MyCourse" | "LikedCourse"
}

const ListInfiniteLoader = ({ type }: InfiniteLoaderProps): JSX.Element => {
  const { list, checkIfLoaded, loadData } = useCourse({
    type,
  })

  return (
    <InfiniteLoader
      isItemLoaded={checkIfLoaded}
      loadMoreItems={loadData}
      itemCount={Infinity}
    >
      {({ onItemsRendered, ref }) => {
        return (
          <FixedSizeList
            ref={ref}
            height={585}
            width="100%"
            itemCount={list.length}
            itemSize={250}
            onItemsRendered={onItemsRendered}
          >
            {({ index, style }) => {
              const course = list[index]
              return (
                <CardItem style={style} info={course} key={course.courseId} />
              )
            }}
          </FixedSizeList>
        )
      }}
    </InfiniteLoader>
  )
}

export default ListInfiniteLoader
