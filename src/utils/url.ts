/* eslint-disable import/prefer-default-export */
import { isObject } from "@fxts/core"

import { LeafPath, pullingProperty } from "./pullingProperty"

type CheckURL = (url: string | object) => string
type ConversionToUrl = <T extends object>(
  target: T,
  propertys: LeafPath<T>
) => string

const checkURL: CheckURL = (url) => (isObject(url) ? "/" : url)

/**
 * 객체 내부에서 속성을 가져와 유효한 url로 만듭니다.
 * @param target 객체를 전달합니다.
 * @param propertys 객체의 key 값을 명시합니다.
 * @returns 유효하지 않은 값이 들어온다면 "/"을 반환하고, 그 외에는 유효한 url을 반환합니다.
 */

export const conversionToUrl: ConversionToUrl = (target, propertys) =>
  checkURL(pullingProperty(target, propertys))
