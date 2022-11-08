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
  MeetingPlaceForDelete,
  MeetingPlaceForUpdate,
  MeetingUserForUpdate,
  MeetingUserForCreate,
  MeetingUserForCreateSuccess,
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
      invalidatesTags: ["Meeting"],
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
    // 모임 장소 삭제
    deleteMeetingPlace: builder.mutation<
      ServerResponse<null>,
      MeetingPlaceForDelete
    >({
      query: (meetingPlace) => ({
        url: `/meetings/${meetingPlace.meetingId}/places/${meetingPlace.placeId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Meeting"],
    }),
    // 모임 장소 수정
    updateMeetingPlace: builder.mutation<
      ServerResponse<null>,
      MeetingPlaceForUpdate
    >({
      query: (meetingPlace) => ({
        url: `/meetings/${meetingPlace.meetingId}/places/${meetingPlace.placeId}`,
        method: "PATCH",
        body: meetingPlace.updatedPlace,
      }),
      invalidatesTags: ["Meeting"],
    }),
    // 모임 멤버 수정
    updateMeetingUser: builder.mutation<
      ServerResponse<null>,
      MeetingUserForUpdate
    >({
      query: (meetingUser) => ({
        url: `/meetings/${meetingUser.meetingId}/users/${meetingUser.userId}`,
        method: "PATCH",
        body: meetingUser.updatedMember,
      }),
      invalidatesTags: ["Meeting"],
    }),
    // 모임 멤버 생성
    inviteMeetingUser: builder.mutation<
      ServerResponse<MeetingUserForCreateSuccess>,
      MeetingUserForCreate
    >({
      query: (inviteCode) => ({
        url: "/meetings/users",
        method: "POST",
        body: inviteCode,
      }),
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
  useDeleteMeetingPlaceMutation,
  useUpdateMeetingPlaceMutation,
  useUpdateMeetingUserMutation,
  useInviteMeetingUserMutation,
} = meetingApiSlice
