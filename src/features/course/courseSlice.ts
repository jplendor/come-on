/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-shadow */
import { api } from "features/api/apiSlice"
import {
  CourseIdResponse,
  CourseDetailResponse,
  CourseUpdateRes,
  CourseUpdatePlaceProps,
  ServerRes,
  UpdateCourseDetailQProps,
  CoursePlacesRes,
  CoursePlaceState,
  coursePlaceToDelete,
  coursePlaceToModify,
} from "types/API/course-service"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
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
import { AppDispatch } from "store"

export interface coursePlacesToSaveProps {
  toSave: {
    name: string
    description: string
    lng: number // 경도 x
    lat: number // 위도 y
    address: string
    order: number
    apiId: number
    category: string
  }
}

export interface CoursePlaceProps {
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

export interface CoursePlacePropsNoId {
  order: number
  name: string
  description: string
  lng: number // 경도 x
  lat: number // 위도 y
  apiId: number
  category: string
  address: string
}

export interface CourseDetailProps {
  title: string
  description: string
  imgFile: string
}

export const initialState: CoursePlaceState = {
  done: false,
  courseDetails: {
    title: "undefined",
    description: "",
    imgFile: "",
  },
  coursePlaces: [],
  searchText: undefined,
  updatePlaces: { toSave: [], toModify: [], toDelete: [] },
}

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
    getCoursePlaces: builder.query<CoursePlacesRes, number>({
      query: (id) => ({
        url: `/courses/${id}/course-places`,
        method: "GET",
      }),
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
      query: (id) => ({
        url: `/courses/${id}`,
        method: "GET",
      }),
    }),
    addCourseDetail: builder.mutation<CourseIdResponse, FormData>({
      query: (data) => ({
        url: "/courses",
        method: "POST",
        body: data,
        hearders: {
          "Content-type": "multipart/form-data; charset=UTF-8",
        },
      }),
    }),
    addCoursePlace: builder.mutation<CourseDetailResponse, any>({
      query: ({ postData, courseId }) => ({
        url: `/courses/${courseId}/course-places/batch`,
        method: "POST",
        body: postData,
      }),
      transformResponse: (response: any) => {
        console.log(
          "courseId : %d courseStatus : %s",
          response.data.courseId,
          response.data.courseStatus
        )
        return response.data.courseId
      },
    }),
    updateCoursePlaceToDB: builder.mutation<
      CourseUpdateRes,
      CourseUpdatePlaceProps
    >({
      query: ({ toSave, toModify, toDelete, courseId }) => ({
        url: `/courses/${courseId}/course-places/batch`,
        method: "POST",
        body: { toSave, toModify, toDelete },
      }),
      transformResponse: (response: CourseUpdateRes) => {
        console.log(
          "courseId:%d , courseStatus:%s , message:%s",
          response.data.courseId,
          response.data.courseStatus,
          response.data.message
        )
        return response
      },
    }),
    updateCourseDetail: builder.mutation<ServerRes, UpdateCourseDetailQProps>({
      query: ({ data, id }) => ({
        url: `/courses/${id}`,
        method: "POST",
        body: data,
        hearders: {
          "Content-type": "multipart/form-data; charset=UTF-8",
        },
      }),
    }),
  }),
})

export const {
  endpoints: { getCourseDetail, getCoursePlaces },
} = courseApi

export const {
  useAddCourseMutation,
  useGetCourseListQuery,
  useGetMyCourseListQuery,
  useGetCoursePlacesQuery,
  useGetLikedCourseListQuery,
  useClickLikeCourseMutation,
  useAddCourseDetailMutation,
  useAddCoursePlaceMutation,
  useGetCourseDetailQuery,
  useUpdateCoursePlaceToDBMutation,
  useUpdateCourseDetailMutation,
} = courseApi

// data setUp에 필요한 thunk 만들기
export const fetchByIdCourseDetail = createAsyncThunk<
  CourseDetailResponse,
  number,
  {
    dispatch: AppDispatch
  }
>(
  "coursePlace/fetchByIdCourseDetail",
  async (id, { dispatch }): Promise<CourseDetailResponse> => {
    const data = await dispatch(
      getCourseDetail.initiate(id, { forceRefetch: true })
    )
    return data.data as CourseDetailResponse
  }
)

// data setUp에 필요한 thunk 만들기
export const fetchByIdCoursePlaces = createAsyncThunk<
  CoursePlacesRes,
  number,
  {
    dispatch: AppDispatch
  }
>(
  "coursePlace/fetchByIdCoursePlaces",
  async (id, { dispatch }): Promise<CoursePlacesRes> => {
    const data = await dispatch(
      getCoursePlaces.initiate(id, { forceRefetch: true })
    )
    console.log(data)
    return data.data as CoursePlacesRes
  }
)

export const coursePlaceSlice = createSlice({
  name: "coursePlace",
  initialState,
  reducers: {
    setSearchText: (state, action: PayloadAction<string | undefined>) => {
      state.searchText = action.payload
    },
    addCoursePlace: (state, action: PayloadAction<CoursePlaceProps>) => {
      if (state.coursePlaces.length === 0) {
        state.coursePlaces[0] = { ...action.payload, order: 1 }
      } else {
        if (state.coursePlaces[0].name === "newName") state.coursePlaces.pop()
        state.coursePlaces.push({
          ...action.payload,
          order: state.coursePlaces.length + 1,
        })
      }
    },
    addToModify: (state, action: PayloadAction<CoursePlaceProps>) => {
      const targetIndex = state.updatePlaces.toModify?.findIndex(
        (place) => place.order === action.payload.order
      )

      // modify형식에 맞춰서 데이터 재가공

      const modifyPlace = {
        id: action.payload.id,
        description: action.payload.description,
        order: action.payload.order,
        category: action.payload.category,
      }

      // 해당 인덱스의 값 삭제후 다시 끼워넣으며 원하는 값으로 교체~
      if (targetIndex === -1) {
        state.updatePlaces.toModify?.push(modifyPlace)
      } else if (targetIndex !== undefined) {
        state.updatePlaces.toModify?.splice(targetIndex, 1)
        state.updatePlaces.toModify?.splice(targetIndex, 0, modifyPlace)
      }
    },
    // 드래그앤 드롭할때 사용
    updateCoursePlace: (state, action: PayloadAction<CoursePlaceProps[]>) => {
      state.coursePlaces = action.payload
    },
    editCoursePlaceDetail: (state, action: PayloadAction<CoursePlaceProps>) => {
      const result = state.coursePlaces.find(
        (place) => place.order === action.payload.order
      )
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const index = state.coursePlaces.indexOf(result!)
      state.coursePlaces[index].description = action.payload.description
      state.coursePlaces[index].category = action.payload.category
    },
    setCourseDetail: (state, action: PayloadAction<CourseDetailProps>): any => {
      state.courseDetails.title = action.payload.title
      state.courseDetails.description = action.payload.description
      state.courseDetails.imgFile = action.payload.imgFile
    },
    updateToSave: (
      state,
      action: PayloadAction<coursePlacesToSaveProps>
    ): any => {
      state.updatePlaces.toSave?.push(action.payload.toSave)
    },
    deleteToSave: (state, action: PayloadAction<CoursePlacePropsNoId>): any => {
      const targetIndex = state.updatePlaces.toSave.findIndex(
        (place) => place.order === action.payload.order
      )

      state.updatePlaces.toSave.splice(targetIndex, 1)
    },
    deleteToModify: (
      state,
      action: PayloadAction<CoursePlacePropsNoId>
    ): any => {
      const targetIndex = state.updatePlaces.toSave.findIndex(
        (place) => place.order === action.payload.order
      )
      state.updatePlaces.toModify?.splice(targetIndex, 1)
    },
    modifyToSave: (state, action: PayloadAction<CoursePlacePropsNoId>): any => {
      // 있으면 index반환 없으면 -1반환, 근데 -1일 이유가 없음.
      const targetIndex = state.updatePlaces.toSave.findIndex(
        (place) => place.order === action.payload.order
      )
      // 해당 인덱스의 값 삭제후 다시 끼워넣으며 원하는 값으로 교체~
      state.updatePlaces.toSave.splice(targetIndex, 1)
      state.updatePlaces.toSave.splice(targetIndex, 0, action.payload)
    },
    modifyCoursePlaces: (
      state,
      action: PayloadAction<CoursePlaceProps>
    ): any => {
      const targetIndex = state.coursePlaces.findIndex(
        (place) => place.order === action.payload.order
      )
      state.coursePlaces.splice(targetIndex, 1)
      state.coursePlaces.splice(targetIndex, 0, action.payload)
    },
    updateToModify: (
      state,
      action: PayloadAction<coursePlaceToModify[]>
    ): any => {
      console.log(action.payload)
      state.updatePlaces.toModify = action.payload
    },
    updateToDelete: (
      state,
      action: PayloadAction<coursePlaceToDelete>
    ): any => {
      state.updatePlaces.toDelete?.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchByIdCourseDetail.fulfilled, (state, action) => {
      state.done = true
      state.courseDetails.title = action.payload?.data?.title
      state.courseDetails.description = action.payload?.data?.description
      state.courseDetails.imgFile = action.payload?.data?.imageUrl

      // 초기화
      state.updatePlaces.toSave = []
      state.updatePlaces.toModify = []
      state.updatePlaces.toDelete = []

      state.coursePlaces = action.payload?.data.coursePlaces
    })
    builder.addCase(fetchByIdCourseDetail.pending, (state) => {
      state.done = false
    })
    builder.addCase(fetchByIdCourseDetail.rejected, (state) => {
      state.done = false
    })
    builder.addCase(fetchByIdCoursePlaces.fulfilled, (state, action) => {
      console.log(action.payload.data.contents)
      if (action.payload.data) state.coursePlaces = action.payload.data.contents
      else state.coursePlaces = initialState
    })
    builder.addCase(fetchByIdCoursePlaces.pending, (state) => {
      state.done = false
    })
    builder.addCase(fetchByIdCoursePlaces.rejected, (state) => {
      state.done = false
    })
  },
})

export const {
  addCoursePlace,
  setCourseDetail,
  setSearchText,
  updateCoursePlace,
  modifyCoursePlaces,
  addToModify,
  updateToSave,
  deleteToModify,
  modifyToSave,
  updateToDelete,
  updateToModify,
  deleteToSave,
  editCoursePlaceDetail,
} = coursePlaceSlice.actions
export default coursePlaceSlice.reducer
