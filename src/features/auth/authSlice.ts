import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { RootState } from "store"
import {
  CookieName,
  removeCookie,
  trueCallBack,
  encryptCookie,
  encryptedParamConversionToObj,
} from "utils"

export interface AuthSliceState {
  isloggedin: boolean
  status: "idle" | "pending" | "succeeded" | "failed"
}

const initialState: AuthSliceState = {
  status: "idle",
  isloggedin: false,
}

export const tokenValidation = createAsyncThunk<
  string,
  string,
  { state: RootState }
>(
  "auth/tokenValidation",

  /**
   * authData 매개변수에 두가지 경우가 들어온다.
   *  1. 로그인API파라미터로 받아오는 token.
   *  2. 저장된 토큰쿠키를 조회하여 받아오는 token.
   * 서버에는 항상 올바른 토큰만을 전송하게끔 해야한다.
   * 토큰 만료 등 정상적인 현상은 상관없다.
   *
   * 토큰 쿠키를 복호화 시키면 token, expiry 값이 들어있다.
   */

  // FINISH: 서버API타입정의하기 [v]
  // FINISH: 요청 중복 방지 처리 [v]
  // FINISH: token 값이 없다면 에러 디스패치 [v]
  // 에러 디스패치 조건 -> 암호화된 쿠키값이 변조되었을때.
  // TODO: 토큰 만료 처리 [] -> 만료되면 서버로 보내지 말기
  //  1.TODO: 토큰이 만료되었다면 토큰 재발급 API 전송 []
  //  2.TODO: 토큰 만료 비교 함수 만들기 []

  async (authData: string, { rejectWithValue }) => {
    trueCallBack(!authData, () =>
      rejectWithValue("암호화 쿠키가 존재하지 않거나 변조됨.")
    )

    return (await new Promise((resolve) => {
      // 해당 로직에서 서버로 토큰 전송
      setTimeout(() => {
        resolve(authData)
      }, 500)
    })) as string
  },
  {
    condition: (_, { getState }) => {
      const {
        auth: { status },
      } = getState()
      if (status === "pending" || status === "succeeded") return false
      return true
    },
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedIn: (state) => {
      state.isloggedin = true
    },
    loggedOut: (state) => {
      removeCookie(CookieName.auth)
      state.status = "idle"
      state.isloggedin = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(tokenValidation.pending, (state) => {
      const paramObj = encryptedParamConversionToObj()
      console.log("복호화된 객체:", paramObj)
      state.status = "pending"
    })
    /**
     * 유효한 토큰값이 들어올것을 기대한다.
     * 해당 토큰값을 암호화 시킨다.
     */
    builder.addCase(tokenValidation.fulfilled, (state, action) => {
      encryptCookie(CookieName.auth, action.payload)
      state.status = "succeeded"
      state.isloggedin = true
    })
    builder.addCase(tokenValidation.rejected, (state) => {
      removeCookie(CookieName.auth)
      state.status = "failed"
      state.isloggedin = false
    })
  },
})

export const { loggedIn, loggedOut } = authSlice.actions

export const stateAuth = (state: RootState): AuthSliceState => state.auth

export default authSlice.reducer
