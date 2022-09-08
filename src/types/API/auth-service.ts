// Auth-Service API Docs 참고

export enum Login {
  KAKAO = "kakao",
  REDIRECT_URI = "/auth/login-verification",
}

interface TokenValidation {
  userId: number
}

interface Logout {
  message: string
}

interface ReissueToken {
  accessToken: string
  expiry: number
}

/**
 * 700 : 서버 내부 에러입니다.
 *
 * 701 : 인증 헤더를 찾을 수 없습니다.
 *
 * 702 : 리프레시 토큰을 찾을 수 없습니다.
 *
 * 703 : Access Token이 유효하지 않습니다.
 *
 * 704 : Refresh Token이 유효하지 않습니다.
 *
 * 705 : Access Token이 만료되지 않아 재발급 할 수 없습니다.
 */

type ErrorCode = 700 | 701 | 702 | 703 | 704 | 705

interface Exception {
  code: ErrorCode
  message: string
}

/**
 * **응답 코드 반환값**
 *
 * BAD_PARAMETER   : 요청 파라미터가 잘못되었습니다.
 *
 * BAD_REQUEST     : 잘못된 요청입니다.
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
  BAD_REQUEST = "BAD_REQUEST",
  NOT_FOUND = "NOT_FOUND",
  SERVER_ERROR = "SERVER_ERROR",
  SUCCESS = "SUCCESS",
  UNAUTHORIZED = "UNAUTHORIZED",
}

/**
 * **공통 응답 스펙**
 *
 * responseTime : 응답 시간을 반환합니다.
 *
 * code         : 응답 코드를 반환합니다.
 *
 * data         : 결과 데이터를 반환합니다.
 */

// TODO: 인터페이스 이름명 좀더 고민해보기 []
export interface ServerResponse {
  responseTime: string
  code: Code
  data: Exception | ReissueToken | Logout | TokenValidation
}

export interface LogoutResponse extends ServerResponse {
  data: Logout
}

export interface ExceptionResponse extends ServerResponse {
  data: Exception
}

export interface TokenValidationResponse extends ServerResponse {
  data: TokenValidation
}
