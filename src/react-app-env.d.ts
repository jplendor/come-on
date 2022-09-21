/// <reference types="react-scripts" />

interface Window {
  kakao: any
}

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_SECRET_KEY: string
    REACT_APP_CLIENT_URL: string
    REACT_APP_SERVER_URL: string

    REACT_APP_APIKEY: string
    REACT_APP_AUTHDOMAIN: string
    REACT_APP_PROJECTID: string
    REACT_APP_STORAGEBUCKET: string
    REACT_APP_MESSAGINGSENDERID: string
    REACT_APP_APPID: string
    REACT_APP_MEASUREMENTID: string
  }
}
