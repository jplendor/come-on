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
import { generateComponent } from "../utils"
import SearchCard from "../components/common/SearchCard"

const { kakao } = window

const SearchBar = styled(TextField)(() => ({
  padding: "10px",
  margin: "10px 0",
}))

const ListContainer = styled(Box)(() => ({
  padding: "10px",
}))

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
}

const MyMarker = (): JSX.Element => {
  return (
    <div style={{ padding: "5px", fontSize: "12px" }}>
      <a
        href="https://map.kakao.com/link/map/11394059"
        target="_blank"
        rel="noreferrer"
      >
        dsd
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

  const handleSearchBar = (): void => {
    setSearchKeyword(inputedKeyword)
  }

  const handlePagenation = (page: number): void => {
    setSelectedPage(page)
  }

  const onKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key === "Enter") {
      handleSearchBar()
    }
  }

  useEffect(() => {
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })
    const container = mapContainer.current

    const options = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567), //
      level: 3,
    }

    const map = new kakao.maps.Map(container, options)
    // 마커생성
    const imageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png" // 마커이미지의 주소입니다
    const imageSize = new kakao.maps.Size(64, 69) // 마커이미지의 크기입니다
    const imageOption = { offset: new kakao.maps.Point(27, 69) } // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    )

    const displayMarker = (place: any): void => {
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

    const setPageCount = (page: number): void => {
      setLastPage(page)
    }

    const placesSearchCB = (data: any, status: any, pagination: any): any => {
      pagination.gotoPage(selectedPage)
      console.log(data)
      // "" 일때 다섯개의 값이 들어오는 경우가 있어서 예외처리
      // if (data !== "ERROR") {
      //   setSearchedData(data)
      // }

      setPageCount(pagination.last)

      // if (status === kakao.maps.services.Status.OK) {
      //   const bounds = new kakao.maps.LatLngBounds()
      //   for (let i = 0; i < data.length; i += 1) {
      //     displayMarker(data[i])
      //     bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
      //   }
      //   map.setBounds(bounds)
      // }
      // pagenation 구현
    }

    const ps = new kakao.maps.services.Places()
    const pageOptions = { size: 5 }
    const value = searchKeyword
    ps.keywordSearch(value, placesSearchCB, pageOptions)
  }, [searchKeyword, selectedPage])

  const onClickFocus = (event: React.MouseEvent<HTMLDivElement>): any => {
    const e = event?.currentTarget
    if (e) {
      setSelected(e.id)
    } else setSelected("")
  }
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
        page={selectedPage}
        count={lastPage}
        onChange={(e, v) => {
          handlePagenation(v)
        }}
        ref={refPagenation}
      />
    </>
  )
}

export default SearchPlace
