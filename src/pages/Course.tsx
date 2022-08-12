import React from "react"

import { Box, Typography } from "@mui/material"

import FavoriteIcon from "@mui/icons-material/Favorite"

import { styled } from "@mui/material/styles"
import MapContainer from "../components/common/MapContainer"
import ListDetailCard, {
  ListDetailCardProp,
} from "../components/common/ListDetailCard"

import { generateComponent } from "../utils"
import KakaoIcon from "../components/common/KakaoComponent"

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

const Course = (): any => {
  return (
    <>
      {/* 타이틀만들기 */}
      <TitleContainer p={2}>
        <Box className="Title" mt={2}>
          <Typography variant="h5" sx={{ fontWeight: "800" }}>
            {SAMPLE_DATA3.title}
          </Typography>
          <Box className="subTitle">
            <Typography variant="subtitle1" sx={{ fontWeight: "800" }}>
              {`${SAMPLE_DATA3.author}  |  ${SAMPLE_DATA3.date}`}
            </Typography>
          </Box>
        </Box>
        <Typography fontSize="2.8rem" mt={2} color="secondary">
          <FavoriteIcon fontSize="inherit" />
        </Typography>
      </TitleContainer>
      <MapContainer />
      <Box>
        <Typography>카카오톡으로 공유하기</Typography>
        <KakaoIcon width="40px" height="40px" />
      </Box>
      {/* 카카오톡 공유하기 */}
      {generateComponent(SAMPLE_DATA2, (item, key) => (
        <ListDetailCard item={item} key={key} />
      ))}
    </>
  )
}

export default Course
