import React, { useEffect } from "react"

import useAuth from "hooks/auth/useAuth"
import KakaoIcon from "assets/nav/KakaoIcon"
import { RedirectURLProps, Url } from "types/auth"
import useNavigateUrl from "hooks/auth/useNavigateUrl"
import { ThemeLoadingButton } from "components/common/Buttons"

/**
 * @param url 특정페이지로 이동시킬 URL을 입력한다.
 * @returns 특정 페이지로 페이지가 이동된다.
 */

const RedirectURL = ({ url }: RedirectURLProps): JSX.Element => {
  const { goUrl } = useNavigateUrl()
  const {
    LoginStatus: { isloggedin },
  } = useAuth()
  useEffect(() => {
    return isloggedin ? goUrl({ url: Url.home }) : window.location.replace(url)
  }, [isloggedin, goUrl, url])

  return (
    <ThemeLoadingButton
      loading
      fullWidth
      variant="outlined"
      loadingPosition="start"
      startIcon={<KakaoIcon />}
    >
      Redirecting...
    </ThemeLoadingButton>
  )
}

export default RedirectURL
