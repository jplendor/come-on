import React, { useEffect } from "react"

import { Url } from "types/auth"
import { conversionToUrl } from "utils"
import useAuth from "hooks/auth/useAuth"
import useUrlRoute from "hooks/auth/useUrlRoute"
import useSavePath from "hooks/auth/useSavePath"
import useSearchParamByToken from "hooks/auth/useSearchParamByToken"

/**
 * 해당 페이지에 토큰이 들어올것이라고 기대한다.
 *
 * 토큰이 들어왔을때 대처와 토큰이 들어오지 않았을때 대처가 필요하다.
 *
 * 토큰은 파라미터로 들어온다.
 *
 * 파라미터로 들어오기 때문에 올바른 토큰인지 검증이 필요하다
 *
 * **기존에 로그인이 필요했던 시점으로 다시 돌려보내야한다. (사용자 경험 높이기)**
 */

// FINISH: 토큰이 들어왔는지 식별하고 추출하기 [v]
// TODO: 토큰 검증 (서버) []
// FINISH: 추출된 토큰을 쿠키에 저장 [v]
// FINISH: 모든 처리가 끝나면 방문하려던 페이지로 다시 이동시키기 [v]

// 쿠키를 외부에 노출되어도 key가 없으면 해독할수없게 하고싶다.
// cookie -> 암호화 -> 암호화된 쿠키
// 암호화된 쿠키 -> 복호화 -> cookie

// FINISH: 암호화 함수 만들기  [v]
// FINISH: 복호화 함수 만들기  [v]
// FINISH: 토큰 검증 로직 작성 [v]

const Verification = (): JSX.Element => {
  const { urlRoute } = useUrlRoute()
  const { dispatchTokenValidation, LoginStatus } = useAuth()
  const { getTokenParam, removeTokenParam } = useSearchParamByToken()
  const { getPreviousPathName, removePreviousPathName } = useSavePath()

  useEffect(() => {
    const token = getTokenParam()
    if (token) {
      removeTokenParam()
      dispatchTokenValidation(token)
    }
  }, [dispatchTokenValidation, getTokenParam, removeTokenParam])

  useEffect(() => {
    urlRoute(LoginStatus, ({ status, isloggedin }, go) => {
      go(status === "failed", Url.home)
      go(
        isloggedin === true,
        conversionToUrl(getPreviousPathName(), ["from", "pathname"])
      )
    })
    return () => removePreviousPathName()
  }, [urlRoute, LoginStatus, getPreviousPathName, removePreviousPathName])

  return <div />
}

export default Verification
