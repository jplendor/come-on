import React from "react"
import { isObject } from "@fxts/core"

import { pullingProperty } from "utils"
import type { Mydetail } from "types/API/user-service"
import AlertComponent from "components/common/alert/Alert"

import ProfileInfo from "./ProfileInfo"
import ProfileNickname from "./ProfileNickname"

interface ProfileProps {
  info: Mydetail
}

const Profile = ({
  info: { name, email, nickname, profileImg },
}: ProfileProps): JSX.Element => {
  const [open, setOpen] = React.useState(false)
  const src = pullingProperty(profileImg, ["imageUrl"])
  return (
    <>
      <AlertComponent
        open={open}
        setOpen={setOpen}
        message="업데이트 되었습니다!"
      />
      {/* 프로필 영역 #1-2 */}
      <ProfileInfo
        info={{
          img: {
            src: isObject(src) ? "" : src,
            alt: name,
          },
          title: `어서오세요. ${name}님!`,
          email,
          setOpen,
        }}
      />
      {/* 프로필 영역 #1-3 */}
      <ProfileNickname
        info={{
          nickname,
          setOpen,
        }}
      />
    </>
  )
}

export default Profile
