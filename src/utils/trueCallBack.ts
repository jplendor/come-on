/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

export type CallBack = <CallBackRetrunType>(
  a: boolean,
  b: CallBackRetrunType
) => void
type TrueCallBack = (f: (arg: any) => void) => CallBack

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
 * *  author: jeongbaebang
 * @example
 * ```ts
  const func = trueCallBack((arg: string) =>
    console.log(`참이면 로그가 실행됩니다. 넘어온 인자: ${arg}`)
  )

  func(true, "apple") // "참이면 로그가 실행됩니다. 넘어온 인자: apple"
  func(false, "rich") // (실행되지 않음)
 * ```
 */

export const trueCallBack: TrueCallBack = (f) => (arg0, arg1) =>
  arg0 ? f(arg1) : undefined
