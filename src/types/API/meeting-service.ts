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
