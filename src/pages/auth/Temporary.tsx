import React from "react"
import { Button } from "@mui/material"
import { Link } from "react-router-dom"

import useAuth from "hooks/auth/useAuth"

/**
 * Auth 테스트용 임시 컴포넌트. **추후 삭제 예정**
 */

const Temporary = (): JSX.Element => {
  const { LoginStatus, loggedOutDispatch, loggedInDispatch } = useAuth()
  const { isloggedin } = LoginStatus
  return (
    <>
      {isloggedin ? (
        <div>
          <h1>로그인됨</h1>
          <Button onClick={() => loggedOutDispatch()} variant="contained">
            로그아웃
          </Button>
        </div>
      ) : (
        <h1>
          <Link to="/auth/login">로그인 페이지 가기(비로그인)</Link>
        </h1>
      )}
      <Link to="/auth/test-needed-token">로그인권한이 필요한 링크</Link>
      <br />
      <Link to="/auth/test-needed-token2">로그인권한이 필요한 링크2</Link>
      <br />
      <Link to="/auth/login">로그인 페이지 가기</Link> <br />
      <Link to="/">홈</Link>
      <button type="button" onClick={() => loggedInDispatch()}>
        권한 얻기
      </button>
    </>
  )
}

export default Temporary
