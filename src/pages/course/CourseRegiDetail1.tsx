import React, {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useCallback,
} from "react"

import {
  setCourseDetail,
  useAddCourseDetailMutation,
  useUpdateCourseDetailMutation,
} from "features/course/courseSlice"

import { RootState } from "store"
import { Grid } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import TextInput from "components/common/input/TextInput"
import ImageInput from "components/common/input/ImageInput"
import CourseNextStepButton from "components/user/course/CourseNextStepButton"
import { fileToObjectUrl, objectUrlToFile } from "utils"

interface pageProps {
  page: number
  id: number
  setPage: Dispatch<SetStateAction<number>>
  setCourseId: Dispatch<SetStateAction<number>>
}

const MAIN_CONTAINER = {
  padding: "20px",
}

const CourseRegiDetail = ({
  setCourseId,
  setPage,
  id,
  page,
}: pageProps): JSX.Element => {
  const dispatch = useDispatch()
  const [isValid, setIsValid] = useState(false)
  const [image, setImage] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const [addCourseDetail] = useAddCourseDetailMutation()
  const [description, setDescription] = useState<string>("")

  const courseDetail = useSelector((state: RootState) => {
    return state.course.courseDetails
  })

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value)
  }

  const handleChangeDes = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDescription(e.target.value)
  }

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      const imgUrl = fileToObjectUrl(e.target.files[0])
      setImage(imgUrl)
    }
  }

  const getData = useCallback(async (): Promise<void> => {
    if (id !== 0) {
      setTitle(courseDetail.title)
      setDescription(courseDetail.description)
      setImage(courseDetail.imgFile)
    }
  }, [courseDetail.description, courseDetail.imgFile, courseDetail.title, id])

  useEffect(() => {
    if ((id !== 0 && title === "") || description === "") getData()
  })
  const onValid = useCallback((): void => {
    if (title === "") return
    if (description === "") return
    if (image === "" || image === "undefined") return

    setIsValid(true)
  }, [description, image, title])

  const submitCourseDetail = async (): Promise<number> => {
    const newDetail = new FormData()

    dispatch(setCourseDetail({ title, description, imgFile: image }))

    newDetail.append("title", title)
    newDetail.append("description", description)
    if (image) {
      const imgFile = await objectUrlToFile(image)
      newDetail.append("imgFile", imgFile)
    }

    const res = await addCourseDetail(newDetail).unwrap()

    return Promise.resolve(res.data.courseId)
  }

  const [updateCourseDetail] = useUpdateCourseDetailMutation()

  const onClickNextPage = async (): Promise<void> => {
    if (id === 0) {
      const courseId = await submitCourseDetail()
      setCourseId(courseId)
    } else if (id !== 0) {
      const newDetail = new FormData()

      dispatch(setCourseDetail({ title, description, imgFile: image }))

      newDetail.append("title", title)
      newDetail.append("description", description)

      if (image) {
        const imgFile = await objectUrlToFile(image)
        newDetail.append("imgFile", imgFile)
      }

      await updateCourseDetail({ id, data: newDetail })
    }

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
          maxLength={10}
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
          maxLength={30}
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
