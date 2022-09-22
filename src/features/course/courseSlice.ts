import { api } from "features/api/apiSlice"
import type {
  AddCourseResponse,
  GetMyCourseListQS,
  MyCoursesResponse,
  OptionalQueryString,
} from "types/API/course-service"

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
    getMyCourseList: builder.query<MyCoursesResponse, GetMyCourseListQS>({
      query: ({ courseStatus, page = "0", size = "10" }) => ({
        url: `/courses/my?courseStatus=${courseStatus}&page=${page}&size=${size}`,
        method: "GET",
      }),
      providesTags: ["Course"],
    }),
    getCourseLikeList: builder.query<MyCoursesResponse, OptionalQueryString>({
      query: ({ page = "0", size = "10" }) => ({
        url: `/courses/like?page=${page}&size=${size}`,
        method: "GET",
      }),
      providesTags: ["Course"],
    }),
  }),
})

export const {
  useAddCourseMutation,
  useGetMyCourseListQuery,
  useGetCourseLikeListQuery,
} = courseApiSlice
