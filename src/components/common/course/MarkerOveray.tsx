import React, { useEffect, useState, useCallback } from "react"
import "./Customoverlay.css"

export interface MapProps {
  title: string
  position: any
  order: number
  apiId: number
}

const MarkerOveray = (
  { title, position, order, apiId }: MapProps,
  tf: boolean,
  index: number
): JSX.Element => {
  return (
    <div className="customoverlay">
      <a
        href={`https://map.kakao.com/link/map/${apiId}`}
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
