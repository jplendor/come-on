/* eslint-disable import/prefer-default-export */
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { CourseId, CourseData } from "types/API/course-service"
import { api } from "features/api/apiSlice"
import { ServerResponse } from "http"

// 사실은 서비스 느낌

export const courseApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCourseList: builder.query<ServerResponse, void>({
      query: () => ({
        url: "/courses",
      }),
    }),
    addCourse: builder.mutation<ServerResponse, FormData>({
      query: (data) => ({
        url: "/courses",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: any, meta, args): any => {
        console.log(
          "courseId : %d courseStatus : %s",
          response.data.courseId,
          response.data.courseStatus
        )
        return response.data.courseId
      },
    }),
  }),
})

export const { useGetCourseListQuery, useAddCourseMutation } = courseApi
// why?
export default courseApi.reducer
