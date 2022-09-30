import React from "react"
import { Button } from "@mui/material"

const BUTTON_STYLE = {
  width: "100%",
  height: "50px",
  lineHeight: "50px",
  margin: "14px 0",
  color: "white",
  fontWeight: "800",
  fontSize: "1rem",
}

// ButtonComponent의 type 설정
interface ButtonProps {
  content: string
  isValid?: boolean
  onClick: () => void
}

const CourseNextStepButton: React.FC<ButtonProps> = ({
  content,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick = () => {},
  isValid,
}): JSX.Element => {
  return (
    <Button
      sx={BUTTON_STYLE}
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
}
