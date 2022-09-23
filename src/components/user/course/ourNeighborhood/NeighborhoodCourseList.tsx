import React from "react"
import { Grid, Stack } from "@mui/material"

import CardItem from "components/common/card/CardItem"

interface NeighborhoodCourseProps {
  info: {
    img: {
      src: string
      alt: string
    }
    isLike: boolean
    texts: {
      title: string
      userName: string
      time: string
    }
  }
}
const NeighborhoodCourseList = ({
  info,
}: NeighborhoodCourseProps): JSX.Element => {
  return (
    <Grid
      item
      container
      wrap="nowrap"
      direction="column"
      component="section"
      sx={{
        maxHeight: "585px",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <Stack
        spacing={2}
        sx={{
          // padding: "21px",
          py: "21px",
        }}
      >
        <CardItem info={info} />
        <CardItem info={info} />
        <CardItem info={info} />
        <CardItem info={info} />
        <CardItem info={info} />
      </Stack>
    </Grid>
  )
}

export default NeighborhoodCourseList
