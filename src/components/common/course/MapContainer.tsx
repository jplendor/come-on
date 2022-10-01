/* eslint-disable @typescript-eslint/no-unused-vars */
/* global kakao */

import React, { useEffect, useRef, useState } from "react"
import Face, { CollectionsOutlined } from "@mui/icons-material"
import { styled } from "@mui/material/styles"
import { Box } from "@mui/material"
import ReactDOMServer from "react-dom/server"
import KakaoComponent from "./KakaoComponent"

import MarkerOveray from "./MarkerOveray"

const { kakao } = window

export interface MapProps {
  order: number
  title: string
  position: any
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
  id: number
}

export interface MapContainerProps {
  selectedNumber: string
  placeLists: CoursePlaceState[]
  isSuccess: boolean
  isLoading: boolean
}
// {첫번째 데이터를 중심으로 잡기}

const MapContainer = ({
  selectedNumber,
  placeLists,
  isSuccess,
  isLoading,
}: MapContainerProps): JSX.Element => {
  const mapContainer = useRef<HTMLDivElement>(null) // 지도를 표시할 div
  let mapData: MapProps[]

  const makeData = (): MapProps[] => {
    const mapData2 = placeLists.map((place) => {
      return {
        order: place.order,
        title: place.name,
        position: new window.kakao.maps.LatLng(place.lat, place.lng),
      }
    })

    return mapData2
  }
  useEffect(() => {
    mapData = makeData()
    console.log(mapData)
    console.log(selectedNumber)
    if (isSuccess && mapData !== undefined) {
      const container = mapContainer.current
      const center =
        selectedNumber === ""
          ? mapData[0].position
          : mapData[Number(selectedNumber) - 1].position
      const options = {
        center, // 지도의 중심좌표
        level: 2, // 지도의 확대 레벨
      }

      const map = new kakao.maps.Map(container, options)
      // const imageSrc =
      //   "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png" // 마커이미지의 주소입니다
      // const imageSize = new kakao.maps.Size(30, 30) // 마커이미지의 크기입니다
      // const imageOption = { offset: new kakao.maps.Point(15, 30) } // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

      // // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
      // const markerImage = new kakao.maps.MarkerImage(
      //   imageSrc,
      //   imageSize,
      //   imageOption
      // )
      // createMarker(map, markerImage, mapData)
      // 마커가 지도 위에 표시되도록 설정합니다

      // 커스텀 오버레이
      // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      // 추후 순서 정보 넘어오면 색깔과 번호 커스텀
      // url정보도 저장하도록 해야함
      mapData.forEach(({ title, position, order }, index) => {
        const tf = Number(selectedNumber) === index + 1
        const markerOveray = MarkerOveray({ title, position, order }, tf, index)

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
  }, [selectedNumber, isSuccess, isLoading])

  return (
    <div
      id="map"
      ref={mapContainer}
      style={{
        width: "100%",
        height: "180px",
        margin: "0px",
        padding: "0px",
        borderRadius: "8px",
      }}
    />
  )
}
export default MapContainer
