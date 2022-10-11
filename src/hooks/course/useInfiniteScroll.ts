/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { isEmpty } from "@fxts/core"
import { useCallback, useState, useEffect, useMemo } from "react"
import { UseQuery } from "@reduxjs/toolkit/dist/query/react/buildHooks"

import { GetLatLng } from "hooks/geolocation/useGeolocation"
import { CourseList } from "types/API/course-service"

import { MeetingList } from "types/API/meeting-service"
import useCourse from "./useCourse"
import { LoaderType } from "./InfiniteLoader"

const useQueryType = (type: LoaderType) => {
  const { lat, lng } = GetLatLng()
  const { searchText } = useCourse()

  let queryString: {
    [key in string]: string | number | undefined
  }

  switch (type) {
    // 우리동네코스
    case "Neighborhood": {
      queryString = {
        lat,
        lng,
        size: 3,
        title: searchText,
      }
      break
    }
    // 내가공유한코스
    case "MyCourse": {
      queryString = {
        size: 3,
        courseStatus: "COMPLETE",
      }
      break
    }
    // 좋아요한코스 & 모임관리
    default: {
      queryString = {
        size: 3,
      }
    }
  }

  return useMemo(() => queryString, [queryString])
}

const useInfiniteScroll = (
  useGetDataListQuery: UseQuery<any>,
  type: LoaderType
) => {
  const queryString = useQueryType(type)
  // 로컬 페이지 상태
  const [done, setDone] = useState(false)
  const [localPage, setLocalPage] = useState(0)
  const [title, setTitle] = useState(queryString?.title)
  const [geo, setGeo] = useState(queryString?.lat)
  const [combinedData, setCombinedData] = useState<
    CourseList[] | MeetingList[]
  >([])
  const queryResponse = useGetDataListQuery({
    page: localPage,
    ...queryString,
  })
  // data Fetch
  const {
    data: {
      contents: fetchData,
      currentSlice: remotePage,
      last: maxPages,
      hasNext: hasNextPage,
    } = {
      contents: [],
      currentSlice: 0,
      last: false,
      hasNext: false,
    },
  } = (queryResponse?.data as any) || {}

  const refresh = useCallback(() => {
    setLocalPage(0)
  }, [])

  const readMore = () => {
    if (!maxPages && localPage === remotePage) {
      setLocalPage((page) => page + 1)
      setDone(false)
    }
  }

  const checkQuery = useCallback(
    (
      queryName: "title" | "geo",
      query: string | number | undefined,
      changeState: (arg: string | number | undefined) => void
    ) => {
      if (query !== queryString[queryName]) {
        changeState(queryString[queryName])
        refresh()
      }
    },
    [queryString, refresh]
  )

  useEffect(() => {
    if (queryResponse.isLoading) return
    if (isEmpty(fetchData)) setLocalPage(0)
    if (localPage === 0) {
      setCombinedData(fetchData)
    } else if (localPage === remotePage && !done) {
      setCombinedData((previousData) => [...previousData, ...fetchData])
      setDone(true)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData, done])

  useEffect(() => {
    checkQuery("title", title, setTitle)
    checkQuery("geo", geo, setGeo)
  }, [queryString, checkQuery, title, geo])

  // false 되면 다시 페치
  const checkIfLoaded = (index: number): boolean => {
    return !hasNextPage || index < combinedData.length
  }

  return {
    combinedData,
    setCombinedData,
    localPage,
    readMore,
    refresh,
    checkIfLoaded,
    isLoading: queryResponse?.isLoading,
    isFetching: queryResponse?.isFetching,
  }
}

export default useInfiniteScroll
