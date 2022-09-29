import React, { Dispatch, SetStateAction, useState, useRef } from "react"
import { styled } from "@mui/material/styles"
import { Box, Input, Typography, TextField, Fab } from "@mui/material"
import { PhotoCamera } from "@mui/icons-material"
import CourseNextStepButton from "components/user/course/CourseNextStepButton"

import TextInput from "components/common/input/TextInput"
import ImageInput from "components/common/input/ImageInput"
import InputWrapper from "components/common/input/InputWrapper"

import {
  setCourseDetail,
  useGetCourseListQuery,
} from "features/course/courseSlice"
import { CourseData } from "types/API/course-service"

import { useSelector, useDispatch } from "react-redux"
import { RootState } from "store"

const FormBox = styled(Box)(() => ({}))

const TitleContainer = styled(Box)(() => ({}))

const DetailContainer = styled(Box)(() => ({}))

const ImgContainer = styled(Box)(() => ({
  margin: "0 auto",
  padding: "0",
  width: "100%",
  height: "20rem",
  objectFit: "cover",
  borderRadius: "6px",
  position: "relative",
}))

const LABEL_STYLE = {
  margin: "20px 0",
  fontWeight: "800",
}

const INPUT_STYLE = {
  width: "100%",
}

const FORM_STYLE = {
  padding: "0 10px",
}

const ICON_STYLE = {
  color: "white",
}

const IconContainer = styled(Box)(() => ({
  zIndex: "1000",
  position: "absolute",
  bottom: "25px",
  right: "25px",
}))

interface pageProps {
  page: number
  setPage: Dispatch<SetStateAction<number>>
}

const CourseRegiDetail = ({ setPage, page }: pageProps): JSX.Element => {
  const selectFile = useRef<any>()
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer>()
  const [previewImg, setPreviewImg] = useState<null | string>(null)
  const [changeInput, setChangeInput] = useState<CourseData>({
    title: "",
    description: "",
    imgFile: "",
  })

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newState = { ...changeInput, [e.target.name]: e.target.value }
    setChangeInput(newState)
    console.log(changeInput)
  }
  const encodeFileToBase64 = (fileBlob: Blob): any => {
    const reader = new FileReader()
    reader.readAsDataURL(fileBlob)
    return new Promise<void>((resolve) => {
      reader.onload = () => {
        if (!reader.result) {
          throw new Error("No img result")
        }
        setImageSrc(reader.result)
        resolve()
        setChangeInput(selectFile.current.files[0])
        console.log(reader)
      }
    })
  }
  /// /////////////////////////////////////////////////////////////////////////////////////////
  const changeFileToObjectUrl = (file: File): void => {
    const fileUrl = URL.createObjectURL(file)
    setImageSrc(fileUrl)
    setPreviewImg(fileUrl)
    encodeFileToBase64(file)
    console.log(fileUrl)
  }

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChangeInput(e)
    if (e.target.files) {
      changeFileToObjectUrl(e.target.files[0])
      console.log(e.target.files[0])
    }
  }

  // 호출하면 api가 요청되는 트리거고, 뒤에는 성공인지, 로딩인지, 데이터 들어오는 객체
  const dispatch = useDispatch()
  const { data, error, isLoading } = useGetCourseListQuery()
  const courseDetail = useSelector((state: RootState) => {
    return state.course.courseDetails
  })
  // 페이지를 이동시키고 데이터를 전역상태로 저장
  const onClicKNextPage = (): void => {
    dispatch(
      setCourseDetail({
        title: changeInput.title,
        description: changeInput.description,
        imgFile: String(imageSrc),
      })
    )
    setPage(page + 1)
  }

  return (
    <>
      {/*  */}
      <ImageInput
        title="이미지 등록"
        alt="이미지를 등록해 주세요"
        message="밥드세요"
        previewImg={previewImg}
        handleChangeImg={handleChangeImg}
      />

      <FormBox sx={FORM_STYLE}>
        <TitleContainer>
          <Typography variant="h6" sx={LABEL_STYLE}>
            코스이름
          </Typography>
          <Input
            type="text"
            sx={INPUT_STYLE}
            name="title"
            value={changeInput.title}
            onChange={onChangeInput}
          />
        </TitleContainer>
        <DetailContainer>
          <Typography variant="h6" sx={LABEL_STYLE}>
            코스설명
          </Typography>
          <TextField
            multiline
            sx={INPUT_STYLE}
            rows={10}
            name="description"
            value={changeInput.description}
            onChange={onChangeInput}
          />
        </DetailContainer>
        <CourseNextStepButton content="다음단계" onClick={onClicKNextPage} />
      </FormBox>
    </>
  )
}

export default CourseRegiDetail
