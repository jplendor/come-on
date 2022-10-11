import React, {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useCallback,
} from "react"
import { styled } from "@mui/material/styles"
import { Box, Grid } from "@mui/material"
import CourseNextStepButton from "components/user/course/CourseNextStepButton"

import TextInput from "components/common/input/TextInput"
import ImageInput from "components/common/input/ImageInput"

import { setCourseDetail } from "features/course/courseSlice"
import { CourseData } from "types/API/course-service"

import { useDispatch } from "react-redux"

const FORM_STYLE = {
  padding: "0 10px",
}
interface pageProps {
  page: number
  setPage: Dispatch<SetStateAction<number>>
}

const CourseRegiDetail = ({ setPage, page }: pageProps): JSX.Element => {
  const dispatch = useDispatch()

  const [isValid, setIsValid] = useState(false)
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer>("")
  const [previewImg, setPreviewImg] = useState<null | string>(null)
  const [changeInput, setChangeInput] = useState<CourseData>({
    title: "",
    description: "",
    imgFile: "",
  })

  const encodeFileToBase64 = (fileBlob: Blob): Promise<void> => {
    const reader = new FileReader()
    reader.readAsDataURL(fileBlob)
    return new Promise<void>((resolve) => {
      reader.onload = () => {
        if (!reader.result) {
          throw new Error("No img result")
        }
        resolve(setImageSrc(reader.result))
      }
    })
  }

  const onValid = useCallback((): boolean => {
    if (changeInput.title === "") return false
    if (changeInput.description === "") return false
    if (changeInput.imgFile === "" || changeInput.imgFile === "undefined")
      return false
    return true
  }, [changeInput])

  const changeFileToObjectUrl = (file: File): void => {
    const fileUrl = URL.createObjectURL(file)
    setPreviewImg(fileUrl)
  }

  const handleChangeImg = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    if (e.target.files) {
      changeFileToObjectUrl(e.target.files[0])
      await encodeFileToBase64(e.target.files[0])

      const newState = {
        ...changeInput,
        [e.target.name]: e.target.value,
      }

      setChangeInput(newState)
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const onChangeInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState = {
      ...changeInput,
      [e.target.name]: e.target.value,
    }

    setChangeInput(newState)
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
  }, [changeInput, isValid, imageSrc, previewImg])

  return (
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
  )
}

export default CourseRegiDetail
