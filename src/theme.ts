import { red } from "@mui/material/colors"
import { createTheme } from "@mui/material/styles"

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#92B4EC",
    },
    secondary: {
      main: "#FFD24C",
    },
    // TODO: 색 정하기
    error: {
      main: red.A400,
    },
  },
})

export default theme
