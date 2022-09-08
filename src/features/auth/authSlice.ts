import { isObject } from "@fxts/core"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import type {
  ServerResponse,
  ExceptionResponse,
  TokenValidationResponse,
} from "types/API/auth-service"
import {
  setCookie,
  CookieName,
  removeCookie,
  pullingProperty,
  encryptedTextConvToParamObj,
} from "utils"
import { RootState } from "store"
import { api } from "features/api/apiSlice"

interface AuthSliceState {
  userId: string
  isloggedin: boolean
  status: "idle" | "pending" | "succeeded" | "failed"
}

interface ReturnType {
  userId: string
  encryptedText: string
}

const initialState: AuthSliceState = {
  userId: "",
  isloggedin: false,
  status: "idle",
}

export const authApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    validation: builder.query<ServerResponse, string>({
      query: (token) => ({
        url: "/auth/validate",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    logout: builder.query<ServerResponse, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    reissue: builder.query<ServerResponse, void>({
      query: () => ({
        url: "/auth/reissue",
        method: "POST",
      }),
    }),
  }),
})

const {
  endpoints: { validation, logout },
} = authApiSlice

export const tokenValidation = createAsyncThunk<
  ReturnType,
  string,
  { state: RootState }
>(
  "auth/tokenValidation",

  /**
   * encryptedText 매개변수에 두가지 경우가 들어온다.
   *  1. 로그인API파라미터로 받아오는 encryptedText.
   *  2. 저장된 토큰쿠키를 조회하여 받아오는 encryptedText.
   * 서버에는 항상 올바른 토큰만을 전송하게끔 해야한다.
   * 토큰 만료 등 정상적인 현상은 상관없다.
   *
   * 토큰 쿠키를 복호화 시키면 token, expiry, userId 값이 들어있다.
   */

  // FINISH: 서버API타입정의하기 [v]
  // FINISH: 요청 중복 방지 처리 [v]
  // FINISH: token 값이 없다면 에러 디스패치 [v]
  // 에러 디스패치 조건 -> 암호화된 쿠키값이 변조되었을때.

  async (encryptedText: string, { rejectWithValue, dispatch }) => {
    const { token } = encryptedTextConvToParamObj(encryptedText)
    const { data, isError } = await dispatch(validation.initiate(token))
    if (isError) return rejectWithValue(data as ExceptionResponse)
    const userId = pullingProperty(data as TokenValidationResponse, [
      "data",
      "userId",
    ])
    return {
      encryptedText,
      userId: isObject(userId) ? "null" : userId,
    }
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
  },
  extraReducers: (builder) => {
    builder.addCase(tokenValidation.pending, (state) => {
      state.status = "pending"
    })
    builder.addCase(
      tokenValidation.fulfilled,
      (state, { payload: { encryptedText, userId } }) => {
        setCookie(CookieName.auth, encryptedText)
        state.userId = userId
        state.isloggedin = true
        state.status = "succeeded"
      }
    )
    builder.addCase(tokenValidation.rejected, (state) => {
      removeCookie(CookieName.auth)
      state.isloggedin = false
      state.status = "failed"
    })
    builder.addMatcher(logout.matchFulfilled, (state) => {
      removeCookie(CookieName.auth)
      state.isloggedin = false
    })
    builder.addMatcher(logout.matchRejected, (state) => {
      state.isloggedin = false
    })
  },
})

export const { loggedIn } = authSlice.actions

export const stateAuth = (state: RootState): AuthSliceState => state.auth

export default authSlice.reducer
