import React, { useState } from "react"
import KakaoIcon from "assets/nav/KakaoIcon"
import KakaoRedirectURL from "components/login/KakaoRedirectURL"
import { KakaoBtnText, ThemeKaKaoButton } from "components/login/KakaoLogin"

/**
 * 서버에 kakao API를 보내기 위해 특정 URL로 전송시키고 token을 받아온다.
 * 받은 토큰은 /auth/login-verification 링크로 전송된다.
 */

const KakaoLogin = (): JSX.Element => {
  const [isClick, setIsClick] = useState(false)
  const onClickHandler = (): void => setIsClick(true)
  if (isClick) return <KakaoRedirectURL />
  return (
    <ThemeKaKaoButton
      fullWidth
      disableElevation
      onClick={onClickHandler}
      startIcon={<KakaoIcon />}
    >
      <KakaoBtnText>카카오 1초 로그인/회원가입</KakaoBtnText>
    </ThemeKaKaoButton>
  )
}

export default KakaoLogin
