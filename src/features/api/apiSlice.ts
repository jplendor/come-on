/* eslint-disable import/prefer-default-export */
import type {
  FetchArgs,
  BaseQueryFn,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import { encryptedCookieConvToParamObj } from "utils"

const baseQuery = fetchBaseQuery({
  baseUrl: "/",
  prepareHeaders: (header) => {
    const { token } = encryptedCookieConvToParamObj()
    if (token) header.set("Authorization", `Bearer ${token}`)
    return header
  },
})

// TODO: 토큰 만료 처리 [] -> 만료되면 서버로 보내지 말기
//  1.TODO: 토큰이 만료되었다면 토큰 재발급 API 전송 []
//  2.TODO: 토큰 만료 비교 함수 만들기 []
//  토큰만료됐는지 파악 -> 만료됨 -> 토큰 재발급 API -> 토큰 검즘 API

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions)

  // const { token, expiry } = encryptedCookieConversionToParamObj()
  // const refreshResult = await baseQuery(
  //   {
  //     url: "/auth/reissue",
  //     method: "POST",
  //   },
  //   api,
  //   extraOptions
  // )

  // console.log(refreshResult.error)
  // if (refreshResult.data) {
  //   console.log(api)
  // }

  return result
}

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
  endpoints: () => ({}),
})
