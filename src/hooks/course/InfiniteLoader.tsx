/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { isEmpty } from "@fxts/core"
import memoizeOne from "memoize-one"
import { FixedSizeList, areEqual } from "react-window"
import ReactInfiniteLoader from "react-window-infinite-loader"
import React, { CSSProperties, memo, useCallback, useEffect } from "react"

import { MeetingList } from "types/API/meeting-service"
import type { CourseList } from "types/API/course-service"
import EmptyCard from "components/common/card/cardLayout/CardEmpty"
import { CardItem, CardItem2 } from "components/common/card/cardLayout/CardItem"
import { CardItemSkeletons } from "components/common/card/cardLayout/CardItemSkeleton"

import { useClickLikeCourseMutation } from "features/course/courseSlice"
import endpoint from "./endpoint"
import useInfiniteScroll from "./useInfiniteScroll"

export type LoaderType = "Metting" | "Neighborhood" | "MyCourse" | "LikedCourse"
interface InfiniteLoaderProps {
  type: LoaderType
}
type Option = { type: LoaderType }
interface ListProps {
  info: CourseList[] | MeetingList[]
  option: Option
  clickLikeFunc: (courseId: number) => void
}
interface RowProps {
  index: number
  style: CSSProperties
  data: ListProps
}

const Row = memo(({ index, style, data }: RowProps) => {
  const {
    info,
    clickLikeFunc,
    option: { type },
  } = data
  if (type !== "Metting") {
    const course = info[index] as CourseList
    return (
      <CardItem
        style={style}
        info={course}
        key={course.courseId}
        onClickHandler={clickLikeFunc}
      />
    )
  }
  const course = info[index] as MeetingList
  return <CardItem2 style={style} info={course} key={course.id} />
}, areEqual)

const InfiniteLoader = memo(({ type }: InfiniteLoaderProps) => {
  const { getCourseList, height, itemSize } = endpoint[type]
  const [click] = useClickLikeCourseMutation()
  const {
    refresh,
    isFetching,
    readMore,
    isLoading,
    combinedData,
    checkIfLoaded,
    setCombinedData,
  } = useInfiniteScroll(getCourseList, type)

  const changeItem = (
    data: CourseList[] | MeetingList[],
    courseId: number,
    f: (
      draft: CourseList[] | MeetingList[],
      id: number
    ) => CourseList[] | MeetingList[]
  ) => {
    if (data.length < 3) return data
    return f(data, courseId)
  }

  const clickLike = useCallback(
    (courseId: number) => {
      const data = changeItem(combinedData, courseId, (draft, id) => {
        const copyData = [...draft] as CourseList[]
        const index = copyData.findIndex((info) => info.courseId === id)
        const target = copyData[index]
        if (!target) return draft
        // 아이템 제거
        if (type === "LikedCourse")
          return copyData.filter((info) => info.courseId !== id)
        const newUserLiked = !target.userLiked
        const newLikeCount = newUserLiked
          ? target.likeCount + 1
          : target.likeCount - 1
        const newItem = {
          ...target,
          userLiked: newUserLiked,
          likeCount: newLikeCount,
        }
        copyData.splice(index, 1, newItem)
        return copyData
      })
      click(courseId)
      setCombinedData(data)
    },
    [combinedData, setCombinedData, type, click]
  )

  // 페이지 리로드
  useEffect(() => {
    refresh()
  }, [refresh])

  if (isLoading) return <CardItemSkeletons />
  if (!isLoading && !isFetching && isEmpty(combinedData))
    return <EmptyCard height={height} />

  const createItemData = memoizeOne(
    (
      info: CourseList[] | MeetingList[],
      option: Option,
      clickLikeFunc: (courseId: number) => void
    ) => ({
      info,
      option,
      clickLikeFunc,
    })
  )

  return (
    <ReactInfiniteLoader
      itemCount={Infinity}
      loadMoreItems={readMore}
      isItemLoaded={checkIfLoaded}
    >
      {({ onItemsRendered, ref }) => {
        const itemData = createItemData(combinedData, { type }, clickLike)
        return (
          <FixedSizeList
            ref={ref}
            width="100%"
            height={height}
            itemSize={itemSize}
            itemCount={itemData.info.length}
            onItemsRendered={onItemsRendered}
            itemData={itemData}
          >
            {Row}
          </FixedSizeList>
        )
      }}
    </ReactInfiniteLoader>
  )
})

export default InfiniteLoader
