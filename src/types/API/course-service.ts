// Course-Service API Docs 참고

enum Code {
  BAD_PARAMETER = "BAD_PARAMETER",
  BAD_REQUEST = "BAD_REQUEST",
  NOT_FOUND = "NOT_FOUND",
  SERVER_ERROR = "SERVER_ERROR",
  SUCCESS = "SUCCESS",
  UNAUTHORIZED = "UNAUTHORIZED",
}
export interface CourseId {
  courseId: string
}

export interface CourseData {
  title: string
  description: string
  imgFile: FormData | null
}

type ErrorCode = 903

export interface ServerResponse {
  responseTime: string
  code: Code
}

export interface CourseDataResponse extends ServerResponse {
  data: {
    code: ErrorCode
    message: CourseData
  }
}
