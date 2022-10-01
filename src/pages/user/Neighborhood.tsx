import React, { useEffect } from "react"

import useNavigate from "hooks/navigate/useNavigate"
import CardLayout from "components/common/card/cardLayout"

const NeighborhoodCourse = (): JSX.Element => {
  const { setIndexDispatch } = useNavigate()
  useEffect(() => setIndexDispatch(0))
  return <CardLayout type="Neighborhood" />
}

export default NeighborhoodCourse
