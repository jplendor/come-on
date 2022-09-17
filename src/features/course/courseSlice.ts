import { api } from "features/api/apiSlice"
import { AddCourseResponse, MyCoursesResponse } from "types/API/course-service"

const courseApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    addCourse: builder.mutation<AddCourseResponse, FormData>({
      query: (course) => ({
        url: "/courses",
        method: "POST",
        body: course,
      }),
      invalidatesTags: ["Course"],
    }),
    getMyCourseList: builder.query<MyCoursesResponse, void>({
      query: () => ({
        url: "/courses/my",
        method: "GET",
      }),
      providesTags: ["Course"],
    }),
  }),
})

export const { useAddCourseMutation, useGetMyCourseListQuery } = courseApiSlice
