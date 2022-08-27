import React from "react"

import { SocialLoginProps } from "types/auth"

/**
 *  여러 개의 소셜 로그인을 받을 수 있게 확장성을 고려하여 컴포넌트를 만들었다.
 */

const SocialLogin = ({ children }: SocialLoginProps): JSX.Element => {
  return <section>{children}</section>
}

export default SocialLogin
