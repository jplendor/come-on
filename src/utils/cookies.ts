import { Cookies } from "react-cookie"

import { encryptValue, decryptValue } from "./crypto"

// createAt: 2022-08-26
// author: jeongbaebang

/**
 * 필요한 쿠키 이름을 명시합니다.
 */
export enum CookieName {
  auth = "ENCRYPT_TOKEN",
}

const cookies = new Cookies()

/**
 * 새로운 쿠키를 발행합니다.
 */
export const setCookie = (cookieName: CookieName, value: string): void =>
  cookies.set(cookieName, value, { path: "/" })

/**
 * 쿠키 정보를 가져옵니다.
 */
export const getCookie = (cookieName: CookieName): string =>
  cookies.get(cookieName)

/**
 * 발행되어 있는 쿠키를 삭제합니다.
 */
export const removeCookie = (cookieName: CookieName): void =>
  cookies.remove(cookieName, { path: "/" })

/**
 * 쿠키의 내용을 암호화 시킨 후 새로운 쿠키를 발행합니다.
 */
export const encryptCookie = (cookieName: CookieName, value: string): void =>
  setCookie(cookieName, encryptValue(value))

/**
 * 쿠키의 내용을 복호화 시킨 후 쿠키 정보를 가져옵니다.
 */
export const decryptCookie = (cookieName: CookieName): string =>
  decryptValue(getCookie(cookieName) || "")
