/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useNavigate } from "react-router-dom"
import { GoUrl } from "types/auth"

const useNavigateUrl = () => {
  const navigate = useNavigate()
  const goUrl: GoUrl = ({ url, option = {} }) =>
    navigate(url, { ...option, replace: true })
  return { goUrl }
}

export default useNavigateUrl
