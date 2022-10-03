import { api } from "features/api/apiSlice"

import {
  ServerResponse,
  Meeting,
  MeetingDateForCreate,
  MeetingDateForDelete,
  meetingDateForRead,
  MeetingDateDetail,
  MeetingList,
  MeetingListQS,
  MeetingPlaceForCreate,
} from "types/API/meeting-service"

export const meetingApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getMeetingList: builder.query<
      ServerResponse<MeetingList>,
      Partial<MeetingListQS>
    >({
      query: (args) => ({
        // eslint-disable-next-line max-len
        url: `/meetings`,
        method: "GET",
        params: { ...args },
      }),
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
  useCreateMeetingMutation,
  useGetMeetingQuery,
  useCreateMeetingDateMutation,
  useDeleteMeetingDateMutation,
  useGetMeetingDateQuery,
  useGetMeetingListQuery,
  useCreateMeetingPlaceMutation,
} = meetingApiSlice
