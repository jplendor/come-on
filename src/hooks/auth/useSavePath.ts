/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useLocalstorageState } from "rooks"
import { LocalstorageName, PreviousPathname } from "types/auth"

const useSavePath = () => {
  const [pathName, setPathName, removePathName] =
    useLocalstorageState<PreviousPathname>(LocalstorageName.path)
  const getPreviousPathName = () => pathName
  const removePreviousPathName = () => removePathName()
  const setPreviousPathName = (arg: PreviousPathname) => setPathName(arg)
  return {
    getPreviousPathName,
    setPreviousPathName,
    removePreviousPathName,
  }
}

export default useSavePath
