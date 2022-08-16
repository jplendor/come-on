import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Grid } from "@mui/material"
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
  FiberManualRecordRounded,
} from "@mui/icons-material"

import { generateComponent } from "../../utils"

interface NavigationBarProps {
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
  minPage: number
  maxPage: number
}

const NavigationBar = ({
  currentPage: currentPageProp,
  setCurrentPage,
  minPage,
  maxPage,
}: NavigationBarProps): JSX.Element => {
  const ACTIVE = {
    color: "#FFC700",
  }

  const UNACTIVE = {
    color: "#D9D9D9",
  }

  const [arrowBtnStyle, setArrowBtnStyle] = useState([UNACTIVE, UNACTIVE])
  const [dotStyle, setDotStyle] = useState(new Array(maxPage).fill(UNACTIVE))

  const GRID_CONTAINER = {
    p: "5px",
    height: "50px",
    color: "#D9D9D9",
  }

  const GRID_ITEM = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }

  const DOT = {
    mx: "10px",
  }

  enum ArrowType {
    Back = "back",
    Forward = "forward",
  }

  const handleArrowBtnClick = (type: ArrowType): void => {
    if (type === ArrowType.Back && currentPageProp > minPage) {
      setCurrentPage(currentPageProp - 1)
    }
    if (type === ArrowType.Forward && currentPageProp < maxPage) {
      setCurrentPage(currentPageProp + 1)
    }
  }

  interface style {
    color: string
  }

  const setStyle = (
    nextArrowBtnStyle: Array<style>,
    nextDotStyle: Array<style>
  ): void => {
    setArrowBtnStyle(nextArrowBtnStyle)
    setDotStyle(nextDotStyle)
  }

  const makeStyleChanger = (
    style1: style,
    style2: style
  ): typeof styleChanger => {
    const styleChanger = (currentPage: number): void => {
      setStyle(
        [
          currentPage === minPage ? style2 : style1,
          currentPage === maxPage ? style2 : style1,
        ],
        new Array(maxPage)
          .fill(style2)
          .map((v, i) => (currentPage - 1 === i ? style1 : v))
      )
    }
    return styleChanger
  }

  const changeStyle = makeStyleChanger(ACTIVE, UNACTIVE)

  useEffect(() => {
    changeStyle(currentPageProp)
  }, [currentPageProp])

  return (
    <Grid container sx={GRID_CONTAINER}>
      <Grid
        item
        sx={{ ...GRID_ITEM, ...arrowBtnStyle[0] }}
        xs={2}
        onClick={() => handleArrowBtnClick(ArrowType.Back)}
      >
        <ArrowBackIosOutlined />
      </Grid>
      <Grid item sx={GRID_ITEM} xs={8}>
        {generateComponent(
          [...new Array(maxPage)].map((v, i) => i),
          (data, key) => (
            <FiberManualRecordRounded
              key={key}
              fontSize="small"
              sx={{ ...DOT, ...dotStyle[data] }}
            />
          )
        )}
      </Grid>
      <Grid
        item
        sx={{ ...GRID_ITEM, ...arrowBtnStyle[1] }}
        xs={2}
        onClick={() => handleArrowBtnClick(ArrowType.Forward)}
      >
        <ArrowForwardIosOutlined />
      </Grid>
    </Grid>
  )
}

export default NavigationBar
