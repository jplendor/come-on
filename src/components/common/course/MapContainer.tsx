/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* global kakao */

import React, { useEffect, useRef, useState } from "react"
import Face, { CollectionsOutlined } from "@mui/icons-material"
import { styled } from "@mui/material/styles"
import { Box, Button } from "@mui/material"
import ReactDOMServer from "react-dom/server"
import { SearchCardProp } from "types/API/course-service"
import zIndex from "@mui/material/styles/zIndex"
import KakaoComponent from "./KakaoComponent"
import MarkerOveray from "./MarkerOveray"

const { kakao } = window

export interface MapProps {
  order: number
  title: string
  position: any
  apiId: number
}

const createMarker: any = (
  map: Node,
  markerImage: object,
  Data: Array<MapProps>
) => {
  Data.forEach(({ title, position }) => {
    // 마커를 생성합니다
    new kakao.maps.Marker({
      position,
      title,
      image: markerImage, // 마커이미지 설정
    }).setMap(map)
  })
}

interface CoursePlaceState {
  order: number
  name: string
  description: string
  lng: number // 경도 x
  lat: number // 위도 y
  apiId: number
  category: string
  id?: number
}

export interface MapContainerProps {
  selectedNumber: string
  placeLists: CoursePlaceState[]
  isSuccess: boolean
  isLoading: boolean
}
// {첫번째 데이터를 중심으로 잡기}

const makeData = (placeLists: CoursePlaceState[]): MapProps[] => {
  const mapData2 = placeLists.map((place) => {
    return {
      order: place.order,
      title: place.name,
      position: new window.kakao.maps.LatLng(place.lat, place.lng),
      apiId: place.apiId,
    }
  })

  return mapData2
}

const MapContainer = ({
  selectedNumber,
  placeLists,
  isSuccess,
  isLoading,
}: MapContainerProps): JSX.Element => {
  const mapContainer = useRef<HTMLDivElement>(null) // 지도를 표시할 div
  const [totalView, setTotalView] = useState<boolean>(true)
  const [item, setItem] = useState(selectedNumber)
  let mapData: MapProps[]

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onClickTotalView = (): any => {
    // eslint-disable-next-line no-param-reassign

    const bounds = new kakao.maps.LatLngBounds()
    if (placeLists !== undefined && selectedNumber === "") {
      placeLists.map((place) =>
        bounds.extend(new kakao.maps.LatLng(place.lat, place.lng))
      )
    }
    return bounds
  }

  useEffect(() => {
    mapData = makeData(placeLists)
    if (isSuccess && mapData !== undefined) {
      const container = mapContainer.current
      const center =
        selectedNumber === ""
          ? mapData[0].position
          : mapData[Number(selectedNumber) - 1].position
      const options = {
        center, // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      }

      // eslint-disable-next-line @typescript-eslint/no-shadow
      const map = new kakao.maps.Map(container, options)
      if (totalView) {
        const bounds = new kakao.maps.LatLngBounds()
        placeLists.map((place) =>
          bounds.extend(new kakao.maps.LatLng(place.lat, place.lng))
        )
        map.setBounds(bounds)
      }

      // 커스텀 오버레이
      // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      // 추후 순서 정보 넘어오면 색깔과 번호 커스텀
      // url정보도 저장하도록 해야함
      mapData.forEach(({ title, position, order, apiId }, index) => {
        const tf = Number(selectedNumber) === index + 1
        const markerOveray = MarkerOveray(
          { title, position, order, apiId },
          tf,
          index
        )

        // 커스텀 오버레이가 표시될 위치입니다
        const customContent = ReactDOMServer.renderToString(markerOveray)
        // 커스텀 오버레이를 생성합니다
        const customOverlay = new window.kakao.maps.CustomOverlay({
          map,
          position,
          content: customContent,
          yAnchor: 1,
        })
      })
    }
  }, [selectedNumber, isSuccess, totalView, placeLists])

  return (
    <>
      <div
        id="map"
        ref={mapContainer}
        style={{
          width: "100%",
          height: "180px",
          margin: "16px 0",
          padding: "0px",
          borderRadius: "8px",
        }}
      />

      <Button
        sx={{ zIndex: "1", marginBottom: "10px" }}
        onClick={() => {
          setTotalView(!totalView)
        }}
      >
        {totalView === true ? "개별보기" : "전체보기"}
      </Button>
    </>
  )
}
export default MapContainer
