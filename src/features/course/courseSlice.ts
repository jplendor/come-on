/* eslint-disable import/prefer-default-export */
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { CourseId, CourseData } from "types/API/course-service"
import { api } from "features/api/apiSlice"
import { ServerResponse } from "http"
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../../app/store"

interface CoursePlaceState {
  index: number
  cateName: string
  placeName: string
  addressName: string
}

const initialState: CoursePlaceState = {
  index: -1,
  cateName: "",
  placeName: "",
  addressName: "",
}

// 전체에 적용될 index값 설정

export const coursePlaceSlice = createSlice({
  name: "coursePlace",
  initialState,
  reducers: {
    addCoursePlace: (state, action: PayloadAction<CoursePlaceState>) => {
      const tempState = action.payload
      state.addressName = tempState.addressName
      state.cateName = tempState.cateName
      state.placeName = tempState.placeName
      console.log(tempState)
    },
  },
})

export const { addCoursePlace } = coursePlaceSlice.actions

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
