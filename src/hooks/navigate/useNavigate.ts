import { useCallback } from "react"
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useAppDispatch, useAppSelector } from "hooks/redux/useRedux"
import { setCurrentIndex, stateNavigate } from "features/navigate/navigateSlice"

const useNavigate = () => {
  const dispatch = useAppDispatch()
  const {
    navbar: { currentIndex },
  } = useAppSelector(stateNavigate)
  const setIndexDispatch = useCallback(
    (index: number) => {
      localStorage.setItem("index", `${index}`)
      dispatch(setCurrentIndex(index))
    },
    [dispatch]
  )

  return {
    currentIndex,
    setIndexDispatch,
  }
}

export default useNavigate
