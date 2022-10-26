/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useRef, useCallback } from "react"

import ReactDOMServer from "react-dom/server"
import { InputAdornment, TextField, Box, Pagination } from "@mui/material"
import { Search } from "@mui/icons-material"
import { styled } from "@mui/material/styles"
import { generateComponent } from "utils"
import SearchCard from "components/common/card/SearchCard"
import { CoursePlaceProps, SearchCardProp } from "types/API/course-service"
import useGeolocation from "hooks/geolocation/useGeolocation"
import LikeButton from "components/common/card/cardLayout/CardItemButton"
import { useLocation } from "react-router-dom"

const { kakao } = window
const DELAY = 800

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
  index: number // 카드의 인덱스 넘버 - order
  address_name: string // 주소
  category_name: string // 플레이스 카테고리 -placeCategory
  place_name: string // 장소 이름           -name
  place_url: string // 플레이스 주소        -
  x: number // 경도 longitude              -lon
  y: number // 위도 latitude               -lat
  description: string // 설명              -description
  id: number // 카카오 id                  -kakaoPlaceId
}

export interface MapProps {
  title: string
  position: any
  content: string
}

enum PlaceType {
  m = "meeting",
  c = "course",
  e = "editMode",
}
interface SearchPlaceProps {
  mode: PlaceType
  editMode?: boolean
  id?: number | undefined
  itemsLen?: number
}

const MyMarker = ({
  place_name: placeName,
  place_url: placeUrl,
}: SearchCardProp): JSX.Element => {
  return (
    <div style={{ padding: "5px", fontSize: "12px" }}>
      <a
        href={placeUrl}
        target="_blank"
        rel="noreferrer"
        style={{ textDecoration: "none" }}
      >
        {placeName}
      </a>
    </div>
  )
}

const SearchPlace = ({
  mode,
  editMode,
  id,
  itemsLen,
}: SearchPlaceProps): JSX.Element => {
  const [selectedNumber, setselectedNumber] = useState("")
  const [inputedKeyword, setInputedKeyword] = useState<string>("")
  const [searchKeyword, setSearchKeyword] = useState<string>("")
  const [searchedData, setSearchedData] = useState<ListDetailCardProp[]>([])
  const [selectedPage, setSelectedPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const refPagenation = useRef<any>()
  const { geoState } = useGeolocation()
  const [myLevel, setMyLevel] = useState(5)
  const [myLatLng, setMyLatLng] = useState(["37.566826", "126.9786567"])
  const [isSearch, setIsSearch] = useState(false)

  const mapContainer = useRef<HTMLDivElement>(null) // 지도를 표시할 div

  // 검색창을 이용해 키워드를 검색
  const handleSearchBar = (): void => {
    setSearchKeyword(inputedKeyword)
  }

  // 선택한 페이지의 정보 출력
  const handlePagenation = (page: number): void => {
    setSelectedPage(page)
  }

  const onClickFocus = (event: React.MouseEvent<HTMLDivElement>): void => {
    const e = event?.currentTarget
    if (e) {
      setselectedNumber(e.id)
    } else setselectedNumber("")
  }

  // 디바운싱 함수

  // 검색창에서 엔터키를 칠때만 검색되도록 설정 - 모바일에서 문제 생기는지 확인
  const onKeyPress = (keyValue: string): void => {
    if (keyValue === "Enter") {
      handleSearchBar()
      setSelectedPage(1)
    }
  }

  const debounceFunc = (
    callback: (v: string) => void,
    delay: number
  ): ((v: string) => void) => {
    let timer: ReturnType<typeof setTimeout>

    return (...args) => {
      clearTimeout(timer)
      timer = setTimeout(() => callback(args[0]), delay)
    }
  }

  // 검색한 키워드의 페이지 네이션 개수 설정
  const setPageCount = (page: number): void => {
    setLastPage(page)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const search = useCallback(
    debounceFunc((value: string) => onKeyPress(value), DELAY),
    [inputedKeyword]
  )
  const eventHandler = (e: React.KeyboardEvent): void => {
    setIsSearch(true)
    search(e.key)
  }

  // 리스트 클릭했을 시 색 바뀌는 함수 + 목록에 추가되도록

  // 마커를 맵에 표시
  const displayMarker = (map: any, infowindow: any, place: any): void => {
    const marker = new kakao.maps.Marker({
      map,
      position: new kakao.maps.LatLng(place.y, place.x),
    })

    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, "click", function () {
      // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
      const myMarker = MyMarker(place)
      const renderedMarger = ReactDOMServer.renderToString(myMarker)

      infowindow.setContent(renderedMarger)
      infowindow.open(map, marker)
    })
    marker.setMap(map)
  }

  // eslint-disable-next-line prefer-const

  useEffect(() => {
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1, width: "100px" })
    const container = mapContainer.current

    const options = {
      center: new kakao.maps.LatLng(myLatLng[0], myLatLng[1]),
      level: myLevel,
    }

    const map = new kakao.maps.Map(container, options)

    const placesSearchCB = (data: any, status: any): any => {
      // pagination.gotoPage(selectedPage)
      // if (data !== "ERROR" && pagination.current === selectedPage) {
      //   setSearchedData(data)
      // }
      // setPageCount(pagination.last)
      if (status === kakao.maps.services.Status.OK) {
        setSearchedData(data)
        const bounds = new kakao.maps.LatLngBounds()
        for (let i = 0; i < data.length; i += 1) {
          displayMarker(map, infowindow, data[i])
        }
        // map.panTo(new kakao.maps.LatLng(data[0].y, data[0].x))
      }
    }

    // 맵에 이동시 좌표이벤트 달기
    kakao.maps.event.addListener(
      map,
      "dragend",
      // eslint-disable-next-line func-names
      async function (): Promise<void> {
        const level = await map.getLevel()
        const latlng = map.getCenter()
        setMyLatLng([latlng.getLat(), latlng.getLng()])

        setMyLevel(level)
      }
    )

    const ps = new kakao.maps.services.Places()
    const pageOptions = {
      size: 5, // 나중에 설정한 위치 기준으로 할 것
      location: new kakao.maps.LatLng(myLatLng[0], myLatLng[1]),
      SORT_BY: "DISTANCE",
      useMapCenter: true,
      useMapBounds: true,
    }

    ps.keywordSearch(searchKeyword, placesSearchCB, pageOptions)
    setIsSearch(false)
  }, [selectedPage, searchKeyword, myLatLng, myLevel])

  return (
    <>
      <header>{/* 검색창 만들기 */}</header>
      <SearchBar
        sx={{ width: "100%" }}
        id="tfSearch"
        value={inputedKeyword}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        onChange={(e) => setInputedKeyword(e.target.value)}
        onKeyDown={(e) => {
          eventHandler(e)
        }}
      />
      <div
        id="map"
        ref={mapContainer}
        style={{ width: "100%", height: "20rem" }}
      />

      <ListContainer>
        {searchedData?.length !== 0 &&
          searchedData.map((item) => (
            <SearchCard
              item={item}
              key={item.id}
              onClickFocus={onClickFocus}
              selectedNumber={selectedNumber}
              mode={mode}
              editing={editMode}
              id={id}
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

SearchPlace.defaultProps = {
  editMode: false,
  id: undefined,
  itemsLen: 0,
}
export default SearchPlace
