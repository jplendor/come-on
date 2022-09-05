import React, { useState } from "react"

import { Login } from "types/API"
import RedirectURL from "./RedirectURL"

/**
 * 서버에 kakao API를 보내기 위해 특정 URL로 전송시키고 token을 받아온다.
 * 받은 토큰은 /auth/login-verification 링크로 전송된다.
 */

const { KAKAO, REDIRECT_URI } = Login
const CLIENT = process.env.REACT_APP_CLIENT_URL
const SERVER = process.env.REACT_APP_SERVER_URL

const KakaoLogin = (): JSX.Element => {
  const [isClick, setIsClick] = useState(false)
  const onClickHandler = (): void => setIsClick(true)
  const KAKAO_LOGIN = `${SERVER}/oauth2/authorize/${KAKAO}?redirect_uri=${CLIENT}${REDIRECT_URI}`
  if (isClick) return <RedirectURL url={KAKAO_LOGIN} />
  return (
    <>
      <div>카카오 로그인 페이지</div>
      <button type="button" onClick={onClickHandler}>
        카카오 버튼
      </button>
    </>
  )
}

export default KakaoLogin
