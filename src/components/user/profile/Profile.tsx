import React from "react"
import { isObject } from "@fxts/core"

import { pullingProperty } from "utils"
import { Mydetail } from "types/API/user-service"

import ProfileInfo from "./ProfileInfo"
import ProfileNickname from "./ProfileNickname"

interface ProfileProps {
  info: Mydetail
}

const Profile = ({
  info: { name, email, nickname, profileImg },
}: ProfileProps): JSX.Element => {
  const src = pullingProperty(profileImg, ["imageUrl"])
  return (
    <>
      {/* 프로필 영역 #1-2 */}
      <ProfileInfo
        info={{
          img: {
            src: isObject(src) ? "" : src,
            alt: name,
          },
          title: `어서오세요. ${name}님!`,
          email,
        }}
      />
      {/* 프로필 영역 #1-3 */}
      <ProfileNickname
        info={{
          nickname,
        }}
      />
    </>
  )
}

export default Profile
