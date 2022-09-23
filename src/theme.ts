import { LinkProps } from "@mui/material"
import { createTheme } from "@mui/material/styles"
import { LinkBehavior } from "components/nav/Link"

interface Grayscale {
  "900": "#212121"
  "800": "#424242"
  "700": "#616161"
  "600": "#757575"
  "500": "#9E9E9E"
  "400": "#BDBDBD"
  "300": "#E0E0E0"
  "200": "#EEEEEE"
  "100": "#F5F5F5"
  "50": "#FAFAFA"
}

type Typography =
  | "title1"
  | "title2"
  | "title3"
  | "title4"
  | "body1"
  | "body2"
  | "body3"
  | "caption"

interface regular {
  fontSize: string
  lineHeight: string
}

interface bold {
  fontSize: string
  lineHeight: string
  fontWeight: string
}

const TYPOGRAPHYS = {
  title1: {
    regular: {
      fontSize: "26px",
      lineHeight: "34px",
    },
    bold: {
      fontSize: "26px",
      lineHeight: "130%",
      fontWeight: "700",
    },
  },
  title2: {
    regular: {
      fontSize: "22px",
      lineHeight: "28px",
    },
    bold: {
      fontSize: "22px",
      lineHeight: "125%",
      fontWeight: "700",
    },
  },
  title3: {
    regular: {
      fontSize: "18px",
      lineHeight: "24px",
    },
    bold: {
      fontSize: "18px",
      lineHeight: "135%",
      fontWeight: "700",
    },
  },
  title4: {
    regular: {
      fontSize: "16px",
      lineHeight: "22px",
    },
    bold: {
      fontSize: "16px",
      lineHeight: "140%",
      fontWeight: "700",
    },
  },
  body1: {
    regular: {
      fontSize: "14px",
      lineHeight: "20px",
    },
    bold: {
      fontSize: "14px",
      lineHeight: "140%",
      fontWeight: "700",
    },
  },
  body2: {
    regular: {
      fontSize: "13px",
      lineHeight: "19px",
    },
    bold: {
      fontSize: "13px",
      lineHeight: "145%",
      fontWeight: "700",
    },
  },
  body3: {
    regular: {
      fontSize: "12px",
      lineHeight: "18px",
    },
    bold: {
      fontSize: "12px",
      lineHeight: "150%",
      fontWeight: "700",
    },
  },
  caption: {
    regular: {
      fontSize: "10px",
      lineHeight: "14px",
    },
    bold: {
      fontSize: "10px",
      lineHeight: "140%",
      fontWeight: "700",
    },
  },
} as const

const GRAYSCALES: Grayscale = {
  "900": "#212121",
  "800": "#424242",
  "700": "#616161",
  "600": "#757575",
  "500": "#9E9E9E",
  "400": "#BDBDBD",
  "300": "#E0E0E0",
  "200": "#EEEEEE",
  "100": "#F5F5F5",
  "50": "#FAFAFA",
} as const

declare module "@mui/material/styles" {
  interface Theme {
    grayscale: Grayscale
    textStyles: {
      [Key in Typography]: {
        regular: regular
        bold: bold
      }
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    grayscale: Grayscale
    textStyles: {
      [Key in Typography]: {
        regular: regular
        bold: bold
      }
    }
  }
}

const theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
  grayscale: GRAYSCALES,
  textStyles: TYPOGRAPHYS,
  typography: {
    fontFamily: [
      "Pretendard",
      "-apple-system",
      "BlinkMacSystemFont",
      "system-ui",
      "Roboto",
      "'Helvetica Neue'",
      "'Segoe UI'",
      "'Apple SD Gothic Neo'",
      "'Noto Sans KR'",
      "'Malgun Gothic'",
      "'Apple Color Emoji'",
      "'Segoe UI Emoji'",
      "'Segoe UI Symbol'",
      "sans-serif",
    ].join(","),
    allVariants: {
      color: "#000000",
      fontWeight: "400",
      fontStyle: "normal",
    },
  },
  palette: {
    primary: {
      main: "#337FFE",
    },
    secondary: {
      main: "#FFC724",
    },
    warning: {
      main: "#F05E51",
    },
    info: {
      main: "#24ABE4",
    },
    success: {
      main: "#20BD4A",
    },
  },
})

export default theme
