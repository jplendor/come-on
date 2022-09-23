/* eslint-disable import/prefer-default-export */
import { api } from "features/api/apiSlice"
import {
  MydetailRes,
  ExceptionRes,
  ModifyNameRes,
} from "types/API/user-service"

export const userApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    myDetial: builder.query<MydetailRes | ExceptionRes, void>({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    modifyName: builder.mutation<ModifyNameRes | ExceptionRes, string>({
      query: (name) => ({
        url: "/users/me",
        method: "PATCH",
        body: {
          nickname: name,
        },
      }),
      invalidatesTags: ["User", "Course"],
    }),
  }),
})

export const {
  useMyDetialQuery,
  useModifyNameMutation,
  endpoints: { myDetial },
} = userApiSlice
