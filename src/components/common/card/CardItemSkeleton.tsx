import React from "react"
import { Box, Skeleton, Stack } from "@mui/material"

export const CardItemSkeleton = (): JSX.Element => (
  <Box
    sx={{
      height: "240px",
      maxHeight: "350px",
    }}
  >
    <Skeleton
      variant="rounded"
      width={350}
      height={180}
      sx={{ borderRadius: "6px" }}
    />
    <Skeleton width={250} height={30} />
    <Stack direction="row" spacing={1}>
      <Skeleton width={80} height={20} />
      <Skeleton width={80} height={20} />
    </Stack>
  </Box>
)

export const CardItemSkeletons = (): JSX.Element => (
  <>
    <CardItemSkeleton />
    <CardItemSkeleton />
    <CardItemSkeleton />
  </>
)
