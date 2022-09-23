import React from "react"
import { Grid, Stack } from "@mui/material"

import Basicframe, { QueryProps } from "components/common/BasicFrame"
import { useGetCourseListQuery } from "features/course/courseSlice"
import { CardItemSkeletons } from "components/common/card/CardItemSkeleton"
import CardItems from "components/common/card/CardItems"
import { CourseListRes } from "types/API/course-service"
import useGeolocation from "hooks/geolocation/useGeolocation"

interface CourseListQueryProps extends QueryProps {
  data: CourseListRes
}

const NeighborhoodCourseList = (): JSX.Element => {
  // const {
  //   geoState: {
  //     info: { lat, lng },
  //   },
  // } = useGeolocation()

  const getCourseListQuery = useGetCourseListQuery({
    size: 40,
  }) as CourseListQueryProps
  const Content = Basicframe(getCourseListQuery, [CardItemSkeletons, CardItems])

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
          py: "21px",
        }}
      >
        {Content}
      </Stack>
    </Grid>
  )
}

export default NeighborhoodCourseList
