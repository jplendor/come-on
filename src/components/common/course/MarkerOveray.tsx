import React from "react"
import "./Customoverlay.css"

export interface MapProps {
  // eslint-disable-next-line react/no-unused-prop-types
  order: number
  title: string
  position: any
}

const MarkerOveray = (
  { title, position, order }: MapProps,
  tf: boolean,
  index: number
): JSX.Element => {
  return (
    <a
      href="https://map.kakao.com/link/map/11394059"
      target="_blank"
      rel="noreferrer"
    >
      <div className="number" />

      <div className="order">{order}</div>
    </a>
  )
}

export default MarkerOveray
