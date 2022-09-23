/* eslint-disable import/prefer-default-export */
import { api } from "features/api/apiSlice"
import { ModifyNameResponse, MydetailResponse } from "types/API/user-service"

export const userApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    myDetial: builder.query<MydetailResponse, void>({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    modifyName: builder.mutation<ModifyNameResponse, string>({
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
