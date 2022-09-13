/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  map,
  pipe,
  curry,
  split,
  toArray,
  isObject,
  fromEntries,
} from "@fxts/core"

import { AuthParams, Url } from "types/auth"

import { decryptValue } from "./crypto"
import { CookieName, decryptCookie } from "./cookies"
import { LeafPath, pullingProperty } from "./pullingProperty"

type CheckURL = (url: string | object) => Url
type ConversionToUrl = <T extends object>(
  target: T,
  propertys: LeafPath<T>
) => Url

const checkURL: CheckURL = (url) => (isObject(url) ? "/" : url) as Url

/**
 * 객체 내부에서 속성을 가져와 유효한 url로 만듭니다.
 * @param target 객체를 전달합니다.
 * @param propertys 객체의 key 값을 명시합니다.
 * @returns 유효하지 않은 값이 들어온다면 "/"을 반환하고, 그 외에는 유효한 url을 반환합니다.
 */

export const conversionToUrl: ConversionToUrl = (target, propertys) =>
  checkURL(pullingProperty(target, propertys))

const getSeparatorByString = curry((separator: string, target: string) =>
  pipe(split(separator, target), toArray)
)

export const paramConversionToObj = (data: string, sep1 = "&", sep2 = "=") =>
  pipe(
    data,
    getSeparatorByString(sep1),
    map(getSeparatorByString(sep2)),
    toArray,
    fromEntries as any
  )

const conversionToObj = (f: any) => pipe(f, paramConversionToObj) as AuthParams

export const encryptedTextConvToParamObj = (text: string) =>
  conversionToObj(decryptValue(text))

export const encryptedCookieConvToParamObj = () =>
  conversionToObj(decryptCookie(CookieName.auth))
