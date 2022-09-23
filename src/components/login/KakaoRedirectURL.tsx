import React, { useEffect } from "react"

import { Url } from "types/auth"
import useAuth from "hooks/auth/useAuth"
import KakaoIcon from "assets/nav/KakaoIcon"
import { Login } from "types/API/auth-service"
import useNavigateUrl from "hooks/auth/useNavigateUrl"
import { ThemeLoadingButton } from "components/common/Buttons"

const { KAKAO, REDIRECT_URI } = Login
const { REACT_APP_CLIENT_URL: CLIENT, REACT_APP_SERVER_URL: SERVER } =
  process.env
const KAKAO_LOGIN = `${SERVER}/oauth2/authorize/${KAKAO}?redirect_uri=${CLIENT}${REDIRECT_URI}`

/**
 * @returns 카카오 로그인 페이지로 리다이렉트 된다.
 */

const KakaoRedirectURL = (): JSX.Element => {
  const { goUrl } = useNavigateUrl()
  const {
    LoginStatus: { isloggedin },
  } = useAuth()
  useEffect(() => {
    return isloggedin
      ? goUrl({ url: Url.home })
      : window.location.replace(KAKAO_LOGIN)
  }, [isloggedin, goUrl])

  return (
    <ThemeLoadingButton
      loading
      fullWidth
      variant="outlined"
      loadingPosition="start"
      startIcon={<KakaoIcon />}
    >
      Redirecting...
    </ThemeLoadingButton>
  )
}

export default KakaoRedirectURL
