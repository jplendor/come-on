/* eslint-disable react/jsx-props-no-spreading */
import React from "react"
import { Stack } from "@mui/material"

interface ThemeTabPanelProps {
  index: number
  value: number
  children: React.ReactNode
}

const CourseTap = ({
  value,
  index,
  children,
  ...other
}: ThemeTabPanelProps): JSX.Element => {
  return (
    <section
      role="tabpanel"
      hidden={value !== index}
      id={`course-tabpanel-${index}`}
      aria-labelledby={`course-tab-${index}`}
      {...other}
      style={{ overflowY: "auto", overflowX: "hidden" }}
    >
      {value === index && (
        <Stack
          spacing={2}
          sx={{
            padding: "21px",
          }}
        >
          {children}
        </Stack>
      )}
    </section>
  )
}

export default CourseTap
