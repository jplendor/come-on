import React from "react"
import styled from "@emotion/styled"

const Div = styled.div`
    width:"500px",
    height:"400px"
`

const Map: React.FC = () => {
  const script = document.createElement("script")
  script.src =
    "//dapi.kakao.com/v2/maps/sdk.js?appkey=adbcfa676b0f078b4cdbd17ba0931de8"
  script.type = "text/javascript"
  script.async = true
  document.body.appendChild(script)

  return (
    <>
      <Div id="Map" />
      <script />
    </>
  )
}

export default Map
