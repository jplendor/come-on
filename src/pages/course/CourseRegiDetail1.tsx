import React, { Dispatch, SetStateAction, useState, useEffect } from "react"
import { styled } from "@mui/material/styles"
import { Box, Grid } from "@mui/material"
import CourseNextStepButton from "components/user/course/CourseNextStepButton"

import TextInput from "components/common/input/TextInput"
import ImageInput from "components/common/input/ImageInput"

import { setCourseDetail } from "features/course/courseSlice"
import { CourseData } from "types/API/course-service"

import { useDispatch } from "react-redux"

const FormBox = styled(Box)(() => ({}))
const FORM_STYLE = {
  padding: "0 10px",
}
interface pageProps {
  page: number
  setPage: Dispatch<SetStateAction<number>>
}

const CourseRegiDetail = ({ setPage, page }: pageProps): JSX.Element => {
  const dispatch = useDispatch()

  const [isValid, setIsValid] = useState(true)
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer>()
  const [previewImg, setPreviewImg] = useState<null | string>(null)
  const [changeInput, setChangeInput] = useState<CourseData>({
    title: "",
    description: "",
    imgFile: "",
  })

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newState = {
      ...changeInput,
      imgFile: String(imageSrc),
      [e.target.name]: e.target.value,
    }
    setChangeInput(newState)
  }

  const encodeFileToBase64 = (fileBlob: Blob): Promise<void> => {
    const reader = new FileReader()
    reader.readAsDataURL(fileBlob)
    return new Promise<void>((resolve) => {
      reader.onload = () => {
        if (!reader.result) {
          throw new Error("No img result")
        }
        setImageSrc(reader.result)
        resolve()
      }
    })
  }

  /// /////////////////////////////////////////////////////////////////////////////////////////
  const changeFileToObjectUrl = (file: File): void => {
    const fileUrl = URL.createObjectURL(file)
    setPreviewImg(fileUrl)
    encodeFileToBase64(file)
  }

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(e.target)
    onChangeInput(e)
    if (e.target.files) {
      changeFileToObjectUrl(e.target.files[0])
    }
  }

  const onValid = (): boolean => {
    if (changeInput.title === "") return true
    if (changeInput.description === "") return true
    if (changeInput.imgFile === "") return true
    return false
  }

  const onClickNextPage = (): void => {
    dispatch(
      setCourseDetail({
        title: changeInput.title,
        description: changeInput.description,
        imgFile: String(imageSrc),
      })
    )
    setPage(page + 1)
  }

  useEffect(() => {
    setIsValid(onValid())
    console.log(changeInput)
    console.log(isValid)
  }, [changeInput])

  return (
    <FormBox sx={FORM_STYLE} onChange={onValid}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ImageInput
            title="이미지 등록"
            alt="이미지를 등록해 주세요"
            message="이미지를 등록해 주세요"
            previewImg={previewImg}
            handleChangeImg={handleChangeImg}
          />
        </Grid>
        <Grid item xs={12}>
          <TextInput
            title="코스이름"
            name="title"
            value={changeInput.title}
            placeholder="코스명을 입력해 주세요"
            handleChange={onChangeInput}
          />
        </Grid>
        <Grid item xs={12}>
          <TextInput
            multiline
            title="코스설명"
            placeholder="코스설명을 입력해주세요"
            rows={8}
            name="description"
            value={changeInput.description}
            handleChange={onChangeInput}
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
    </FormBox>
  )
}

export default CourseRegiDetail
