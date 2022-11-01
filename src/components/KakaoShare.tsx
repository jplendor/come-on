import { Share } from "@mui/icons-material"
import Button from "@mui/material/Button"
import React, { useEffect, useState } from "react"

declare global {
  interface Window {
    Kakao: any
  }
}

const initialKakao = (kakao: any): boolean => {
  if (kakao) {
    // 중복 initialization 방지

    if (!kakao.isInitialized()) {
      // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
      kakao.init(process.env.REACT_APP_KAKAO_KEY)
    }
  }

  return !!kakao
}

interface KakaoShaprProps {
  name: string
  title: string
  content: string
  imageUrl: string
  courseId: number
}
const KakaoShare = ({
  name,
  title,
  content,
  imageUrl,
  courseId,
}: KakaoShaprProps): JSX.Element => {
  const [isInitial, setisInitial] = useState(false)
  const kakao = window.Kakao

  useEffect(() => {
    setisInitial(initialKakao(kakao))
    if (isInitial) {
      kakao.Share.createCustomButton({
        container: "#kakao-link-btn",
        templateId: 82080,
        templateArgs: {
          NAME: name,
          TITLE: title,
          CONTENT: content,
          IMAGEURL: imageUrl,
          LINK: courseId,
        },
      })
    }
  }, [isInitial, kakao])

  return (
    <Button
      variant="outlined"
      id="kakao-link-btn"
      sx={{
        height: "48px",
        width: "100%",
        color: "black",
        border: "1px solid #EEEEEE",
        borderRadius: "4px",
      }}
    >
      <Share />
      카카오톡으로 공유하기
    </Button>

    // <button type="button" id="kakao-link-btn">
    //   카카오톡으로 공유하기
    // </button>
  )
}

export default KakaoShare
