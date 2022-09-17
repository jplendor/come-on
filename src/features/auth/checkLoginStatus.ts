import { store } from "store"
import { CookieName, getCookie } from "utils"

import { loggedIn, tokenValidation } from "./authSlice"

// 짧은 깜빡임 현상을 없애기 위해서 index.ts 파일에서 액션을 디스패치한다. (UX 높이기)
// useEffect 내에서 처리하면 컴포넌트가 한 번 렌더링 된 이후에 실행되면서 깜빡임 현상이 나온다.
// 토큰 쿠키가 있다면 우선은 로그인 가능한 상태로 상태를 변경해 준다.
// 그리고 정말 해당 토큰 쿠키가 올바른지 검증작업을 거친다.

const checkLoginStatus = (): void => {
  const encryptedText = getCookie(CookieName.auth)
  if (!encryptedText) return
  store.dispatch(loggedIn())
  store.dispatch(tokenValidation(encryptedText))
}

export default checkLoginStatus
