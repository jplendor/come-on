import React, { useMemo } from "react"

// 우리동네코스
import NeighborhoodHeader from "components/user/course/neighborhood/Header"
import NeighborhoodBody from "components/user/course/neighborhood/Body"
// 모임관리
import MeetingHeader from "components/user/course/meeting/Search"
import MeetingBody from "components/user/course/meeting/Body"
// 마이페이지
import MyPageHeader from "components/user/course/myPage/Header"
import MyPageProfile from "components/user/course/myPage/HeaderContent"
import MyPageBody from "components/user/course/myPage/Body"

import Main from "layouts/contents/Main"
import CardBody from "./CardBody"
import CardHeader from "./CardHeader"

/**
 * 카드 타입은 총 3개로 나눔
 *
 * 1. 우리동네코스
 *
 * 2. 모임관리
 *
 * 3. 마이페이지 (내가 공유한 코스, 좋아요한 코스)
 *
 */

// 우리동네코스 & 모임관리 공통 styles
const courseHeaderSx = {
  pb: "14px",
  height: "65px",
}
const courseBodySx = {
  maxHeight: "605px",
  overflowY: "auto",
  overflowX: "hidden",
}

const myPageHeaderSx = {
  pb: "14px",
  height: "65px",
  textAlign: "center",
  mb: "16px",
  borderBottom: "0.5px solid #EEEEEE",
}
const myPageBodySx = {
  px: "0px",
}

const CardType = {
  Neighborhood: {
    Header: NeighborhoodHeader,
    HeaderContent: null,
    HeaderSx: courseHeaderSx,
    Body: NeighborhoodBody,
    BodySx: courseBodySx,
  },
  Meeting: {
    Header: MeetingHeader,
    HeaderContent: null,
    HeaderSx: courseHeaderSx,
    Body: MeetingBody,
    BodySx: courseBodySx,
  },
  MyPage: {
    Header: MyPageHeader,
    HeaderContent: MyPageProfile,
    HeaderSx: myPageHeaderSx,
    Body: MyPageBody,
    BodySx: myPageBodySx,
  },
}

interface CardLayoutProps {
  type: "Meeting" | "Neighborhood" | "MyPage"
}

const CardLayout = ({ type }: CardLayoutProps): JSX.Element => {
  const { Header, Body, HeaderSx, BodySx, HeaderContent } = useMemo(
    () => CardType[type],
    [type]
  )
  return (
    // 콘텐츠 영역 #1
    <Main>
      <CardHeader sx={HeaderSx} Content={HeaderContent}>
        <Header />
      </CardHeader>
      <CardBody sx={BodySx}>
        <Body />
      </CardBody>
    </Main>
  )
}

export default CardLayout
