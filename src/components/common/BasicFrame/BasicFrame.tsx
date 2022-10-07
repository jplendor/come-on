/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"

import { Option } from "hooks/course/InfiniteLoader"

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
  option?: Option
) => JSX.Element = (
  { data: info, isLoading, isSuccess, isError },
  [Skeleton, Component],
  option
) => {
  let content = <div />
  if (isError || isLoading) content = <Skeleton />
  if (isSuccess) content = <Component info={info.data} option={option} />
  return content
}

export default Basicframe
