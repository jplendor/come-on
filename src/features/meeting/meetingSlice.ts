import { api } from "features/api/apiSlice"

import { ServerResponse } from "types/API/meeting-service"

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
  }),
})

export const { useCreateMeetingMutation } = meetingApiSlice
