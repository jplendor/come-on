import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type {
  ReissueRes,
  ExceptionRes,
  TokenValidationRes,
} from "types/API/auth-service"
import {
  setCookie,
  CookieName,
  removeCookie,
  setReissueTokenCookie,
  encryptedTextConvToParamObj,
} from "utils"
import { RootState } from "store"
import { api } from "features/api/apiSlice"
import { myDetial } from "features/user/userSlice"
import { MydetailRes } from "types/API/user-service"
import { LocalstorageName, SliceStatus } from "types/auth"

export interface ProfileImg {
  id: number
  imageUrl: string
}

export interface User {
  userId: number
  role: string
  profileImg: ProfileImg
}

interface AuthSliceState extends SliceStatus {
  isloggedin: boolean
  user: User
}

const initialImg: ProfileImg = {
  id: 0,
  imageUrl: "",
}

const initialUserState: User = {
  userId: 0,
  role: "",
  profileImg: initialImg,
}

const initialState: AuthSliceState = {
  isloggedin: false,
  status: "idle",
  user: initialUserState,
}

export const authApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    validation: builder.query<TokenValidationRes | ExceptionRes, string>({
      query: (token) => ({
        url: "/auth/validate",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    reissue: builder.query<ReissueRes | ExceptionRes, void>({
      query: () => ({
        url: "/auth/reissue",
        method: "POST",
        credentials: "include",
      }),
    }),
  }),
})

export const {
  endpoints: { validation, reissue },
} = authApiSlice

export const tokenValidation = createAsyncThunk<
  TokenValidationRes,
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

  async (encryptedText, { rejectWithValue, dispatch }) => {
    const { token } = encryptedTextConvToParamObj(encryptedText)
    const { data: validationData, isError } = await dispatch(
      validation.initiate(token)
    )
    if (isError) return rejectWithValue(validationData as ExceptionRes)
    setCookie(CookieName.auth, encryptedText)
    await dispatch(myDetial.initiate())
    return validationData as TokenValidationRes
  },
  {
    condition: (_state, { getState }) => {
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
      const img = localStorage.getItem(LocalstorageName.Img)
      if (img) state.user.profileImg = JSON.parse(img)
      state.isloggedin = true
    },
  },
  extraReducers: (builder) => {
    builder.addCase(tokenValidation.pending, (state) => {
      state.status = "pending"
    })
    builder.addCase(tokenValidation.fulfilled, (state) => {
      state.isloggedin = true
      state.status = "succeeded"
    })
    builder.addCase(tokenValidation.rejected, (state) => {
      removeCookie(CookieName.auth)
      state.isloggedin = false
      state.status = "failed"
      state.user = initialUserState
    })
    builder.addMatcher(myDetial.matchFulfilled, (state, { payload }) => {
      const {
        data: { userId, role, profileImg },
      } = payload as MydetailRes
      state.user = {
        userId,
        role,
        profileImg: profileImg || initialImg,
      }
      localStorage.setItem(
        LocalstorageName.Img,
        JSON.stringify(profileImg || "")
      )
    })
    builder.addMatcher(myDetial.matchRejected, (state) => {
      if (state.isloggedin === false) state.user = initialUserState
    })
    builder.addMatcher(reissue.matchFulfilled, (_state, { payload }) => {
      setReissueTokenCookie(payload as ReissueRes)
    })
  },
})

export const { loggedIn } = authSlice.actions

export const stateAuth = (state: RootState): AuthSliceState => state.auth

export default authSlice.reducer
