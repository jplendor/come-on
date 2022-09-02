/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

type TrueCallBack = <F extends Function>(
  f: F
) => <A1>(arg0: boolean, arg1: A1) => void | any

/**
 * 함수를 인수로 넣어주면 다시 함수가 리턴됩니다. -> 고차함수
 *
 * 리턴된 함수에는 두 개의 인자를 전달할 수 있습니다.
 *
 * 첫번째 인수는 해당 값이 참인지 판별하는 분기조건을 넣어줍니다.
 *
 * 첫번째 인수가 참이라면 두번째 인수를 클로저 함수에 전달하면서 실행합니다.
 *
 * @param f true 일때 실행할 함수를 입력합니다.
 * @returns 두개의 인자를 받는 함수를 리턴합니다.
 *
 * * createAt: 2022-08-27
 * * author: jeongbaebang
 * @example
 * ```ts
  const func = hof((arg: string) =>
    console.log(`해당 함수가 실행되었습니다. 넘어온 인자: ${arg}`)
  )

  func(true, "apple") // "해당 함수가 실행되었습니다. 넘어온 인자: apple"
  func(false, "rich") // (실행되지 않음)
 * ```
 */

export const hof: TrueCallBack = (f) => (arg0, arg1) =>
  arg0 ? f(arg1) : undefined

/**
 *  첫번째 인수값이 참이면 두번째 인자가 실행됩니다.
 *  1. 두번째 인자가 함수이면 함수를 실행합니다.
 *  2. 두번째 인자가 값이라면 값을 반환합니다.
 * 
 * * createAt: 2022-08-28
 * * author: jeongbaebang
 * 
 * @example
 * ```ts
  trueCallBack(true, 10) // 10 
  trueCallBack(true, () => console.log(10)) // console.log(10)
 * ```
 */

export const trueCallBack = hof((f: unknown) =>
  typeof f === "function" ? f() : f
)
