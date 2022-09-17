/* eslint-disable import/prefer-default-export */
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { CourseId } from "types/API/course-service"
import { api } from "features/api/apiSlice"
import { ServerResponse } from "http"

// 사실은 서비스 느낌

export const courseApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCourseList: builder.mutation<ServerResponse, void>({
      query: () => ({
        url: "/courses",
        method: "POST",
        body: "",
      }),
    }),
  }),
})

export const { useGetCourseListMutation } = courseApi
// why?
export default courseApi.reducer
