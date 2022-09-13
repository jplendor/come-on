import React, { useEffect } from "react"

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

const KakaoShare = (): JSX.Element => {
  const kakao = window.Kakao

  if (initialKakao(kakao)) {
    kakao.Share.createCustomButton({
      container: "#kakao-link-btn",
      templateId: 82080,
      templateArgs: {
        title: "제목 영역입니다.",
        description: "설명 영역입니다.",
      },
    })
  }

  return (
    <button type="button" id="kakao-link-btn">
      카카오톡으로 공유하기
    </button>
  )
}

export default KakaoShare
