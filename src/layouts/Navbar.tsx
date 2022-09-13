import React, { useState } from "react"
import {
  MapOutlined as MapOutlinedIcon,
  GroupsOutlined as GroupsOutlinedIcon,
} from "@mui/icons-material"
import { Grid } from "@mui/material"

import img from "assets/nav/Ellipse.png"
import { NavbarAvatar, NavbarItem } from "components/nav/NavbarItem"

// 클릭을 한다면 텍스트 색상 변화와 함께 해당 라우터로 경로가 이동하게끔 해야 한다.
// TODO: 라우터 경로와 동기화 시켜서 인데스 시켜주기 []
// *네브바는 전역에 해당하기에 리덕스를 사용해도 좋을듯하다
// TODO: 해당 인덱스 클릭시 페이지 라우팅 []

const Navbar = (): JSX.Element => {
  const [indexState, setIndex] = useState(0)
  const onClickHandler = (index: number): void => setIndex(index)
  return (
    <>
      <Grid item>
        <NavbarItem
          index={0}
          text="우리동네코스"
          currentIndex={{
            indexState,
            onClickHandler,
          }}
          Icon={MapOutlinedIcon}
        />
      </Grid>
      <Grid item>
        <NavbarItem
          index={1}
          text="모임관리"
          currentIndex={{
            indexState,
            onClickHandler,
          }}
          Icon={GroupsOutlinedIcon}
        />
      </Grid>
      <Grid item>
        <NavbarAvatar
          index={2}
          text="마이페이지"
          currentIndex={{
            indexState,
            onClickHandler,
          }}
          img={{ src: img, alt: "Remy Sharp" }}
        />
      </Grid>
    </>
  )
}

export default Navbar
