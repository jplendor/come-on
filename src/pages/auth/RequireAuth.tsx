import React from "react"
import { Navigate, useLocation } from "react-router-dom"

import { conversionToUrl } from "utils"
import useAuth from "hooks/auth/useAuth"
import { RequireAuthProps, Url } from "types/auth"

/**
 * 유저 권한이 있는지 없는지 검증하고 유효한 토큰값이 없다면
 *
 * 로그인 페이지로 리다이렉트 시킨다.
 *
 * @param children 로그인 권한이 있으면 해당 컴포넌트를 렌더링 시킨다.
 */

const RequireAuth = ({ children }: RequireAuthProps): JSX.Element => {
  const location = useLocation()
  const {
    LoginStatus: { isloggedin },
  } = useAuth()

  if (!isloggedin)
    return (
      <Navigate
        to={Url.login}
        state={{
          from: {
            pathname: conversionToUrl(location, ["pathname"]),
          },
        }}
        replace
      />
    )

  return children
}

export default RequireAuth
