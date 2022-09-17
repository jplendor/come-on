import React, { useState, useRef } from "react"
import { JsxElement } from "typescript"
import MapContainer from "components/common/MapContainer"
import { styled } from "@mui/material/styles"

import { Box, Button } from "@mui/material"

// 코스등록 전 미리보기 페이지
const CourseRegiDetail3 = (): JSX.Element => {
  const mapContainer = useRef<HTMLDivElement>(null) // 지도를 표시할 div
  const ImgContainer = styled(Box)(() => ({
    margin: "0",
    padding: "0",
    width: "100%",
    height: "180px",
    objectFit: "cover",
  }))

  const BUTTON_STYLE = {
    height: "50px",
    lineHeight: "50px",
    marginBottom: "10px",
    color: "white",
    fontWeight: "800",
    fontSize: "1rem",
  }

  const MainContainer = styled(Box)(() => ({
    padding: "0px 20px",
    display: "flex",
    flexDirection: "column",
  }))

  return (
    <MainContainer>
      {/*       
        /* 코스 이름
  코스 날짜
  }
{
  코스사진
  코스설명
      */}
      <div>사진찍기 좋은 부산 여행 코스</div>
      <div>여행마스터</div>
      <div>2022-09-15</div>

      <ImgContainer>
        <img
          src="https://pbs.twimg.com/media/DVT-AesUQAATx65.jpg"
          width="100%"
          height="100%"
          alt="img"
        />
      </ImgContainer>
      <div>코스설명</div>
      <div>이 코스에선 귀여운 뱁새를 볼 수 있습니다.</div>

      {/*  맵컨테이너
맵 리스트 */}
      <div
        id="map"
        ref={mapContainer}
        style={{ width: "100%", height: "20rem" }}
      />
    </MainContainer>
  )
}
export default CourseRegiDetail3
