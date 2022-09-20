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

import {
  useAddCourseMutation,
  useGetCourseListQuery,
} from "features/course/courseSlice"
import { CourseData } from "types/API/course-service"

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

const CourseRegiDetail = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const selectFile = useRef<any>()
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer>()

  const [changeInput, setChangeInput] = useState<CourseData>({
    title: "",
    description: "",
    imgFile: null,
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
  const [addCourse, { data: result, isSuccess }] = useAddCourseMutation()

  const { data, error, isLoading } = useGetCourseListQuery()

  // 클릭을 두번해야 전송되는 오류가 있음
  const onClickHandle = async (): Promise<boolean> => {
    try {
      const submitData = makeFormData()
      await addCourse(submitData).unwrap()
    } catch (err) {
      console.log(err)
    }

    return Promise.resolve(true)
  }
  if (isSuccess) {
    // 리턴받은 코스의 상태
    console.log("courseId", result)
  }

  return (
    <>
      <NabvigationBar
        currentPage={1}
        setCurrentPage={setCurrentPage}
        minPage={1}
        maxPage={3}
      />
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
        <Button variant="contained" onClick={onClickHandle}>
          코스등록 테스트 버튼
        </Button>
      </FormBox>
    </>
  )
}

export default CourseRegiDetail
