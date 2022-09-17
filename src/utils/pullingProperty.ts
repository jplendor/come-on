/* eslint-disable no-use-before-define */
/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEmpty, pickBy, pipe } from "@fxts/core"

type LeafPathTree<T> = {
  [P in keyof T]-?: T[P] extends object ? [P, ...LeafPath<T[P]>] : [P]
}
export type LeafPath<T> = LeafPathTree<T>[keyof T]
type DFS = (object: any, index: number) => string | object
type PullingProperty = <T extends object>(
  target: T,
  propertys: LeafPath<T>
) => string | object

/**
 *
 * 특정 속성을 객체에서 꺼내옵니다.
 *
 * **만약에 값이 존재하지 않거나, 속성에 값이 없다면**
 *    
 * **현재 객체 깊이에 위치한 property를 key로 설정되고,**
 * 
 *  **value 값으로 빈 문자열을 할당합니다.**
 *
 * @param target 속성을 꺼낼 대상 객체를 입력합니다.
 * @param propertys[] 꺼낼 대상의 키값을 입력합니다.
 * @returns 지정한 property 속성이 존재한다면 문자열을 반환합니다.
 *
 * * createAt: 2022-08-23
 * *  author: jeongbaebang
 *
 * @example
 * ```tsx
  const location = {
    state: {
      from: {
        pathname: "/user/1203",
      },
    },
  }

pullingProperty(location, ["state","from","pathname"]) -> "/user/1203"

  const wrongLocation = {
    state: {
      from: null,
    },
  }

pullingProperty(wrongLocation, ["state","from","pathname"]) -> {from: ''}
 * ```
 */

export const pullingProperty: PullingProperty = (target, propertys) => {
  const DFS: DFS = (object, index) => {
    if (isEmpty(object)) return { [propertys[index - 1] as string]: "" }
    if (index === propertys.length) return object
    return pipe(
      object,
      pickBy(([key, value]) => key === propertys[index] && value !== ""),
      (findObject) => DFS(findObject[propertys[index] as string], index + 1)
    )
  }
  return DFS(target, 0)
}
