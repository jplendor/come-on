/* global kakao */
import React, { useEffect } from "react"

declare global {
  interface Window {
    kakao: any
  }
}

const MapContainer: React.FC = () => {
  useEffect(() => {
    const container = document.getElementById("map")
    const options = {
      center: new window.kakao.maps.LatLng(
        37.365264512305174,
        127.10676860117488
      ),
      level: 3,
    }
    const map = new window.kakao.maps.Map(container, options)
  }, [])

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "300px" }} />
    </div>
  )
}
export default MapContainer
