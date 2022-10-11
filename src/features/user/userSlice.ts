/* eslint-disable import/prefer-default-export */
import { api } from "features/api/apiSlice"
import {
  MydetailRes,
  ExceptionRes,
  ModifyNameRes,
  SaveProfileImageRes,
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
      invalidatesTags: ["Course", "User"],
    }),
    profileUpload: builder.mutation<
      SaveProfileImageRes | ExceptionRes,
      FormData
    >({
      query: (img) => ({
        url: "/profile-image",
        method: "POST",
        body: img,
      }),
      invalidatesTags: ["User"],
    }),
  }),
})

export const {
  useMyDetialQuery,
  useModifyNameMutation,
  useProfileUploadMutation,
  endpoints: { myDetial },
} = userApiSlice
