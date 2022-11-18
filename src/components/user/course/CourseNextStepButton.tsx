import React, { ReactNode } from "react"
import { Button } from "@mui/material"

const BUTTON_STYLE = [
  {
    width: "100%",
    height: "50px",
    lineHeight: "50px",
    margin: "14px 0",
    color: "white",
    fontWeight: "800",
    fontSize: "1rem",
  },
]

// ButtonComponent의 type 설정
interface ButtonProps {
  children?: ReactNode
  content: string
  width?: string
  isValid?: boolean
  btnStyle?: object
  onClick: () => void
}

const CourseNextStepButton: React.FunctionComponent<ButtonProps> = ({
  children,
  content,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick = () => {},
  isValid,
  width,
  btnStyle,
}): JSX.Element => {
  return (
    <Button
      sx={{ ...BUTTON_STYLE[0], width, btnStyle }}
      className="nextButton"
      variant="contained"
      disabled={!isValid}
      onClick={onClick}
    >
      {content}
    </Button>
  )
}

export default CourseNextStepButton
CourseNextStepButton.defaultProps = {
  isValid: false,
  btnStyle: BUTTON_STYLE,
  width: "100%",
  children: "",
}
