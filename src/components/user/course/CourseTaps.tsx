/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactNode, SyntheticEvent } from "react"
import { styled } from "@mui/material/styles"
import { Box, Tab, Tabs } from "@mui/material"
import type { TabsProps } from "@mui/material"

interface StyledTabsProps extends TabsProps {
  value: number
  children?: ReactNode
  onChange: (event: SyntheticEvent, newValue: number) => void
}

const ThemeTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))(
  ({
    theme: {
      palette: { primary },
    },
  }) => ({
    "& .MuiTabs-flexContainer": {
      flexWrap: "wrap",
      justifyContent: "space-evenly",
    },
    "& .MuiTabs-indicator": {
      display: "flex",
      justifyContent: "center",
      backgroundColor: "transparent",
    },
    "& .MuiTabs-indicatorSpan": {
      height: "2px",
      width: "91px",
      backgroundColor: primary.main,
    },
  })
)

interface ThemeTabProps {
  label: string
}

const ThemeTab = styled((props: ThemeTabProps) => <Tab {...props} />)(
  ({
    theme: {
      grayscale,
      textStyles: {
        body1: { bold, regular },
      },
      palette: { primary },
    },
  }) => ({
    gap: "10px",
    width: "10.500em",
    padding: "0px 10px",
    color: grayscale[700],
    fontSize: regular.fontSize,
    lineHeight: regular.lineHeight,
    "&.Mui-selected": {
      color: primary.main,
      fontSize: bold.fontSize,
      fontWeight: bold.fontWeight,
      lineHeight: bold.lineHeight,
    },
  })
)

const a11yProps = (index: number): object => {
  return {
    id: `course-tab-${index}`,
    "aria-controls": `course-tabpanel-${index}`,
  }
}

interface CourseTapsProps {
  value: number
  onChangeHandler: (event: React.SyntheticEvent, newValue: number) => void
}

const [tab1, tab2] = ["내가 공유한 코스", "좋아요한 코스"]

const CourseTaps = ({
  value,
  onChangeHandler,
}: CourseTapsProps): JSX.Element => (
  <Box sx={{ borderBottom: "1px solid #EEEEEE" }} component="nav">
    <ThemeTabs
      value={value}
      onChange={onChangeHandler}
      aria-label="basic tabs example"
    >
      <ThemeTab label={tab1} {...a11yProps(0)} />
      <ThemeTab label={tab2} {...a11yProps(1)} />
    </ThemeTabs>
  </Box>
)
export default CourseTaps
