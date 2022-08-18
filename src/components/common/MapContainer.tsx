/* eslint-disable @typescript-eslint/no-unused-vars */
/* global kakao */

import React, { useEffect } from "react"
import { JsxElement } from "typescript"
import Face from "@mui/icons-material"
import { styled } from "@mui/material/styles"
import { Box } from "@mui/material"
import KakaoComponent from "./KakaoComponent"
import "./Customoverlay.css"

const { kakao } = window
declare global {
  interface Window {
    kakao: any
  }
}

export interface MapProps {
  title: string
  latlng: any
  content: string
}

const SAMPLE_DATA3: MapProps[] = [
  {
    title: "카카오",
    latlng: new window.kakao.maps.LatLng(33.450705, 126.570677),
    content: "카카오는 쓰다",
  },
  {
    title: "생태연못",
    latlng: new window.kakao.maps.LatLng(33.450936, 126.569477),
    content: "물고기에게 양보하세요",
  },
  {
    title: "텃밭",
    latlng: new window.kakao.maps.LatLng(33.450879, 126.56994),
    content: "고구마 먹고싶어요",
  },
  {
    title: "근린공원",
    latlng: new window.kakao.maps.LatLng(33.451393, 126.570738),
    content: "공원좋아",
  },
]

const createMarker: any = (
  map: any,
  markerImage: any,
  Data: Array<MapProps>
) => {
  Data.forEach((data) => {
    // 마커를 생성합니다
    const marker = new kakao.maps.Marker({
      position: data.latlng,
      title: data.title,
      image: markerImage, // 마커이미지 설정
    }).setMap(map)
  })
}

// {첫번째 데이터를 중심으로 잡기}

const MapContainer: React.FC<any> = ({ selectedNumber }) => {
  useEffect(() => {
    const container = document.getElementById("map") // 지도를 표시할 div
    const options = {
      center: SAMPLE_DATA3[0].latlng, // 지도의 중심좌표
      level: 4, // 지도의 확대 레벨
    }

    const map = new kakao.maps.Map(container, options)
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
    createMarker(map, markerImage, SAMPLE_DATA3)
    // 마커가 지도 위에 표시되도록 설정합니다

    // 커스텀 오버레이
    // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    // 추후 순서 정보 넘어오면 색깔과 번호 커스텀
    // url정보도 저장하도록 해야함
    SAMPLE_DATA3.forEach((data, index) => {
      const { title } = data
      const tf = Number(selectedNumber) === index + 1
      const content =
        `<div class = 'customoverlay'>` +
        `    <a href="https://map.kakao.com/link/map/11394059" target="_blank">` +
        `<span class='title'>${title}</span>` +
        `${
          tf
            ? `<span class='number' style="background-Color:#FFD24C">`
            : `<span class='number'>`
        }${index + 1}</span>` +
        ` </a>` +
        `</div>`

      // 커스텀 오버레이가 표시될 위치입니다
      const position = data.latlng

      // 커스텀 오버레이를 생성합니다
      const customOverlay = new kakao.maps.CustomOverlay({
        map,
        position,
        content,
        yAnchor: 1,
      })
    })
  }, [selectedNumber])

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "300px" }} />
    </div>
  )
}
export default MapContainer
