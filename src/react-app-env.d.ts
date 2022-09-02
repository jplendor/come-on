/// <reference types="react-scripts" />

interface Window {
  kakao: any
}

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_SECRET_KEY: string
  }
}
