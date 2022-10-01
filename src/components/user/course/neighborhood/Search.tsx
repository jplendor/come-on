import React from "react"
import { InputAdornment } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import SerchTextField from "components/common/input/SerchTextField"

// 우리동네코스 검색필드
const Search = (): JSX.Element => {
  return (
    <SerchTextField
      placeholder="코스명으로 검색하세요"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon fontSize="small" />
          </InputAdornment>
        ),
      }}
    />
  )
}

export default Search
