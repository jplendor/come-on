/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useSearchParams } from "react-router-dom"
import { ParamName } from "types/auth"

const useSearchParamByToken = () => {
  const [params, setParams] = useSearchParams()
  const getTokenParam = () => params.get(ParamName.token)
  const removeTokenParam = () => setParams("", { replace: true })
  return {
    getTokenParam,
    removeTokenParam,
  }
}

export default useSearchParamByToken
