/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react"

import theme from "theme"
import "./Customoverlay.css"
import Slide from "@mui/material/Slide"
import { Search } from "@mui/icons-material"
import ReactDOMServer from "react-dom/server"
import { styled } from "@mui/material/styles"
import SearchCard from "components/common/card/SearchCard"
import useGeolocation from "hooks/geolocation/useGeolocation"
import { PlaceType, SearchCardProp } from "types/API/course-service"
import { InputAdornment, TextField, Box, Typography } from "@mui/material"
import { debounceFunc } from "utils"
import { range } from "@fxts/core"

const { kakao } = window
const DELAY = 800

const SearchBar = styled(TextField)(() => ({
  padding: "0px",
  margin: "0px",
}))

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

const MyMarker = ({
  place_name: placeName,
  place_url: placeUrl,
}: SearchCardProp): JSX.Element => {
  return (
    <div
      style={{
        padding: "5px",
        fontSize: "12px",
        border: "1px solid #337FFE",
        borderRadius: "4px",
      }}
    >
      <a
        href={placeUrl}
        target="_blank"
        rel="noreferrer"
        style={{
          textDecoration: "none",
        }}
      >
        {placeName}
      </a>
    </div>
  )
}

interface OverayProps {
  content: string
  apiId: number
}
const myOverlay = ({ content, apiId }: OverayProps): JSX.Element => {
  return (
    <div className="markerBox">
      <a
        href={`https://map.kakao.com/link/map/${apiId}`}
        target="_blank"
        rel="noreferrer"
        style={{
          textDecoration: "none",
          textAlign: "center",
          display: "block",
          fontSize: "12px",
        }}
      >
        {content}
      </a>
    </div>
  )
}

interface SearchPlaceProps {
  mode: PlaceType
  editMode?: boolean
  id?: number | undefined
  page?: number
  setPage?: Dispatch<SetStateAction<number>>
}

const SearchPlace = ({
  mode,
  id,
  page,
  setPage,
  editMode,
}: SearchPlaceProps): JSX.Element => {
  const [myLevel, setMyLevel] = useState(5)
  const { geoState } = useGeolocation()
  const [myLatLng, setMyLatLng] = useState([
    geoState.info.lat,
    geoState.info.lng,
  ])
  const containerRef = React.useRef(null)
  const [open, setOpen] = useState(false)
  const [isSearch, setIsSearch] = useState(false)
  const mapContainer = useRef<HTMLDivElement>(null) // 지도를 표시할 div
  const [selectedNumber, setselectedNumber] = useState("")
  const [searchKeyword, setSearchKeyword] = useState<string>("")
  const [inputedKeyword, setInputedKeyword] = useState<string>("")
  const [selectedData, setSelectedData] = useState<ListDetailCardProp>()
  const [selectedMarker, setSelectedMarker] = useState<any>()
  // 검색창을 이용해 키워드를 검색
  const handleSearchBar = (): void => {
    setSearchKeyword(inputedKeyword)
  }

  const onClickFocus = (event: React.MouseEvent<HTMLDivElement>): void => {
    const e = event?.currentTarget
    if (e) {
      setselectedNumber(e.id)
    } else setselectedNumber("")
  }

  const FontTitle = styled(Typography)(
    ({
      theme: {
        textStyles: {
          title4: { bold },
        },
      },
    }) => ({
      fontSize: bold.fontSize,
      lineHeight: bold.lineHeight,
      fontWeight: bold.fontWeight,
      marginBottom: "12px",
    })
  )

  // 디바운싱 함수
  // 검색창에서 엔터키를 칠때만 검색되도록 설정 - 모바일에서 문제 생기는지 확인
  const onKeyPress = (keyValue: string): void => {
    if (keyValue === "Enter") {
      handleSearchBar()
    }
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

  const displayOvelay: any[] = []

  // 마커를 맵에 표시
  const displayMarker = useCallback(
    (map: any, place: any): void => {
      const marker = new kakao.maps.Marker({
        map,
        position: new kakao.maps.LatLng(place.y, place.x),
      })

      const overlay = myOverlay({ content: place.place_name, apiId: place.id })
      const content = ReactDOMServer.renderToString(overlay)

      const customoverlay = new kakao.maps.CustomOverlay({
        content,
        position: marker.getPosition(),
        yAnchor: 2,
      })

      displayOvelay.push(customoverlay)

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "click", function () {
        const myMarker = MyMarker(place)
        const renderedMarger = ReactDOMServer.renderToString(myMarker)

        // 이전의 마커를 지워줌
        for (let i = 0; i < displayOvelay.length; i += 1) {
          displayOvelay[i].setMap(null)
        }

        // 클릭시 해당 customOvelay를 출력
        customoverlay.setMap(map)
        setSelectedData(place)
        setOpen(true)

        map.panTo(new kakao.maps.LatLng(place.y, place.x))
      })

      marker.setMap(map)
    },
    [displayOvelay]
  )

  useEffect(() => {
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
        for (let i = 0; i < data.length; i += 1) {
          // displayMarker(map, infowindow, data[i])

          displayMarker(map, data[i])
        }
        if (isSearch === true)
          map.setCenter(new kakao.maps.LatLng(data[0].y, data[0].x))
      }
    }

    // 맵에 이동시 좌표이벤트 달기
    kakao.maps.event.addListener(
      map,
      "dragend",
      async function (): Promise<void> {
        const level = await map.getLevel()
        const latlng = map.getCenter()
        setMyLatLng([latlng.getLat(), latlng.getLng()])
        setOpen(false)
        setMyLevel(level)
      }
    )

    // 커스텀 오버레이 설정

    const ps = new kakao.maps.services.Places()
    const pageOptions = {
      size: 5, // 나중에 설정한 위치 기준으로 할 것
      location: new kakao.maps.LatLng(myLatLng[0], myLatLng[1]),
      SORT_BY: "DISTANCE",
      useMapCenter: true,
      useMapBounds: true,
    }

    if (searchKeyword !== "")
      ps.keywordSearch(searchKeyword, placesSearchCB, pageOptions)
    setIsSearch(false)
  }, [searchKeyword, myLatLng, myLevel])

  return (
    <>
      <header>{/* 검색창 만들기 */}</header>
      <Box sx={{ padding: "20px" }} ref={containerRef}>
        <FontTitle>장소검색</FontTitle>
        <SearchBar
          sx={{
            width: "100%",
            margin: "0px",
            padding: "0px 0px",
            border: "1px solid #EEEEEE",
            backgroundColor: theme.grayscale[100],
          }}
          size="small"
          id="tfSearch"
          value={inputedKeyword}
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                sx={{
                  margin: "0px",
                  padding: "0px 0px",
                }}
              >
                <Search />
              </InputAdornment>
            ),
          }}
          onChange={(e) => setInputedKeyword(e.target.value)}
          onKeyDown={(e) => {
            eventHandler(e)
          }}
        />
      </Box>
      <div
        id="map"
        ref={mapContainer}
        style={{ width: "100%", height: "360px", zIndex: "-10px" }}
      />
      {/* <Box open={open} onClose={handleClose}> */}
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Box>
          <Box>
            {selectedData !== undefined && (
              <SearchCard
                item={selectedData}
                key={selectedData.id}
                onClickFocus={onClickFocus}
                selectedNumber={selectedNumber}
                mode={mode}
                editing={editMode}
                id={id}
                setPage={setPage}
                page={page}
              />
            )}
          </Box>
        </Box>
      </Slide>
    </>
  )
}

SearchPlace.defaultProps = {
  editMode: false,
  id: undefined,
  page: undefined,
  // eslint-disable-next-line no-console
  setPage: undefined,
}
export default SearchPlace
