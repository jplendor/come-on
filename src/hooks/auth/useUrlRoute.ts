/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { UrlRoute } from "types/auth"
import { hof } from "utils"

import useNavigateUrl from "./useNavigateUrl"

const useUrlRoute = () => {
  const { goUrl } = useNavigateUrl()
  const go = hof(goUrl)
  const urlRoute: UrlRoute = (authState, f) => f(authState, go)
  return { urlRoute }
}

export default useUrlRoute
