/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useSearchParams } from "react-router-dom"

const useSearchParam = () => {
  const [params, setParams] = useSearchParams()
  const getParamAll = () => params.toString()
  const removeParam = () => setParams("", { replace: true })
  return {
    getParamAll,
    removeParam,
  }
}

export default useSearchParam
