import { styled } from "@mui/material/styles"
import { Typography, TypographyProps } from "@mui/material"
import { ThemeLoginButton } from "components/common/Buttons"

export const ThemeKaKaoButton = styled(ThemeLoginButton)(() => ({
  backgroundColor: "#FAE64C",
  "&:hover": {
    backgroundColor: "#FAE64C",
  },
}))

export const KakaoBtnText = styled(Typography)<TypographyProps>(
  ({
    theme: {
      grayscale,
      textStyles: {
        title4: { bold },
      },
    },
  }) => ({
    fontSize: bold.fontSize,
    lineHeight: bold.lineHeight,
    fontWeight: bold.fontWeight,
    color: grayscale.text["900_txt1"],
  })
)
