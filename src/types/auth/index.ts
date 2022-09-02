/* eslint-disable @typescript-eslint/no-explicit-any */

export enum LocalstorageName {
  path = "previous-pathname",
}

export enum Url {
  home = "/",
  login = "/auth/login",
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
  }
}

export type UrlRoute = <T>(
  authState: T,
  f: (arg: T, go: (a: boolean, b: Navigate) => void) => void
) => void

export type GoUrl = (navigate: Navigate) => void

export interface AuthParams {
  token: string
  expiry: string
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

export interface RedirectURLProps {
  url: string
}

export interface RequireAuthProps {
  children: JSX.Element
}

export interface SocialLoginProps {
  children: JSX.Element
}
