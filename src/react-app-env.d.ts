/// <reference types="react-scripts" />

interface Window {
  kakao: any
}

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_SECRET_KEY: string
    REACT_APP_CLIENT_URL: string
    REACT_APP_SERVER_URL: string
  }
}
