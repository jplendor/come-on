import React, { useEffect } from "react"
import KakaoShareButton from "./common/KakaoShareButton"

declare global {
  interface Window {
    Kakao: any
  }
}
const KakaoShare = (): JSX.Element => {
  const createKakaoButton = (): any => {
    if (window.Kakao) {
      const kakao = window.Kakao
      // 중복 initialization 방지

      if (!kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        kakao.init(process.env.REACT_APP_KAKAO_KEY)
      }

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

  const onShareKakaoClick = (): any => {
    KakaoShare()
  }

  useEffect(() => {
    createKakaoButton()
  }, [])

  return (
    <a
      href="kakaolink://send?appkey=adbcfa676b0f078b4cdbd17ba0931de8&appver=1.0&linkver=4.0&extras=%7B%22KA%22%3A%22sdk%2F1.43.0%20os%2Fjavascript%20sdk_type%2Fjavascript%20lang%2Fko-KR%20device%2FWin32%20origin%2Fhttp%253A%252F%252Flocalhost%253A3000%22%7D&template_json=%7B%22P%22%3A%7B%22TP%22%3A%22Feed%22%2C%22ME%22%3A%22%24%7BME%7D%22%2C%22SID%22%3A%22capri_784012%22%2C%22DID%22%3A%22http%3A%2F%2Flocalhost%3A3000%22%2C%22SNM%22%3A%22come-on%22%2C%22SIC%22%3A%22https%3A%2F%2Fk.kakaocdn.net%2F14%2Fdn%2FbtrJlP3inQV%2FBAvaWgrJv8EuDsNcC3zKGK%2Fo.jpg%22%2C%22L%22%3A%7B%22LPC%22%3A%22http%3A%2F%2Flocalhost%3A3000%22%2C%22LMO%22%3A%22http%3A%2F%2Flocalhost%3A3000%22%7D%2C%22SL%22%3A%7B%22LPC%22%3A%22http%3A%2F%2Flocalhost%3A3000%22%2C%22LMO%22%3A%22http%3A%2F%2Flocalhost%3A3000%22%7D%2C%22VA%22%3A%226.0.0%22%2C%22VI%22%3A%225.9.8%22%2C%22VW%22%3A%222.5.1%22%2C%22VM%22%3A%222.2.0%22%2C%22FW%22%3Atrue%2C%22RF%22%3A%22out-client%22%7D%2C%22C%22%3A%7B%22THC%22%3A3%2C%22THL%22%3A%5B%7B%22TH%22%3A%7B%22THU%22%3A%22http%3A%2F%2Fk.kakaocdn.net%2Fdn%2FzfV1w%2FbtrKF6CdBQU%2FnIQ6wyp3Jwesoy2ymv0Dzk%2Fkakaolink40_original.jpg%22%2C%22W%22%3A264%2C%22H%22%3A130%7D%7D%5D%2C%22PR%22%3A%7B%22TD%22%3A%7B%22T%22%3A%22SundayRyan%22%7D%2C%22TH%22%3A%7B%22THU%22%3A%22http%3A%2F%2Fk.kakaocdn.net%2Fdn%2FchGw95%2FbtqB1iEIvnj%2FDsLBgTAIkdAf9iUqUbhGB1%2Fkakaolink40_original.png%22%2C%22W%22%3A200%2C%22H%22%3A200%7D%7D%2C%22TI%22%3A%7B%22TD%22%3A%7B%22T%22%3A%22%EB%9D%BC%EC%9D%B4%EC%96%B8%EC%9D%B4%20%EC%A6%90%EA%B2%A8%EB%A8%B9%EB%8D%98%20%EB%B0%94%EB%A1%9C%20%EA%B7%B8%20%ED%8B%B4%EC%BC%80%EC%9D%B4%EC%8A%A4%20%EC%B9%98%EC%A6%88%EB%B3%BC%22%2C%22D%22%3A%22%EB%B0%94%EB%9D%BC%EB%A7%8C%20%EB%B4%90%EB%8F%84%20%EC%A6%90%EA%B1%B0%EC%9B%8C%EC%A7%80%EB%8A%94%20%ED%9E%90%EB%A7%81%20%ED%8C%A8%ED%82%A4%EC%A7%80%EC%97%90%EB%8A%94%20%EC%8B%9C%ED%81%AC%EB%A6%BF%20%EC%8A%A4%ED%86%A0%EB%A6%AC%EA%B0%80%20%EC%88%A8%EC%96%B4%EC%9E%88%EC%96%B4%EC%9A%94.%22%7D%7D%2C%22SO%22%3A%7B%22LK%22%3A286%2C%22CM%22%3A45%2C%22SH%22%3A845%7D%2C%22BUL%22%3A%5B%7B%22BU%22%3A%7B%22T%22%3A%22%EC%9E%90%EC%84%B8%ED%9E%88%20%EB%B3%B4%EA%B8%B0%22%2C%22SR%22%3A%22both%22%7D%7D%5D%7D%7D&template_args=%7B%7D&template_id=82080"
      id="kakao-link-btn"
    >
      카카오톡으로 공유하기
    </a>
  )
}

export default KakaoShare
