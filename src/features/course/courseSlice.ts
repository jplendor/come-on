/* eslint-disable import/prefer-default-export */
import { api } from "features/api/apiSlice"
import {
  CourseIdResponse,
  CourseDetailResponse,
} from "types/API/course-service"
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type {
  MyCoursesRes,
  AddCourseRes,
  CourseListRes,
  GetCourseListQS,
  GetMyCourseListQS,
  OptionalQueryString,
  LikeCourseRes,
} from "types/API/course-service"

interface CoursePlaceState {
  courseDetails: {
    title: string
    description: string
    imgFile: string
  }
  coursePlaces: [
    {
      order: number
      name: string
      description: string
      lng: number // 경도 x
      lat: number // 위도 y
      apiId: number
      category: string
      id: number
      address: string
    }
  ]
}

interface CoursePlaceProps {
  order: number
  name: string
  description: string
  lng: number // 경도 x
  lat: number // 위도 y
  apiId: number
  category: string
  id: number
  address: string
}

interface CourseDetailProps {
  title: string
  description: string
  imgFile: string
}

const initialState: CoursePlaceState = {
  courseDetails: {
    title: "undefined",
    description: "",
    imgFile: "",
  },
  coursePlaces: [
    {
      id: 0,
      order: 0,
      name: "newName",
      description: "값을 입력해 주세요",
      lng: 38.05248142233915, // 경도 x
      lat: 127.65930674808553, // 위도 y
      apiId: 12346,
      category: "ETC",
      address: "",
    },
  ],
}

// 전체에 적용될 order값 설정

export const coursePlaceSlice = createSlice({
  name: "coursePlace",
  initialState,
  reducers: {
    addCoursePlace: (state, action: PayloadAction<CoursePlaceProps>): any => {
      if (state.coursePlaces[0].order === 0) {
        state.coursePlaces[0] = { ...action.payload, order: 1 }
      } else {
        state.coursePlaces.push({
          ...action.payload,
          order: state.coursePlaces.length + 1,
        })
      }
    },
    setCourseDetail: (state, action: PayloadAction<CourseDetailProps>): any => {
      state.courseDetails.title = action.payload.title
      state.courseDetails.description = action.payload.description
      state.courseDetails.imgFile = action.payload.imgFile
    },
  },
})

export const { addCoursePlace, setCourseDetail } = coursePlaceSlice.actions
export default coursePlaceSlice.reducer

export const courseApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addCourse: builder.mutation<AddCourseRes, FormData>({
      query: (course) => ({
        url: "/courses",
        method: "POST",
        body: course,
      }),
      invalidatesTags: ["Course"],
    }),
    getCourseList: builder.query<CourseListRes, GetCourseListQS>({
      query: (args) => ({
        url: `/courses`,
        method: "GET",
        params: { ...args },
      }),
      providesTags: ["Course"],
    }),
    getMyCourseList: builder.query<MyCoursesRes, GetMyCourseListQS>({
      query: (args) => ({
        url: `/courses/my`,
        method: "GET",
        params: { ...args },
      }),
      providesTags: ["Course"],
    }),
    getLikedCourseList: builder.query<
      MyCoursesRes,
      Partial<OptionalQueryString>
    >({
      query: (args) => ({
        url: `/courses/like`,
        method: "GET",
        params: { ...args },
      }),
      providesTags: ["Course"],
    }),
    clickLikeCourse: builder.mutation<LikeCourseRes, number>({
      query: (courseId) => ({
        url: `/courses/${courseId}/like`,
        method: "POST",
      }),
      invalidatesTags: ["Course"],
    }),
    getCourseDetail: builder.query<CourseDetailResponse, any>({
      query: ({ id }) => ({
        url: `/courses/${id}`,
        method: "GET",
      }),
    }),
    addCourseDetail: builder.mutation<CourseIdResponse, FormData>({
      query: (data) => ({
        url: "/courses",
        method: "POST",
        body: data,
      }),
    }),
    addCoursePlace: builder.mutation<CourseDetailResponse, any>({
      query: (data) => ({
        url: `/courses/${data.courseId}/course-places/batch`,
        method: "POST",
        body: data.postData,
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

export const { endpoints } = courseApi

export const {
  useAddCourseMutation,
  useGetCourseListQuery,
  useGetMyCourseListQuery,
  useGetLikedCourseListQuery,
  useClickLikeCourseMutation,
  useAddCourseDetailMutation,
  useAddCoursePlaceMutation,
  useGetCourseDetailQuery,
} = courseApi
