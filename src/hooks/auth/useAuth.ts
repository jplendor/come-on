/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CookieName, getCookie } from "utils"
import {
  loggedIn,
  stateAuth,
  authApiSlice,
  tokenValidation,
} from "features/auth/authSlice"
import { useAppDispatch, useAppSelector } from "hooks/redux/useRedux"

const useAuth = () => {
  const dispatch = useAppDispatch()
  const LoginStatus = useAppSelector(stateAuth)
  const loggedInDispatch = () => dispatch(loggedIn())
  const loggedOutDispatch = () =>
    dispatch(authApiSlice.endpoints.logout.initiate(undefined))

  /**
   * @param encryptedText 암호화된 텍스트를 전달합니다.
   * 인자를 넘기지 않는다면 ENCRYPT_TOKEN 쿠키를 조회하여 값을 할당합니다.
   */

  // 암호화된 텍스트를 전달하지 않는 경우가 있는가? -> Yes
  // 어떤경우에? -> 암호화쿠키를 갖고있다고 판단될때

  const dispatchTokenValidation = (
    encryptedText: string = getCookie(CookieName.auth)
  ) => dispatch(tokenValidation(encryptedText))

  return {
    LoginStatus,
    loggedInDispatch,
    loggedOutDispatch,
    dispatchTokenValidation,
  }
}

export default useAuth
