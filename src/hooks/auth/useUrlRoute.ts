import { useCallback } from "react"
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { hof } from "utils"
import { UrlRoute } from "types/auth"

import useNavigateUrl from "./useNavigateUrl"

const useUrlRoute = () => {
  const { goUrl } = useNavigateUrl()
  const go = hof(goUrl)
  const urlRoute: UrlRoute = useCallback(
    (authState, f) => f(authState, go),
    [go]
  )
  return { urlRoute }
}

export default useUrlRoute
