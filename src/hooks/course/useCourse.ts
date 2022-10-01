import { useCallback, useEffect, useRef, useState } from "react"

import { useAppDispatch } from "hooks/redux/useRedux"
import { endpoints } from "features/course/courseSlice"
import { CourseList, MyCourses } from "types/API/course-service"

const endpoint = {
  // 아직 API 없음
  Metting: {
    getCourseList: endpoints.getCourseList.initiate,
  },
  Neighborhood: {
    getCourseList: endpoints.getCourseList.initiate,
  },
  MyCourse: {
    getCourseList: endpoints.getMyCourseList.initiate,
  },
  LikedCourse: {
    getCourseList: endpoints.getLikedCourseList.initiate,
  },
}

interface UseCourseProps {
  type: "Metting" | "Neighborhood" | "MyCourse" | "LikedCourse"
}

interface ReturnType {
  list: CourseList[] | MyCourses[]
  loadData: () => Promise<void>
  checkIfLoaded: (index: number) => boolean
}

const useCourse = ({ type }: UseCourseProps): ReturnType => {
  const dispatch = useAppDispatch()
  const { getCourseList } = endpoint[type]
  const didFetchInitialData = useRef(false)

  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [hasNextPage, setHasNextPage] = useState(true)
  const [list, setList] = useState<CourseList[] | MyCourses[]>([])

  const loadData = useCallback(async () => {
    if (isLoading) return
    setIsLoading(true)
    const { data, isSuccess } = await dispatch(getCourseList({ size: 3, page }))
    if (isSuccess) {
      const {
        data: { contents, hasNext },
      } = data
      if (!hasNext) setHasNextPage(false)
      setPage((prev) => prev + 1)
      setList([...list, ...contents])
    }
    setIsLoading(false)
  }, [getCourseList, isLoading, list, dispatch, page])

  // false 되면 다시 페치
  const checkIfLoaded = (index: number): boolean => {
    return !hasNextPage || index < list.length
  }

  useEffect(() => {
    if (!didFetchInitialData.current) {
      didFetchInitialData.current = true
      loadData()
    }
  }, [loadData])

  return {
    list,
    loadData,
    checkIfLoaded,
  }
}
export default useCourse
