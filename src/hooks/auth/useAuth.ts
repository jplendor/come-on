/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useCallback } from "react"
import { store } from "store"
import {
  CookieName,
  getCookie,
  removeCookie,
  isTimeExpired,
  encryptedCookieConvToParamObj as getTokenCookie,
} from "utils"
import {
  loggedIn,
  reissue,
  stateAuth,
  tokenValidation,
} from "features/auth/authSlice"
import { useAppDispatch, useAppSelector } from "hooks/redux/useRedux"

const { REACT_APP_CLIENT_URL: CLIENT_URL, REACT_APP_SERVER_URL: SERVER_URL } =
  process.env

const useAuth = () => {
  const dispatch = useAppDispatch()
  const LoginStatus = useAppSelector(stateAuth)
  const loggedInDispatch = useCallback(() => dispatch(loggedIn()), [dispatch])
  const loggedOutDispatch = async () => {
    if (isTimeExpired()) await store.dispatch(reissue.initiate())
    const { token } = getTokenCookie()
    const url = `${SERVER_URL}/oauth2/logout?token=${token}&redirect_uri=${CLIENT_URL}`
    removeCookie(CookieName.auth)
    // 카카오 로그아웃 url 이동.
    window.location.replace(url)
  }

  /**
   * @param encryptedText 암호화된 텍스트를 전달합니다.
   * 인자를 넘기지 않는다면 ENCRYPT_TOKEN 쿠키를 조회하여 값을 할당합니다.
   */

  // 암호화된 텍스트를 전달하지 않는 경우가 있는가? -> Yes
  // 어떤경우에? -> 암호화쿠키를 갖고있다고 판단될때

  const dispatchTokenValidation = useCallback(
    (encryptedText: string = getCookie(CookieName.auth)) =>
      dispatch(tokenValidation(encryptedText)),
    [dispatch]
  )

  return {
    LoginStatus,
    loggedInDispatch,
    loggedOutDispatch,
    dispatchTokenValidation,
  }
}

export default useAuth
