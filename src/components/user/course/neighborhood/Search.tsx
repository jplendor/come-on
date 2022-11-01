import { useDebouncedValue } from "rooks"
import SearchIcon from "@mui/icons-material/Search"
import React, { useCallback, useEffect, useState } from "react"
import { CircularProgress, IconButton, InputAdornment } from "@mui/material"

import useCourse from "hooks/course/useCourse"
import SerchTextField from "components/common/input/SerchTextField"

const ICON_SIZE = 14

// 우리동네코스 검색필드
const Search = (): JSX.Element => {
  const { updateText } = useCourse()
  const [serchText, setSerchText] = useState("")
  const [debouncedValue] = useDebouncedValue(serchText, 800)
  const [isLoading, setIsLoading] = useState(false)

  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setIsLoading(true)
      setSerchText(e.target.value)
    },
    []
  )

  useEffect(() => {
    updateText(debouncedValue)
    setIsLoading(false)
  }, [debouncedValue, updateText])

  return (
    <SerchTextField
      onChange={onChangeHandler}
      placeholder="코스명으로 검색하세요"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon fontSize="small" />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton>
              {isLoading ? <CircularProgress size={ICON_SIZE} /> : null}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )
}

export default Search
