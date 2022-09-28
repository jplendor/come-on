import React from "react"

import useAuth from "hooks/auth/useAuth"
import CardMenu from "./CardMenu"
import TopInfo from "./CardItemTopInfo"
import { ThemeItemBar } from "./CardItem"
import { LikeButton } from "./CardItemButton"

interface CardImgProps {
  isLike: boolean
  courseId: number
}

interface ItemBarTopProps {
  title: React.ReactNode | null
  actionIcon: React.ReactNode
}

const ItemBarTop = ({ title, actionIcon }: ItemBarTopProps): JSX.Element => {
  return (
    <ThemeItemBar
      position="top"
      title={title}
      actionPosition="right"
      actionIcon={actionIcon}
    />
  )
}

/**
 * 좋아요 버튼 컴포넌트
 *
 * 사용범위: 우리동네코스, 마이페이지(내가공유한코스, 좋아요한코스)
 */

export const CardLikeButton = ({
  isLike,
  courseId,
}: CardImgProps): JSX.Element => {
  const {
    LoginStatus: { isloggedin },
  } = useAuth()
  return (
    <ItemBarTop
      title={null}
      actionIcon={
        isloggedin ? <LikeButton isLike={isLike} courseId={courseId} /> : null
      }
    />
  )
}

/**
 * 카드 상단 정보 컴포넌트 (인원수, 확정여부, 카드설정(메뉴))
 *
 * 사용범위: 모임관리
 */

export const CardTopInfo = (): JSX.Element => {
  return <ItemBarTop title={<TopInfo />} actionIcon={<CardMenu />} />
}
