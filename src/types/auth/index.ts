export enum LocalstorageName {
  path = "previous-pathname",
}

export enum Url {
  home = "/",
  login = "/auth/login",
}

export enum ParamName {
  token = "token",
}

export type CheckURL = (url: string | object) => string

export type UrlRoute = <T>(
  authState: T,
  f: (
    arg: T,
    go: <CallBackRetrunType>(a: boolean, b: CallBackRetrunType) => void
  ) => void
) => void

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
