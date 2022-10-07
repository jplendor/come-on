/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { useCallback } from "react"
import { setSearchText } from "features/course/courseSlice"
import { useAppDispatch, useAppSelector } from "hooks/redux/useRedux"

const useCourse = () => {
  const dispatch = useAppDispatch()
  const searchText = useAppSelector((state) => state.course.searchText)
  const updateText = useCallback(
    (text: string | null) =>
      dispatch(setSearchText(text === "" || text === null ? undefined : text)),
    [dispatch]
  )

  return {
    searchText,
    updateText,
  }
}
export default useCourse
