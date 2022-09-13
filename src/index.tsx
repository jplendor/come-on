import React from "react"
import { Provider } from "react-redux"
import ReactDOM from "react-dom/client"
import { CookiesProvider } from "react-cookie"
import { BrowserRouter } from "react-router-dom"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import "./index.css"

import theme from "theme"
import checkLoginStatus from "features/auth/checkLoginStatus"

import App from "./App"
import { store } from "./app/store"
import Layout from "./layouts/Layout"
import reportWebVitals from "./reportWebVitals"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
checkLoginStatus()
root.render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <CookiesProvider>
        <Provider store={store}>
          <BrowserRouter>
            <Layout>
              <App />
            </Layout>
          </BrowserRouter>
        </Provider>
      </CookiesProvider>
    </ThemeProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
