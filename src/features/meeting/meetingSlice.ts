import { api } from "features/api/apiSlice"

import {
  ServerResponse,
  Meeting,
  MeetingDateForCreate,
  MeetingDateForDelete,
} from "types/API/meeting-service"

export const meetingApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
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
    }),
    // 모임 날짜 삭제
    deleteMeetingDate: builder.mutation<
      ServerResponse<number>,
      MeetingDateForDelete
    >({
      query: (meetingDate) => ({
        url: `/meetings/${meetingDate.meetingId}/dates/${meetingDate.dateId}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const {
  useCreateMeetingMutation,
  useGetMeetingQuery,
  useCreateMeetingDateMutation,
  useDeleteMeetingDateMutation,
} = meetingApiSlice
