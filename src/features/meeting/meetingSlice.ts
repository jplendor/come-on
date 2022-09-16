import { api } from "features/api/apiSlice"

import { ServerResponse, Meeting } from "types/API/meeting-service"

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
  }),
})

export const { useCreateMeetingMutation, useGetMeetingQuery } = meetingApiSlice
