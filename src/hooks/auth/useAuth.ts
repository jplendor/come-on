/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CookieName, decryptCookie } from "utils"
import {
  loggedIn,
  loggedOut,
  stateAuth,
  tokenValidation,
} from "features/auth/authSlice"
import { useAppDispatch, useAppSelector } from "hooks/redux/useRedux"

const useAuth = () => {
  const dispatch = useAppDispatch()
  const LoginStatus = useAppSelector(stateAuth)
  const loggedInDispatch = () => dispatch(loggedIn())
  const loggedOutDispatch = () => dispatch(loggedOut())

  /**
   * @param token 검증할 토큰값을 인자로 넣어줍니다.
   * 인자를 넘기지 않는다면 ENCRYPT_TOKEN 쿠키를 조회하여 값을 할당합니다.
   */

  // 토큰을 전달하지 않는 경우가 있는가? -> Yes
  // 어떤경우에? -> 토큰쿠키를 갖고있다고 판단될때

  const dispatchTokenValidation = (
    token: string = decryptCookie(CookieName.auth)
  ) => {
    dispatch(tokenValidation(token))
  }

  return {
    LoginStatus,
    loggedInDispatch,
    loggedOutDispatch,
    dispatchTokenValidation,
  }
}

export default useAuth
