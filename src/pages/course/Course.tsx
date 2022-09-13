import React, { useState } from "react"

import {
  Box,
  Typography,
  makeStyles,
  IconButton,
  ImageListItem,
  Button,
} from "@mui/material"

import FavoriteIcon from "@mui/icons-material/Favorite"
import { styled } from "@mui/material/styles"
import { SettingsInputAntennaTwoTone } from "@mui/icons-material"
import MapContainer from "components/common/MapContainer"
import KakaoShare from "components/KakaoShare"
import ListDetailCard, {
  ListDetailCardProp,
} from "components/common/ListDetailCard"
import { generateComponent } from "utils"
import KakaoIcon from "assets/nav/KakaoIcon"

const SAMPLE_DATA2: ListDetailCardProp[] = [
  {
    index: 1,
    titleTop: "음식점",
    titleBody: "오리파는 집",
    titleBottom: "부산 토박이만 하는 맛집",
  },
  {
    index: 2,
    titleTop: "포장마차",
    titleBody: "39포차",
    titleBottom: "비가오는 날이면..",
  },
  {
    index: 3,
    titleTop: "유흥주점",
    titleBody: "와글와글노래방",
    titleBottom: "노래방 3시간 먼저가는사람 대머리",
  },
]

const SAMPLE_DATA3 = {
  title: "사진찍기 좋은 부산여행 코스",
  author: "여행마스터",
  date: "2022-08-03", // 나중에 date형식으로 받고 표시형식 설정해야함
}

const TitleContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}))

const MainContainer = styled(Box)(() => ({
  padding: "0px 20px",
  display: "flex",
  flexDirection: "column",
}))

const ImgContainer = styled(Box)(() => ({
  margin: "0",
  padding: "0",
  width: "100%",
  height: "180px",
  objectFit: "cover",
}))

const KakaoContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "right",
  alignItems: "center",
}))

const FONT_SIZE_800 = {
  fontWeight: "800",
}

const BUTTON_STYLE = {
  height: "50px",
  lineHeight: "50px",
  marginBottom: "10px",
  color: "white",
  fontWeight: "800",
  fontSize: "1rem",
}

const Course = (): any => {
  const [isSelected, setSelected] = useState("")

  const onClickFocus = (event: React.MouseEvent<HTMLDivElement>): any => {
    const e = event?.currentTarget

    if (e) {
      setSelected(e.id)
    } else setSelected("")
  }

  // heart버튼 클릭시 이벤트
  // const onClickHeart = (event: React.MouseEvent<HTMLDivElement> | null): any => {
  //   const e: any = event?.currentTarget
  // }

  return (
    <>
      {/* 타이틀만들기 */}
      <ImgContainer>
        <img
          src="https://pbs.twimg.com/media/DVT-AesUQAATx65.jpg"
          width="100%"
          height="100%"
          alt="img"
        />
      </ImgContainer>
      <MainContainer>
        <TitleContainer p={2}>
          <Box className="Title" mt={2}>
            <Typography variant="h5" sx={FONT_SIZE_800}>
              {SAMPLE_DATA3.title}
            </Typography>
            {/* {하트버튼 만들기} */}
            <Box className="subTitle">
              <Typography variant="subtitle1" sx={FONT_SIZE_800}>
                {`${SAMPLE_DATA3.author}  |  ${SAMPLE_DATA3.date}`}
              </Typography>
            </Box>
          </Box>
          <Typography fontSize="2.8rem" mt={2} color="secondary">
            <FavoriteIcon fontSize="inherit" />
          </Typography>
        </TitleContainer>
        <MapContainer selectedNumber={isSelected} />
        <KakaoContainer p={1}>
          <Typography mr={1} variant="subtitle1" sx={FONT_SIZE_800}>
            <KakaoShare />
          </Typography>
          <KakaoIcon width="30px" height="30px" />
        </KakaoContainer>
        {/* 카카오톡 공유하기 */}
        {/* 버튼만들기 */}
        {generateComponent(SAMPLE_DATA2, (item, key) => (
          <ListDetailCard
            item={item}
            key={key}
            onClick={onClickFocus}
            isSelected={isSelected}
          />
        ))}
        {/* 공유하기 버튼 만들기 클릭시 post 요청으로 코스 등록 => 모임생성 페이지로 감 */}
        <Button sx={BUTTON_STYLE} variant="contained">
          이 코스로 모임 생성하기
        </Button>
      </MainContainer>
    </>
  )
}

export default Course
