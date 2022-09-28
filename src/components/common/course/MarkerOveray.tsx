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
        <span className="title">{title}</span>
        {tf ? (
          <span className="number" style={{ backgroundColor: "#FFD24C" }} />
        ) : (
          <span className="number">{order + 1}</span>
        )}
      </a>
    </div>
  )
}

export default MarkerOveray
