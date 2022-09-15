/* eslint-disable import/prefer-default-export */
import { api } from "features/api/apiSlice"
import { MydetailResponse } from "types/API/user-service"

export const userApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    myDetial: builder.query<MydetailResponse, void>({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
})

export const {
  useMyDetialQuery,
  endpoints: { myDetial },
} = userApiSlice
