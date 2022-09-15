import React from "react"
import { Mydetail } from "types/API/user-service"

import ProfileInfo from "./ProfileInfo"
import ProfileNickname from "./ProfileNickname"

interface ProfileProps {
  info: Mydetail
}

const Profile = ({
  info: {
    name,
    email,
    nickname,
    profileImg: { imageUrl },
  },
}: ProfileProps): JSX.Element => {
  return (
    <>
      {/* 프로필 영역 #1-2 */}
      <ProfileInfo
        info={{
          img: {
            src: imageUrl,
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
