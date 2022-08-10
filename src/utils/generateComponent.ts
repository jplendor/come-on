/* eslint-disable import/prefer-default-export */
import { v4 as uuidv4 } from "uuid"
import { map, pipe, toArray } from "@fxts/core"

/**
 * 테이터를 렌더링 할 자료구조를 넣고 렌더링 될 JSX를 넣어주면 렌더링 된 배열이 반환됩니다.
 * **내부에서 만들어진 key값을 반드시 속성으로 넘겨주어야 합니다.**
 *  * createAt: 2022-08-09
 *  * author: jeongbaebang
 * @example
 * ```tsx
 * 
interface UserInfo {
    name: string
    email: string
}

const SAMPLE_DATA: UserInfo[] = [
  {
      name: "John Smith",
      email: "john@smith.com",
  },
  {
      name: "Jeong bae",
      email: "Jeong bae@smith.com",
  },
]

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

export const generateComponent: <T>(
  datas: T[],
  f: (data: T, key: string) => JSX.Element
) => JSX.Element[] = (data, f) =>
  pipe(
    map((d, k = uuidv4()) => f(d, k), data),
    toArray
  )
