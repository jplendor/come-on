import { useCallback } from "react"
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useLocalstorageState } from "rooks"
import { LocalstorageName, PreviousPathname } from "types/auth"

const useSavePath = () => {
  const [pathName, setPathName, removePathName] =
    useLocalstorageState<PreviousPathname>(LocalstorageName.path)
  const getPreviousPathName = useCallback(() => pathName, [pathName])
  const removePreviousPathName = useCallback(
    () => removePathName(),
    [removePathName]
  )
  const setPreviousPathName = useCallback(
    (arg: PreviousPathname) => setPathName(arg),
    [setPathName]
  )

  return {
    getPreviousPathName,
    setPreviousPathName,
    removePreviousPathName,
  }
}

export default useSavePath
