/* eslint-disable import/prefer-default-export */
import { v4 as uuidv4 } from "uuid"
import { map, pipe, toArray } from "@fxts/core"

type GenerateComponent = <T>(
  datas: T[],
  f: (data: T, key?: string) => JSX.Element
) => JSX.Element[]

/**
 * 테이터를 렌더링 할 자료구조를 넣고,
 * 
 * 렌더링 될 JSX를 넣어주면 렌더링 된 배열이 반환됩니다.
 * 
 * **외부에서 전달할 key값이 없다면 내부에서 생성된 key값을 사용가능합니다.**
 * 
 * 내부에서 생성되는 key 값은 무작위 문자열 입니다.
 *  * createAt: 2022-08-09
 *  * author: jeongbaebang
 * 
 * @example
 * ```tsx
const App = (): JSX.Element => {
  return (
    <>
      {generateComponent(SAMPLE_DATA, (user, key) => (
        <div key={key}>
          <span>name: {user.name}</span>
          <span>email: {user.email}</span>
        </div>
      ))}
    </>
    )
}
 * ```
 */

export const generateComponent: GenerateComponent = (data, f) =>
  pipe(
    map((d, k = uuidv4()) => f(d, k), data),
    toArray
  )
