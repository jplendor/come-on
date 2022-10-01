import React, { useEffect } from "react"

import useNavigate from "hooks/navigate/useNavigate"
import CardLayout from "components/common/card/cardLayout"

const ManagingMeetings = (): JSX.Element => {
  const { setIndexDispatch } = useNavigate()
  useEffect(() => setIndexDispatch(1))
  return <CardLayout type="Meeting" />
}

export default ManagingMeetings
