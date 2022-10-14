/* eslint-disable react-hooks/rules-of-hooks */
import React, {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
} from "react"
import { Grid } from "@mui/material"
import CourseNextStepButton from "components/user/course/CourseNextStepButton"

import TextInput from "components/common/input/TextInput"
import ImageInput from "components/common/input/ImageInput"
import {
  CourseDetailProps,
  setCourseDetail,
  useGetCourseDetailQuery,
  useUpdateCourseDetailMutation,
} from "features/course/courseSlice"

import { CourseData, CourseDetailResponse } from "types/API/course-service"

import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { Description } from "@mui/icons-material"

interface pageProps {
  page: number
  id: number
  setPage: Dispatch<SetStateAction<number>>
}

const CourseEditDetail1 = ({ setPage, page, id }: pageProps): JSX.Element => {
  const { data: res, isSuccess, isFetching } = useGetCourseDetailQuery(id)
  const [image, setImage] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [isValid, setIsValid] = useState(false)
  const [updateCourseDetail, { data: resultUpdate }] =
    useUpdateCourseDetailMutation()
  const [editable, setEditable] = useState(true)

  const onValid = useCallback((): boolean => {
    if (title === "") return false
    if (description === "") return false
    // if (previewImg === "" || previewImg === "undefined") return false
    return true
  }, [title, description, image])

  const changeFileToObjectUrl = (file: File): string => {
    console.log(file)
    const fileUrl = URL.createObjectURL(file)
    return fileUrl
  }

  const changeObjectUrlToFile = async (): Promise<Blob> => {
    const file = await fetch(image || "").then((r) => r.blob())
    return file
  }

  const onChangeImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    setEditable(false)

    if (e.target.files) {
      const a = await changeFileToObjectUrl(e.target.files[0])

      setImage(String(a))
    }
  }

  const onClickNextPage = async (courseId: number): Promise<void> => {
    const newDetail = new FormData()

    newDetail.append("title", title)
    newDetail.append("description", description)
    const imgFile = await changeObjectUrlToFile()
    newDetail.append("imgFile", imgFile)
    updateCourseDetail({
      id: courseId,
      data: newDetail,
    })
    setPage(page + 1)
  }

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value)
  }

  const handleChangeDes = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDescription(e.target.value)
  }

  useEffect(() => {
    setIsValid(onValid())
  }, [onValid])

  let content

  if (isFetching) {
    console.log("...Loading")
  } else if (isSuccess) {
    const { data: course } = res
    const { title: courseTitle, description: courseDes, imageUrl } = course
    content = (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ImageInput
            title="이미지 등록"
            alt="이미지를 등록해 주세요"
            message="이미지를 등록해 주세요"
            previewImg={editable ? imageUrl : image}
            handleChangeImg={onChangeImage}
          />
        </Grid>
        <Grid item xs={12}>
          <TextInput
            title="코스이름"
            name="title"
            value={title}
            defaultVal={courseTitle}
            handleChange={handleChangeTitle}
          />
        </Grid>
        <Grid item xs={12}>
          <TextInput
            multiline
            title="코스설명"
            rows={8}
            name="description"
            defaultVal={courseDes}
            value={description}
            handleChange={handleChangeDes}
          />
        </Grid>
        <Grid item xs={12}>
          <CourseNextStepButton
            content="다음단계"
            isValid={isValid}
            onClick={() => onClickNextPage(id)}
          />
        </Grid>
      </Grid>
    )
  }
  return <div>{content}</div>
}

export default CourseEditDetail1
