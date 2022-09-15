// User-Service API Docs 참고

/**
 * 내 상세 정보 조회
 *
 * GET /users/me
 */

export interface Mydetail {
  userId: number
  nickname: string
  name: string
  email: string
  role: string
  profileImg: {
    id: number
    imageUrl: string
  }
}

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
 * 906 : 탈퇴 처리된 회원입니다.
 *
 * 907 : 인증된 사용자만이 이용 가능합니다.
 */

type ErrorCode = 900 | 901 | 902 | 903 | 904 | 905 | 906 | 907

interface Exception {
  code: ErrorCode
  message: string
}

enum Code {
  BAD_PARAMETER = "BAD_PARAMETER",
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

export interface ServerResponse {
  responseTime: string
  code: Code
  data: Exception | Mydetail
}

// GET /users/me
export interface MydetailResponse extends ServerResponse {
  data: Mydetail
}
