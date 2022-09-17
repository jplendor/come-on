import React from "react"
import { Button } from "@mui/material"

const BUTTON_STYLE = {
  width: "100%",
  height: "50px",
  lineHeight: "50px",
  marginBottom: "10px",
  color: "white",
  fontWeight: "800",
  fontSize: "1rem",
}

// ButtonComponent의 type 설정
interface ButtonProps {
  content: string
  onClick?: () => void
}

const CourseNextStepButton: React.FC<ButtonProps> = ({
  content,
  onClick,
}): JSX.Element => {
  return (
    <Button sx={BUTTON_STYLE} variant="contained" onClick={onClick}>
      {content}
    </Button>
  )
}

// optional param 인 onClick의 defaultProps 설정
//* * console안찍고 void로 하고싶은데 방법좀 ㅠㅠ */
CourseNextStepButton.defaultProps = {
  onClick: (): void => {
    console.log("")
  },
}

export default CourseNextStepButton
