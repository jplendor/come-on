import React, { useEffect } from "react"

const { kakao } = window

const KakaoShare = (): JSX.Element => {
  const initialKakao = (): boolean => {
    if (kakao) {
      // 중복 initialization 방지

      if (!kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        kakao.init(process.env.REACT_APP_KAKAO_KEY)
      }
    }

    return !!kakao
  }

  const createButtonAndPopup = (): void => {
    if (initialKakao()) {
      kakao.Share.createCustomButton({
        container: "#kakao-link-btn",
        templateId: 82080,
        templateArgs: {
          title: "제목 영역입니다.",
          description: "설명 영역입니다.",
        },
      })
    }
  }

  useEffect(() => {
    createButtonAndPopup()
  }, [])

  return (
    <button type="button" id="kakao-link-btn" onClick={createButtonAndPopup}>
      카카오톡으로 공유하기
    </button>
  )
}

export default KakaoShare
