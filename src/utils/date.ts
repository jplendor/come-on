/* eslint-disable import/prefer-default-export */

import { encryptedCookieConvToParamObj } from "./url"

/**
 * Date 객체를 인자로 받아서, 년, 월, 일(Number)을 담은 Array를 반환합니다.
 * createAt: 2022-08-25
 * author: lee jeongmin
 */
const getYyyymmddArray = (dateParam: Date): number[] => {
  return [dateParam.getFullYear(), dateParam.getMonth(), dateParam.getDate()]
}

/**
 * Date 객체를 인자로 받아서, "YYYY-MM-DD" format의 String으로 반환합니다.
 * createAt: 2022-08-25
 * author: lee jeongmin
 */
const toStringYyyymmdd = (dateParam: Date): string => {
  const [yyyy, month, date] = getYyyymmddArray(dateParam)
  const mm = month < 9 ? `0${month + 1}` : month + 1
  const dd = date < 10 ? `0${date}` : date
  return `${yyyy}-${mm}-${dd}`
}

export { getYyyymmddArray, toStringYyyymmdd }

export const isTimeExpired = (url?: string): boolean => {
  // 중복 요청 방지
  if (url === `${process.env.REACT_APP_SERVER_URL}/auth/reissue`) return false
  const { expiry } = encryptedCookieConvToParamObj()
  const now = new Date().getTime()
  const expiryTime = new Date(parseInt(expiry, 10) * 1000).getTime()
  // 토큰이 만료됐는지
  return Boolean(now >= expiryTime)
}
