import { styled } from "@mui/material/styles"
import { Button, ButtonProps } from "@mui/material"
import { LoadingButton, LoadingButtonProps } from "@mui/lab"

const BUTTON = {
  gap: "8px",
  height: "58px",
  borderRadius: "8px",
  padding: "18px 18px",
}

export const ThemeLoginButton = styled(Button)<ButtonProps>(() => BUTTON)

export const ThemeLoadingButton = styled(LoadingButton)<LoadingButtonProps>(
  () => ({
    ...BUTTON,
    backgroundColor: "#e0e0e0",
  })
)
