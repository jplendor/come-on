import type {
  FetchArgs,
  BaseQueryFn,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import {
  isTimeExpired,
  setReissueTokenCookie,
  encryptedCookieConvToParamObj as getTokenCookie,
} from "utils"
import { ReissueRes } from "types/API/auth-service"

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_SERVER_URL,
  prepareHeaders: (header) => {
    const { token } = getTokenCookie()
    if (token) header.set("Authorization", `Bearer ${token}`)
    return header
  },
})

// FINISH: 토큰 만료 처리 [v]
//  1.FINISH: 토큰이 만료되었다면 토큰 재발급 API 전송 [v]
//  2.FINISH: 토큰 만료 비교 함수 만들기 [v]
//  토큰만료됐는지 파악 -> 만료됨 -> 토큰 재발급 API -> 기존에 요청했던 API 요청 재개

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  // 토큰이 만료됐을때
  if (isTimeExpired(result.meta?.request.url)) {
    const refreshResult = await baseQuery(
      {
        url: "/auth/reissue",
        method: "POST",
        credentials: "include",
      },
      api,
      extraOptions
    )
    if (refreshResult.data)
      setReissueTokenCookie(refreshResult.data as ReissueRes)

    result = await baseQuery(args, api, extraOptions)
  }

  return result
}

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Course", "Meeting", "CourseId"],
  endpoints: () => ({}),
})
