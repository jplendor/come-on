/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"

import { api } from "features/api/apiSlice"
import { Button, Stack } from "@mui/material"

const imgApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    upload: builder.mutation<any, FormData>({
      query: (img) => ({
        url: "/profile-image",
        method: "POST",
        body: img,
      }),
      invalidatesTags: ["User"],
    }),
  }),
})

const { useUploadMutation } = imgApiSlice

// 이미지 보내기 위한 임시 처리 [테스트용]
// 추후에 리덕스 성크로 처리를 위임해도 될듯하다
const UploadButton = (): any => {
  const [upload, { isSuccess }] = useUploadMutation()
  const handleFileUpload = async (target: any): Promise<any> => {
    if (!target) return
    const imageData = new FormData()
    imageData.append("imgFile", target.files[0])
    try {
      await upload(imageData).unwrap()
    } catch (error) {
      console.error("rejected", error)
    }
  }
  if (isSuccess) console.log("이미지 업로드 성공")

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Button variant="contained" component="label">
        Upload
        <input
          hidden
          accept="image/*"
          multiple
          type="file"
          onChange={(e) => handleFileUpload(e.target)}
        />
      </Button>
    </Stack>
  )
}

export default UploadButton
