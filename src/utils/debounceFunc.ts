/* eslint-disable import/prefer-default-export */

/*
callback :  지연시키고자 하는 함수,  value 는 사용자가 입력하는 값
delay : 지연시키고자 하는 시간 (ms)
사용방법 : debounceFunc((value: string) => onKeyPress(value), DELAY),
사용자가 입력한 시간이 지난후에 함수를 실행합니다.
*/
const debounceFunc = (
  callback: (value: string) => void,
  delay: number
): ((v: string) => void) => {
  let timer: ReturnType<typeof setTimeout>

  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => callback(args[0]), delay)
  }
}

export { debounceFunc }
