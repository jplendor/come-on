import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useRef,
  ReactElement,
} from "react"

import ReactDOMServer from "react-dom/server"
import {
  Input,
  InputAdornment,
  TextField,
  Box,
  Pagination,
} from "@mui/material"
import { Search, Edit as EditIcon } from "@mui/icons-material"
import { styled } from "@mui/material/styles"
import { generateComponent } from "utils"
import SearchCard from "components/common/card/SearchCard"

const { kakao } = window

const SearchBar = styled(TextField)(() => ({
  padding: "10px",
  margin: "10px 0",
}))

const ListContainer = styled(Box)(() => ({
  padding: "10px",
}))

const PaginationStyle = {
  margin: "0, auto",
  display: "flex",
  justifyContent: "center",
}
interface ListDetailCardProp {
  index: number
  address_name: string
  category_group_name: string
  category_name: string
  place_name: string
  place_url: string
  road_address_name: string
  x: string
  y: string
  content: string
  phone: string
}

const MyMarker = (): JSX.Element => {
  return (
    <div style={{ padding: "5px", fontSize: "12px" }}>
      <a
        href="https://map.kakao.com/link/map/11394059"
        target="_blank"
        rel="noreferrer"
      >
        테스트마커입니다
      </a>
    </div>
  )
}

export interface MapProps {
  title: string
  position: any
  content: string
}

const SearchPlace = (): JSX.Element => {
  const [isSelected, setSelected] = useState("")
  const [inputedKeyword, setInputedKeyword] = useState<string>("")
  const [searchKeyword, setSearchKeyword] = useState<string>("")
  const [searchedData, setSearchedData] = useState<ListDetailCardProp[]>([])
  const [selectedPage, setSelectedPage] = useState(0)
  const [lastPage, setLastPage] = useState(0)
  const refPagenation = useRef<any>()

  const mapContainer = useRef<HTMLDivElement>(null) // 지도를 표시할 div

  // 검색창을 이용해 키워드를 검색
  const handleSearchBar = (): void => {
    setSearchKeyword(inputedKeyword)
  }

  // 선택한 페이지의 정보 출력
  const handlePagenation = (page: number): void => {
    setSelectedPage(page)
  }

  // 검색창에서 엔터키를 칠때만 검색되도록 설정 - 모바일에서 문제 생기는지 확인
  const onKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key === "Enter") {
      handleSearchBar()
      setSelectedPage(1)
    }
  }

  // 검색한 키워드의 페이지 네이션 개수 설정
  const setPageCount = (page: number): void => {
    setLastPage(page)
  }

  // 리스트 클릭했을 시 색 바뀌는 함수 + 목록에 추가되도록
  const onClickFocus = (event: React.MouseEvent<HTMLDivElement>): void => {
    const e = event?.currentTarget
    if (e) {
      setSelected(e.id)
    } else setSelected("")
  }

  // 마커를 맵에 표시
  const displayMarker = (map: any, infowindow: any, place: any): void => {
    const marker = new kakao.maps.Marker({
      map,
      position: new kakao.maps.LatLng(place.y, place.x),
    })

    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, "click", function () {
      // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
      const myMarker = MyMarker()
      const renderedMarger = ReactDOMServer.renderToString(myMarker)

      infowindow.setContent(renderedMarger)
      infowindow.open(map, marker)
    })
  }

  useEffect(() => {
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })
    const container = mapContainer.current

    const options = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567),
      level: 3,
    }

    const map = new kakao.maps.Map(container, options)
    const imageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png"
    const imageSize = new kakao.maps.Size(64, 69)
    const imageOption = { offset: new kakao.maps.Point(27, 69) }

    // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    // 추후 커스텀 마커에 필요
    // const markerImage = new kakao.maps.MarkerImage(
    //   imageSrc,
    //   imageSize,
    //   imageOption
    // )

    // 검색정보를 받는 콜백함수
    const placesSearchCB = (data: any, status: any, pagination: any): any => {
      pagination.gotoPage(selectedPage)

      if (data !== "ERROR" && pagination.current === selectedPage) {
        setSearchedData(data)
      }

      setPageCount(pagination.last)

      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds()
        for (let i = 0; i < data.length; i += 1) {
          displayMarker(map, infowindow, data[i])
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
        }
        map.setBounds(bounds)
      }
    }

    const ps = new kakao.maps.services.Places()
    const pageOptions = { size: 5 }
    const value = searchKeyword

    ps.keywordSearch(value, placesSearchCB, pageOptions)
  }, [searchKeyword, selectedPage])

  return (
    <>
      <header>{/* 검색창 만들기 */}</header>
      <SearchBar
        fullWidth
        id="tfSearch"
        value={inputedKeyword}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        onChange={(e) => {
          setInputedKeyword(e.target.value)
        }}
        onKeyDown={onKeyPress}
      />
      <div
        id="map"
        ref={mapContainer}
        style={{ width: "100%", height: "20rem" }}
      />

      <ListContainer>
        {searchedData?.length !== 0 &&
          generateComponent(searchedData, (item, key) => (
            <SearchCard
              item={item}
              key={key}
              onClick={onClickFocus}
              isSelected={isSelected}
            />
          ))}
      </ListContainer>
      <Pagination
        count={lastPage}
        sx={PaginationStyle}
        onChange={(e, v) => {
          handlePagenation(v)
        }}
        ref={refPagenation}
      />
    </>
  )
}

export default SearchPlace
