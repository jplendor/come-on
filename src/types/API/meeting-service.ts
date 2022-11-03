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

// 공통 응답 스펙 - Slice 응답의 경우
interface SliceResponse<T> {
  currentSlice: number
  sizePerSlice: number
  numberOfElements: number
  hasPrevious: boolean
  hasNext: boolean
  contents: T[]
  first: boolean
  last: boolean
}

/**
 * 코드 단건 조회
 *
 * GET /meetings/{meetingId}/codes/{codeId}
 */

export interface MeetingCode {
  id: number
  inviteCode: string
  isExpired: boolean
}

/**
 * 모임 리스트 조회
 *
 * GET /meetings
 */

export interface MeetingList {
  id: number
  hostNickname: string
  userCount: number
  myMeetingRole: "HOST" | "EDITOR" | "PARTICIPANT"
  title: string
  startDate: string
  endDate: string
  imageLink: string
  meetingCodeId: number
  fixedDates: string[]
  meetingStatus: "UNFIXED" | "PROCEEDING" | "END"
}

export type MyCoursesSliceRes = SliceResponse<MeetingList>

export interface DeleteMeetingQS {
  meetingId: number
}

export interface MeetingCodeQS {
  meetingId: number
  codeId: number
}

export interface MeetingListQS {
  page: number
  size: number
  title: string
  startDate: string
  endDate: string
}

export type RoleType = "HOST" | "EDITOR" | "PARTICIPANT"

// User, Place => 공통으로 빼기?
export interface User {
  id: number
  nickname: string
  imageLink: string
  meetingRole: RoleType
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

export interface Place {
  apiId: number
  category: string
  id: number
  name: string
  memo: string
  lat: number
  lng: number
  order: number
  address: string
}
export interface Meeting {
  id: number
  myMeetingUserId: number
  myMeetingRole: RoleType
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

interface NewPlace {
  id: number
  apiId: number
  name: string
  lat: number
  lng: number
  memo: string
  category: string
  address: string
}

export interface MeetingPlaceForCreate {
  meetingId: number
  newPlace: NewPlace
}

export interface MeetingPlaceForDelete {
  meetingId: number
  placeId: number
}

export interface MeetingPlaceForUpdate {
  meetingId: number
  placeId: number
  updatedPlace: Partial<NewPlace>
}
interface Member {
  meetingRole: RoleType
}
export interface MeetingUserForUpdate {
  meetingId: number
  userId: number
  updatedMember: Member
}

export interface MeetingUserForCreate {
  inviteCode: string
}

export interface MeetingUserForCreateSuccess {
  meetingId: number
  meetingUserId: number
}
