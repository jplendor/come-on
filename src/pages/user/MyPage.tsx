import React, { useEffect } from "react"

import useNavigate from "hooks/navigate/useNavigate"
import CardLayout from "components/common/card/cardLayout"

const MyPage = (): JSX.Element => {
  const { setIndexDispatch } = useNavigate()
  useEffect(() => setIndexDispatch(2))
  return <CardLayout type="MyPage" />
}

export default MyPage
