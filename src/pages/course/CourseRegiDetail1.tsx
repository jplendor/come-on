import React, {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useCallback,
} from "react"
import { Grid } from "@mui/material"
import CourseNextStepButton from "components/user/course/CourseNextStepButton"

import TextInput from "components/common/input/TextInput"
import ImageInput from "components/common/input/ImageInput"

import {
  setCourseDetail,
  useAddCourseDetailMutation,
  useAddCoursePlaceMutation,
} from "features/course/courseSlice"

import { useDispatch } from "react-redux"

interface pageProps {
  page: number
  setPage: Dispatch<SetStateAction<number>>
  setCourseId: Dispatch<SetStateAction<number>>
}

const MAIN_CONTAINER = {
  padding: "20px",
}

const CourseRegiDetail = ({
  setCourseId,
  setPage,
  page,
}: pageProps): JSX.Element => {
  const dispatch = useDispatch()

  const [addCoursePlace] = useAddCoursePlaceMutation()
  const [addCourseDetail] = useAddCourseDetailMutation()
  const [isValid, setIsValid] = useState(false)
  const [image, setImage] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [imageFile, setImageFile] = useState<Blob>()

  // const encodeFileToBase64 = (fileBlob: Blob): Promise<void> => {
  //   const reader = new FileReader()
  //   reader.readAsDataURL(fileBlob)
  //   return new Promise<void>((resolve) => {
  //     reader.onload = () => {
  //       if (!reader.result) {
  //         throw new Error("No img result")
  //       }
  //       resolve(setImageSrc(reader.result))
  //     }
  //   })
  // }

  const changeFileToObjectUrl = (file: File): string => {
    const fileUrl = URL.createObjectURL(file)

    console.log(fileUrl)
    return fileUrl
  }

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value)
  }

  const handleChangeDes = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDescription(e.target.value)
  }

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      console.log(e.target.files)
      const a = changeFileToObjectUrl(e.target.files[0])
      setImageFile(e.target.files[0])
      console.log(a)
      setImage(a)
    }
  }

  const onValid = useCallback((): void => {
    if (title === "") return
    if (description === "") return
    if (image === "" || image === "undefined") return
    setIsValid(true)
  }, [description, image, title])

  const changeObjectUrlToFile = async (): Promise<Blob> => {
    const file = await fetch(image || "").then((r) => r.blob())
    return file
  }

  const submitCourseDetail = async (): Promise<number> => {
    const newDetail = new FormData()

    dispatch(setCourseDetail({ title, description, imgFile: image }))

    newDetail.append("title", title)
    newDetail.append("description", description)
    if (image) {
      const imgFile = await changeObjectUrlToFile()
      newDetail.append("imgFile", imgFile)
    }
    const res = await addCourseDetail(newDetail).unwrap()

    console.log(res)

    return Promise.resolve(res.data.courseId)
  }

  const onClickNextPage = async (): Promise<void> => {
    const courseId = await submitCourseDetail()
    setCourseId(courseId)

    setPage(page + 1)
  }

  useEffect(() => {
    onValid()
  }, [image, title, description, onValid])

  return (
    <Grid container spacing={3} sx={MAIN_CONTAINER}>
      <Grid item xs={12}>
        <ImageInput
          title="이미지 등록"
          alt="이미지를 등록해 주세요"
          message="이미지를 등록해 주세요"
          previewImg={String(image)}
          handleChangeImg={onChangeImage}
        />
      </Grid>
      <Grid item xs={12}>
        <TextInput
          title="코스이름"
          name="title"
          value={title}
          placeholder="코스명을 입력해 주세요"
          handleChange={handleChangeTitle}
        />
      </Grid>
      <Grid item xs={12}>
        <TextInput
          multiline
          title="코스설명"
          placeholder="코스설명을 입력해주세요"
          rows={8}
          name="description"
          value={description}
          handleChange={handleChangeDes}
        />
      </Grid>
      <Grid item xs={12}>
        <CourseNextStepButton
          content="다음단계"
          isValid={isValid}
          onClick={onClickNextPage}
        />
      </Grid>
    </Grid>
  )
}

export default CourseRegiDetail
