/* eslint-disable import/prefer-default-export */

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
