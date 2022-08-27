/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useNavigate } from "react-router-dom"
import { Url } from "types/auth"

const useNavigateUrl = () => {
  const navigate = useNavigate()
  const goUrl = (url: Url) => navigate(url, { replace: true })
  return { goUrl }
}

export default useNavigateUrl
