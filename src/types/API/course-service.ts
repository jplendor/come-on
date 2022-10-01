// Course-Service API Docs 참고

export interface SearchCardProp {
  index: number // 카드의 인덱스 넘버 - order
  address_name: string // 주소
  category_name: string // 플레이스 카테고리 -placeCategory
  place_name: string // 장소 이름           -name
  place_url: string // 플레이스 주소        -
  x: number // 경도 longitude              -lon
  y: number // 위도 latitude               -lat
  description: string // 설명              -description
  id: number // 카카오 id          -kakaoPlaceId
}

export interface CourseData {
  title: string
  description: string
  imgFile: string
}

export interface CourseId {
  courseId: number | undefined
}

export interface CourseDetail {
  courseId: number
  title: string
  description: string
  imageUrl: string
  courseStatus: string
  updatedDate: string
  writer: {
    id: number
    nickname: string
  }
  likeCount: number
  userLiked: boolean
  coursePlaces: [
    {
      id: number
      order: number
      name: string
      description: string
      lng: number // 경도 x
      lat: number // 위도 y
      apiId: number
      address: string
      category: string
    }
  ]
}

interface placeProps {
  toSave: [
    {
      name: string
      description: string
      lat: number
      lng: number
      order: number
      apiId: number
      category: string
    }
  ]
  toModify: [
    {
      id: number | undefined
      description: string
      order: number
      category: string
    }
  ]
  toDelete: [
    {
      id: number | undefined
    }
  ]
}

/**
 * 코스 좋아요 등록 및 취소
 *
 * POST /courses/{courseId}/like
 */

interface LikeCourse {
  userLiked: boolean
}

/**
 * 코스 등록
 *
 * POST /courses
 */

interface AddCourse {
  courseId: number
  courseStatus: string
}

/**
 * 내가 등록한 코스 리스트 조회
 * 내가 좋아요한 코스 리스트 조회
 *
 * GET /courses/my
 * GET /courses/like
 */

export interface MyCourses {
  courseId: number
  title: string
  imageUrl: string
  courseStatus: string
  updatedDate: string
  likeCount: number
  userLiked: boolean
  writer: {
    id: number
    nickname: string
  }
}

/**
 * 코스 리스트 조회
 *
 * GET /courses
 */

export interface CourseList extends MyCourses {
  firstPlace: {
    id: number
    lat: number
    lng: number
    distance: number
  }
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

export type MyCoursesSliceRes = SliceResponse<MyCourses>
export type CourseListSliceRes = SliceResponse<CourseList>

/**
 * 900 : 죄송합니다. 서버 내부 오류입니다.
 *
 * 901 : 파일이 비어있습니다. 확인해주세요.
 *
 * 902 : 파일 업로드에 실패하였습니다.
 *
 * 903 : 요청 데이터 검증에 실패하였습니다.
 *
 * 904 : 해당 식별자를 가진 리소스가 없습니다.
 *
 * 905 : 요청을 수행할 권한이 없습니다.
 *
 * 906 : 해당 리소스에 접근할 수 없는 상태입니다.
 *
 * 907 : 인증된 사용자만이 이용 가능합니다.
 *
 * 908 : 해당 데이터가 이미 존재합니다.
 */

type ErrorCode = 900 | 901 | 902 | 903 | 904 | 905 | 906 | 907 | 908

interface Exception {
  code: ErrorCode
  message: string
}

/**
 * **응답 코드 반환값**
 *
 * BAD_PARAMETER   : 요청 파라미터가 잘못되었습니다.
 *
 * FORBIDDEN       : 권한이 없습니다.
 *
 * NOT_FOUND       : 리소스를 찾지 못했습니다.
 *
 * SERVER_ERROR    : 서버 에러입니다.
 *
 * SUCCESS         : 요청이 성공하였습니다.
 *
 * UNAUTHORIZED    : 인증에 실패하였습니다.
 */

enum Code {
  BAD_PARAMETER = "BAD_PARAMETER",
  FORBIDDEN = "FORBIDDEN",
  NOT_FOUND = "NOT_FOUND",
  SERVER_ERROR = "SERVER_ERROR",
  SUCCESS = "SUCCESS",
  UNAUTHORIZED = "UNAUTHORIZED",
}

export interface ServerRes {
  responseTime: string
  code: Code
  data:
    | Exception
    | MyCoursesSliceRes
    | CourseListSliceRes
    | AddCourse
    | LikeCourse
    | CourseId
}

// GET /courses/my & GET /courses/like
export interface MyCoursesRes extends ServerRes {
  data: MyCoursesSliceRes
}

// POST /courses
export interface AddCourseRes extends ServerRes {
  data: AddCourse
}

// GET /courses
export interface CourseListRes extends ServerRes {
  data: CourseListSliceRes
}

// POST /courses/{courseId}/like
export interface LikeCourseRes extends ServerRes {
  data: LikeCourse
}

export interface ExceptionRes extends ServerRes {
  data: Exception
}

export interface OptionalQueryString {
  page?: number
  size?: number
}

export interface GetMyCourseListQS extends OptionalQueryString {
  courseStatus?: "COMPLETE" | "WRITING"
}

export interface GetCourseListQS extends OptionalQueryString {
  title?: string
  lat?: number
  lng?: number
}

/// //////////////////////////////////////////////

export interface CourseIdResponse extends ServerRes {
  data: CourseId
}

export interface CourseDetailResponse extends ServerRes {
  data: CourseDetail
}
