import { styled } from "@mui/material/styles"
import { Button, ButtonProps } from "@mui/material"
import { LoadingButton, LoadingButtonProps } from "@mui/lab"

const BUTTON = {
  gap: "8px",
  height: "58px",
  borderRadius: "8px",
  padding: "18px 18px",
}
export const LoginButton = styled(Button)<ButtonProps>(() => BUTTON)
export const LoginLoadingButton = styled(LoadingButton)<LoadingButtonProps>(
  ({ theme: { grayscale } }) => ({
    ...BUTTON,
    backgroundColor: grayscale[300],
  })
)
