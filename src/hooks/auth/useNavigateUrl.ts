import { useCallback } from "react"
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useNavigate } from "react-router-dom"
import { GoUrl } from "types/auth"

const useNavigateUrl = () => {
  const navigate = useNavigate()
  const goUrl: GoUrl = useCallback(
    ({ url, option = {} }) => navigate(url, { ...option, replace: true }),
    [navigate]
  )
  return { goUrl }
}

export default useNavigateUrl
