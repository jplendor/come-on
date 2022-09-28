import React, { useEffect, useState, useCallback } from "react"
import "./Customoverlay.css"

export interface MapProps {
  title: string
  position: any
  order: number
}

const MarkerOveray = (
  { title, position, order }: MapProps,
  tf: boolean,
  index: number
): JSX.Element => {
  return (
    <div className="customoverlay">
      <a
        href="https://map.kakao.com/link/map/11394059"
        target="_blank"
        rel="noreferrer"
      >
        <div className="number" />
        <div className="order">{order}</div>
      </a>
    </div>
  )
}

export default MarkerOveray
