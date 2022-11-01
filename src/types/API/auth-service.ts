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
  userId: number
}

/**
 * 600 : 서버 내부 에러입니다.
 *
 * 601 : 인증 헤더를 찾을 수 없습니다.
 *
 * 602 : 인증 헤더 검증에 실패하였습니다.
 *
 * 603 : 인증 헤더의 토큰 타입이 유효하지 않습니다.
 *
 * 661 : 리프레시 토큰을 찾을 수 없습니다.
 *
 * 662 : Refresh Token이 유효하지 않습니다.
 *
 * 663 : Access Token이 만료되지 않아 재발급 할 수 없습니다.
 */

type ErrorCode = 600 | 601 | 602 | 603 | 661 | 662 | 663

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
  BAD_REQUEST = "BAD_REQUEST",
  FORBIDDEN = "FORBIDDEN",
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

export interface ServerRes {
  responseTime: string
  code: Code
  data: Exception | ReissueToken | Logout | TokenValidation
}

export interface ReissueRes extends ServerRes {
  data: ReissueToken
}

export interface LogoutRes extends ServerRes {
  data: Logout
}

export interface ExceptionRes extends ServerRes {
  data: Exception
}

export interface TokenValidationRes extends ServerRes {
  data: TokenValidation
}
