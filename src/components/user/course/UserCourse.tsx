import React, { SyntheticEvent } from "react"
import { Grid } from "@mui/material"

import CourseTaps from "./CourseTaps"
import CourseLiked from "./CourseLiked"
import CourseShared from "./CourseShared"

const UserCourse = (): JSX.Element => {
  const [currentIndex, setIndex] = React.useState(0)
  const handleChange = (_event: SyntheticEvent, newValue: number): void =>
    setIndex(newValue)

  return (
    <Grid
      item
      container
      wrap="nowrap"
      direction="column"
      component="section"
      sx={{
        // 21.250em -> 340px
        maxHeight: "21.250em",
      }}
    >
      {/* TAPS */}
      <CourseTaps value={currentIndex} onChangeHandler={handleChange} />

      {/*  내가 공유한 코스 리스트 */}
      <CourseShared value={currentIndex} />

      {/* 좋아요한 코스 리스트 */}
      <CourseLiked value={currentIndex} />
    </Grid>
  )
}

export default UserCourse
