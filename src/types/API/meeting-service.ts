// Meeting-Service API Docs 참고

enum CodeType {
  SUCCESS = "SUCCESS",
  SERVER_ERROR = "SERVER_ERROR",
  UNAUTHORIZED = "UNAUTHORIZED",
  BAD_PARAMETER = "BAD_PARAMETER",
  NOT_FOUND = "NOT_FOUND",
  FORBIDDEN = "FORBIDDEN",
}
export interface ServerResponse<T> {
  responseTime: string
  code: CodeType
  data: T
}

// User, Place => 공통으로 빼기?
interface User {
  id: number
  nickname: string
  imageLink: string
  meetingRole: string
}

enum DateStatusType {
  FIXED = "FIXED",
  UNFIXED = "UNFIXED",
}
interface MeetingDate {
  id: number
  date: string
  userCount: number
  dateStatus: DateStatusType
}

interface Place {
  id: number
  name: string
  memo: string
  lat: number
  lng: number
  order: number
}
export interface Meeting {
  id: number
  myMeetingUserId: number
  myMeetingRold: string
  title: string
  startDate: string
  endDate: string
  meetingUsers: User[]
  meetingDates: MeetingDate[]
  meetingPlaces: Place[]
}

export interface MeetingDateForCreate {
  meetingId: number
  date: string
}

export interface MeetingDateForDelete {
  meetingId: number
  dateId: number
}

export interface meetingDateForRead {
  meetingId: number
  dateId: number
}

export interface MeetingDateDetail extends MeetingDate {
  dateUsers: Array<User>
}
