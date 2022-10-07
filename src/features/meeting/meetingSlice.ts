import { api } from "features/api/apiSlice"

import {
  ServerResponse,
  Meeting,
  MeetingDateForCreate,
  MeetingDateForDelete,
  meetingDateForRead,
  MeetingDateDetail,
  MeetingListQS,
  MeetingPlaceForCreate,
  MyCoursesSliceRes,
  MeetingCodeQS,
  MeetingCode,
  DeleteMeetingQS,
} from "types/API/meeting-service"

export const meetingApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    // 모임 삭제
    deleteMeeting: builder.mutation<ServerResponse<null>, DeleteMeetingQS>({
      query: ({ meetingId }) => ({
        url: `/meetings/${meetingId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Meeting"],
    }),
    // 코드 수정
    updateMeetingCode: builder.mutation<ServerResponse<null>, MeetingCodeQS>({
      query: ({ meetingId, codeId }) => ({
        url: `/meetings/${meetingId}/codes/${codeId}`,
        method: "PATCH",
      }),
    }),
    // 코드 단건 조회
    getMeetingCode: builder.query<ServerResponse<MeetingCode>, MeetingCodeQS>({
      query: ({ meetingId, codeId }) => ({
        url: `/meetings/${meetingId}/codes/${codeId}`,
        method: "GET",
      }),
    }),
    // 모임 리스트 조회
    getMeetingList: builder.query<
      ServerResponse<MyCoursesSliceRes>,
      Partial<MeetingListQS>
    >({
      query: (args) => ({
        url: `/meetings`,
        method: "GET",
        params: { ...args },
      }),
      providesTags: ["Meeting"],
    }),
    // 모임 생성
    createMeeting: builder.mutation<ServerResponse<number>, FormData>({
      query: (meeting) => ({
        url: "/meetings",
        method: "POST",
        body: meeting,
      }),
    }),
    // 모임 단건 조회
    getMeeting: builder.query<ServerResponse<Meeting>, number>({
      query: (meetingId) => ({
        url: `/meetings/${meetingId}`,
        method: "GET",
      }),
      providesTags: ["Meeting"],
    }),
    // 모임 날짜 생성
    createMeetingDate: builder.mutation<
      ServerResponse<number>,
      MeetingDateForCreate
    >({
      query: (meetingDate) => ({
        url: `/meetings/${meetingDate.meetingId}/dates`,
        method: "POST",
        body: { date: meetingDate.date },
      }),
      invalidatesTags: ["Meeting"],
    }),
    // 모임 날짜 삭제
    deleteMeetingDate: builder.mutation<
      ServerResponse<null>,
      MeetingDateForDelete
    >({
      query: (meetingDate) => ({
        url: `/meetings/${meetingDate.meetingId}/dates/${meetingDate.dateId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Meeting"],
    }),
    // 모임 날짜 단건 조회
    getMeetingDate: builder.query<
      ServerResponse<MeetingDateDetail>,
      meetingDateForRead
    >({
      query: (meetingDate) => ({
        url: `/meetings/${meetingDate.meetingId}/dates/${meetingDate.dateId}`,
        method: "GET",
      }),
    }),
    // 모임 장소 생성
    createMeetingPlace: builder.mutation<
      ServerResponse<number>,
      MeetingPlaceForCreate
    >({
      query: (meetingPlace) => ({
        url: `/meetings/${meetingPlace.meetingId}/places`,
        method: "POST",
        body: meetingPlace.newPlace,
      }),
      invalidatesTags: ["Meeting"],
    }),
  }),
})

export const {
  useDeleteMeetingMutation,
  useUpdateMeetingCodeMutation,
  useGetMeetingCodeQuery,
  useCreateMeetingMutation,
  useGetMeetingQuery,
  useCreateMeetingDateMutation,
  useDeleteMeetingDateMutation,
  useGetMeetingDateQuery,
  useGetMeetingListQuery,
  useCreateMeetingPlaceMutation,
} = meetingApiSlice
