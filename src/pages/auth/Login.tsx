import React, { useEffect } from "react"
import { useLocation } from "react-router-dom"

import { useDidMount } from "rooks"
import { Location } from "types/auth"
import { conversionToUrl } from "utils"
import useAuth from "hooks/auth/useAuth"
import useSavePath from "hooks/auth/useSavePath"
import useUrlRoute from "hooks/auth/useUrlRoute"

import KakaoLogin from "./KakaoLogin"
import SocialLogin from "./SocialLogin"

const Login = (): JSX.Element => {
  const location = useLocation()
  const { LoginStatus } = useAuth()
  const { urlRoute } = useUrlRoute()
  const { getPreviousPathName, setPreviousPathName, removePreviousPathName } =
    useSavePath()

  useDidMount(() => {
    setPreviousPathName({
      from: {
        pathname: conversionToUrl(location as Location, [
          "state",
          "from",
          "pathname",
        ]),
      },
    })
  })

  useEffect(() => {
    urlRoute(LoginStatus, ({ isloggedin }, go) =>
      go(isloggedin === true, {
        url: conversionToUrl(getPreviousPathName(), ["from", "pathname"]),
      })
    )
    return () => removePreviousPathName()
  }, [urlRoute, LoginStatus, getPreviousPathName, removePreviousPathName])

  return (
    <main>
      <h1>유저 권한이 없습니다. 로그인 하세요</h1>
      <SocialLogin>
        <KakaoLogin />
      </SocialLogin>
    </main>
  )
}

export default Login
