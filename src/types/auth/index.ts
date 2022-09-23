/* eslint-disable @typescript-eslint/no-explicit-any */

export enum LocalstorageName {
  path = "previous-pathname",
  Img = "previous-profile-img",
  navigate = "previous-navigate",
}

export enum Url {
  home = "/",
  login = "/auth/login",
  myPage = "/user/my-page",
  myMeetings = "/user/my-meetings",
}

export enum ParamName {
  token = "token",
  expiry = "expiry",
}

export type CheckURL = (url: string | object) => string

export type Navigate = {
  url: Url
  option?: {
    state?: any
    replace?: boolean
  }
}

export type UrlRoute = <T>(
  authState: T,
  f: (arg: T, go: (a: boolean, b: Navigate) => void) => void
) => void

export type GoUrl = (navigate: Navigate) => void

export interface SliceStatus {
  status: "idle" | "pending" | "succeeded" | "failed"
}

export interface AuthParams {
  token: string
  expiry: string
  userId: string
}

export interface Location {
  state: {
    from: {
      pathname: string
    }
  }
}

export interface PreviousPathname {
  from: {
    pathname: string
  }
}

export interface RequireAuthProps {
  children: JSX.Element
}

export interface SocialLoginProps {
  children: JSX.Element
}
