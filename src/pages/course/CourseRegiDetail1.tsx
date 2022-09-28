import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useRef,
  ChangeEvent,
} from "react"

import { styled } from "@mui/material/styles"
import { Box, Input, Typography, TextField, Fab, Button } from "@mui/material"
import { PhotoCamera } from "@mui/icons-material"
import NabvigationBar from "components/common/NavigationBar"
import Guide from "components/common/Guide"
import CourseNextStepButton from "components/user/course/CourseNextStepButton"

import {
  setCourseDetail,
  useGetCourseListQuery,
} from "features/course/courseSlice"
import { CourseData } from "types/API/course-service"

import { useSelector, useDispatch } from "react-redux"
import { RootState } from "store"

interface NavigationBarProps {
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
  minPage: number
  maxPage: number
}

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

  const makeFormData = (): FormData => {
    const formData = new FormData()
    formData.append("title", changeInput.title)
    formData.append("description", changeInput.description)
    formData.append("imgFile", selectFile.current.files[0])

    return formData
  }
  // 호출하면 api가 요청되는 트리거고, 뒤에는 성공인지, 로딩인지, 데이터 들어오는 객체
  const dispatch = useDispatch()
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
      <Guide guideStr=" 코스정보를 입력해 주세요!" />
      {/*  */}
      <ImgContainer>
        {imageSrc && (
          <img src={String(imageSrc)} alt="img" width="100%" height="100%" />
        )}
        <IconContainer>
          <Fab
            color="secondary"
            aria-label="camera"
            size="large"
            component="label"
          >
            <PhotoCamera sx={ICON_STYLE} />
            <input
              hidden
              accept="image/*"
              type="file"
              ref={selectFile}
              name="imgFile"
              onChange={(e) => {
                encodeFileToBase64(selectFile.current.files[0])
              }}
            />
          </Fab>
        </IconContainer>
      </ImgContainer>

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
