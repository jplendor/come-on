import React from "react"
import { InputAdornment } from "@mui/material"
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined"
import SerchTextField from "components/common/input/SerchTextField"

// 모임관리 검색필드
const Search = (): JSX.Element => {
  return (
    <SerchTextField
      placeholder="날짜 검색하세용"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <DateRangeOutlinedIcon fontSize="small" />
          </InputAdornment>
        ),
      }}
    />
  )
}

export default Search
