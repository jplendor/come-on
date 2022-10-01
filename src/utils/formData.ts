import { ChangeEvent } from "react"

export const createFormData: <T extends string | Blob>(
  payload: [string, T][]
) => FormData = (payload) => {
  const formData = new FormData()
  payload.forEach(([name, value]) => formData.append(name, value))
  return formData
}

export const createImgFormData = ({
  target,
}: ChangeEvent<HTMLInputElement>): FormData | undefined => {
  if (!target.files) return undefined
  return createFormData([["imgFile", target.files[0]]])
}
