import React from "react"
import { Grid, Skeleton, Stack } from "@mui/material"

const ProfileInfoSkeleton = (): JSX.Element => {
  return (
    <Stack
      component="article"
      alignItems="center"
      justifyContent="center"
      sx={{
        height: "125px",
      }}
      spacing={1}
    >
      <Grid justifyContent="center">
        <Skeleton variant="circular" width={70} height={70} />
      </Grid>
      <Skeleton
        width={140}
        height={25}
        sx={{
          paddingTop: "8px",
        }}
      />
      <Skeleton width={95} height={20} />
    </Stack>
  )
}

const ProfileNicknameSkeleton = (): JSX.Element => {
  return (
    <Stack
      component="article"
      sx={{
        mt: "16px",
        px: "20px",
      }}
    >
      <Grid container pb={1}>
        <Grid item xs>
          <Skeleton width={73} height={18} />
        </Grid>
        <Grid item xs={7} />
        <Grid item xs>
          <Skeleton width={73} height={18} />
        </Grid>
      </Grid>
      <Skeleton
        variant="rounded"
        height={27}
        sx={{
          gap: "10px",
          padding: "12px",
        }}
      />
    </Stack>
  )
}

const ProfileSkeleton = (): JSX.Element => {
  return (
    <>
      <ProfileInfoSkeleton />
      <ProfileNicknameSkeleton />
    </>
  )
}

export default ProfileSkeleton
