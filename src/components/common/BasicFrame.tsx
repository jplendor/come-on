/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"

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
  arg1: [() => JSX.Element, (arg0: any) => JSX.Element]
) => JSX.Element = (
  { data: info, isLoading, isSuccess, isError },
  [Skeleton, Component]
) => {
  let content
  if (isError || isLoading) content = <Skeleton />
  if (isSuccess) content = <Component info={info.data} />
  return content as JSX.Element
}

export default Basicframe
