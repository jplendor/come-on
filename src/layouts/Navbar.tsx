import React from "react"
import { Grid } from "@mui/material"
import { MapOutlined, GroupsOutlined } from "@mui/icons-material"

import { Url } from "types/auth"
import {
  MemoNavbarItem as NavbarItem,
  MemoNavbarAvatar as NavbarAvatar,
} from "components/nav/NavbarItem"
import useAuth from "hooks/auth/useAuth"
import { LinkComponent } from "components/nav/Link"
import useNavigate from "hooks/navigate/useNavigate"

// 클릭을 한다면 텍스트 색상 변화와 함께 해당 라우터로 경로가 이동하게끔 해야 한다.
// FINISH: 라우터 경로와 동기화 시켜서 인데스 시켜주기 [v]
// FINISH: 새로고침 상태 유지하기 [V]
// FINISH: 해당 인덱스 클릭시 페이지 라우팅 [v]

const Navbar = (): JSX.Element => {
  const {
    LoginStatus: {
      user: {
        profileImg: { imageUrl },
      },
    },
  } = useAuth()
  const { currentIndex: indexState, setIndexDispatch: onClickHandler } =
    useNavigate()

  return (
    <>
      <Grid item>
        <LinkComponent to={Url.home}>
          <NavbarItem
            index={0}
            text="우리동네코스"
            currentIndex={{
              indexState,
              onClickHandler,
            }}
            Icon={MapOutlined}
          />
        </LinkComponent>
      </Grid>
      <Grid item>
        <LinkComponent to={Url.myMeetings}>
          <NavbarItem
            index={1}
            text="모임관리"
            currentIndex={{
              indexState,
              onClickHandler,
            }}
            Icon={GroupsOutlined}
          />
        </LinkComponent>
      </Grid>
      <Grid item>
        <LinkComponent to={Url.myPage}>
          <NavbarAvatar
            index={2}
            text="마이페이지"
            currentIndex={{
              indexState,
              onClickHandler,
            }}
            img={{ src: imageUrl, alt: "userImg" }}
          />
        </LinkComponent>
      </Grid>
    </>
  )
}

export default Navbar
