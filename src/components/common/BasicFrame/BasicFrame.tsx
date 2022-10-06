/* eslint-disable @typescript-eslint/no-explicit-any */

import { isObject } from "@fxts/core"
import React from "react"
import { pullingProperty } from "utils"

interface ServerRes {
  responseTime: any
  code: any
  data: any
}

export interface QueryProps {
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
}

interface BasicframeProps extends QueryProps {
  data: ServerRes
}

const Basicframe: <T extends BasicframeProps>(
  arg0: T,
  arg1: [() => JSX.Element, (arg0: any) => JSX.Element | JSX.Element[] | any],
  option?: { height: number }
) => JSX.Element = (
  { data: info, isLoading, isSuccess, isError },
  [Skeleton, Component],
  option
) => {
  const height = pullingProperty(option as { height: number }, ["height"])
  let content = <div />
  if (isError || isLoading) content = <Skeleton />
  if (isSuccess)
    content = (
      <Component
        info={info.data}
        height={isObject(height) ? 585 : parseInt(height, 10)}
      />
    )
  return content
}

export default Basicframe
