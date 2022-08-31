import { Alert } from "@mui/material"
import React, { useEffect } from "react"

import { RedirectURLProps } from "types/auth"

/**
 * @param url 특정페이지로 이동시킬 URL을 입력한다.
 * @returns 특정 페이지로 페이지가 이동된다.
 */

const RedirectURL = ({ url }: RedirectURLProps): JSX.Element => {
  useEffect(() => {
    window.location.href = url
  }, [url])

  return <Alert severity="info">Redirecting...</Alert>
}

export default RedirectURL
