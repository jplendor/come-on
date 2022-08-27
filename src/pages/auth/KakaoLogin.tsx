import React, { useState } from "react"

import RedirectURL from "./RedirectURL"

/**
 * 서버에 kakao API를 보내기 위해 특정 URL로 전송시키고 token을 받아온다.
 * 받은 토큰은 /auth/login-api 링크로 전송된다.
 */

const KakaoLogin = (): JSX.Element => {
  const [isClick, setIsClick] = useState(false)
  const onClickHandler = (): void => setIsClick(true)

  if (isClick)
    return (
      // 추후에 서버에서 제공하는 로그인 API 경로를 전달한다.
      // eslint-disable-next-line max-len
      <RedirectURL url="http://localhost:3000/auth/login-verification?token=0xe10742928d01ac23eab87a6c6e2ef90" />
    )

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
