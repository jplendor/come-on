import { Alert } from "@mui/material"
import React from "react"

import { Route, Routes } from "react-router-dom"

import Login from "./Login"
import RequireAuth from "./RequireAuth"
import Verification from "./Verification"

/**
 * Auth 프로세스 (권한이 없을때) :
 * 권한이 필요한 페이지 -> RequireAuth -> (/auth/login) -> 로그인  -> Verification (토큰검증)
 * -> 토큰 암호화 -> 토큰쿠키발행 -> 권한이 필요한 페이지
 *
 * 서버로 토큰을 전송하기 때문에 어차피 서버쪽에서 검증 작업을 한다.
 * 그렇기 때문에 여기서 또 검증작업을 할 이유가 없다.
 * Auth 프로세스 (권한이 있을때) :
 * 권한이 필요한 페이지 -> RequireAuth -> 권한이 필요한 페이지
 */

// FINISH: 로그인 라우터 구성 [v]
//  - login - 로그인 시도할수있는 페이지 [v]
//  - login-verification - 외부 요청을 받고 토큰을 받을수있는 페이지 [v]
// FINISH: 로그인 상태인지 파악하는 글로벌 상태 받아오기 [v]
// FINISH: 이미 로그인 된 상태라면 메인 페이지로 리다이렉트 시키기 ('/') [v]
// FINISH: 로그인 권한이 필요한 시점이 있다면 로그인 페이지로 리다이렉트 시키기 [v]
//  * 페이지가 리다이렉트 되면서 권한이 필요했던 시점의 링크 상태가 날라간다 이에 맞는 솔루션이 필요
// FINISH: 화면에 최초진입시 혹은 새로고침시 로그인 상태인지 파악하기 [v]
//  -  로그인 상태 보여주기 [v]
//  -  로그인 상태 유지하기 [v]

const Auth = (): JSX.Element => {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="login" element={<Login />} />
      <Route path="login-verification" element={<Verification />} />
      {/* 추후 삭제할 임시 페이지 */}
      <Route
        path="test-needed-token"
        element={
          <RequireAuth>
            <Alert severity="success">
              로그인 성공했을때만 보여주는 페이지1
            </Alert>
          </RequireAuth>
        }
      />
      <Route
        path="test-needed-token2"
        element={
          <RequireAuth>
            <Alert severity="success">
              로그인 성공했을때만 보여주는 페이지2
            </Alert>
          </RequireAuth>
        }
      />
    </Routes>
  )
}

export default Auth
