import { api } from "features/api/apiSlice"
import type {
  AddCourseRes,
  CourseListRes,
  ExceptionRes,
  GetCourseListQS,
  GetMyCourseListQS,
  MyCoursesRes,
  OptionalQueryString,
} from "types/API/course-service"

const courseApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    addCourse: builder.mutation<AddCourseRes | ExceptionRes, FormData>({
      query: (course) => ({
        url: "/courses",
        method: "POST",
        body: course,
      }),
      invalidatesTags: ["Course"],
    }),
    getCourseList: builder.query<CourseListRes | ExceptionRes, GetCourseListQS>(
      {
        query: ({
          page = "0",
          size = "10",
          title = "",
          lat = "",
          lng = "",
        }) => ({
          url: `/courses?page=${page}&size=${size}&title=${title}&lat=${lat}&lng=${lng}`,
          method: "GET",
        }),
        providesTags: ["Course"],
      }
    ),
    getMyCourseList: builder.query<
      MyCoursesRes | ExceptionRes,
      GetMyCourseListQS
    >({
      query: ({ courseStatus, page = "0", size = "10" }) => ({
        url: `/courses/my?courseStatus=${courseStatus}&page=${page}&size=${size}`,
        method: "GET",
      }),
      providesTags: ["Course"],
    }),
    getCourseLikeList: builder.query<
      MyCoursesRes | ExceptionRes,
      OptionalQueryString
    >({
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
  useGetCourseListQuery,
  useGetMyCourseListQuery,
  useGetCourseLikeListQuery,
} = courseApiSlice
