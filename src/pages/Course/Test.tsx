/* eslint-disable no-console */
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
  fetchByIdCourseDetail,
  setCourseDetail,
  useGetCourseDetailQuery,
  useUpdateCourseDetailMutation,
} from "features/course/courseSlice"
import {
  CourseData,
  CourseDetail,
  CourseDetailResponse,
  CoursePlaceProps,
  StateCourseData,
} from "types/API/course-service"

import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "store"
import { Details } from "@mui/icons-material"
import { useSetState } from "rooks"
import { setOriginalNode } from "typescript"

interface pageProps {
  page: number
  id: number
  setPage: Dispatch<SetStateAction<number>>
}

const Test = ({ id, setPage, page }: pageProps): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>()
  const [image, setImage] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")

  // rtkq에서 데이터 불러오기
  // store에 데이터 저장하기

  // useEffect 써봤는데, 데이터를 못가져온다 => 여러번 호출하면, 기다려서 가져오거든요 ?
  // useEffect를 쓰면 여러번호출이 안된다. 왜냐하면 마운트 될때만 실행되거나
  // 값이 바뀔 때만 실행되기 때문에.
  const dis = useCallback(async () => {
    const didi = await dispatch(fetchByIdCourseDetail(id))
    const myData: any = didi.payload
    console.log(myData.data)
    setDescription(myData.data.description)
    setTitle(myData.data.title)
    setImage(myData.data.imageUrl)
  }, [dispatch, id])

  useEffect(() => {
    dis()
  }, [dis])

  const c = useSelector((state: RootState) => {
    return state.course.courseDetails
  })

  // 문제 : api의 pending이나 reject가 오면 mount 될 때 바인딩 할 수가 없음

  const [isValid, setIsValid] = useState(false)
  const [image64, setImage64] = useState<ArrayBuffer | string>("")
  const [imageFile, setImageFile] = useState<Blob>()

  const encodeFileToBase64 = (fileBlob: Blob): Promise<void> => {
    const reader = new FileReader()
    reader.readAsDataURL(fileBlob)
    return new Promise<void>((resolve) => {
      reader.onload = () => {
        if (!reader.result) {
          throw new Error("No img result")
        }
        resolve(setImage64(reader.result))
      }
    })
  }

  const onValid = useCallback((): void => {
    if (title === "") return
    if (description === "") return
    if (image === "" || image === "undefined") return
    setIsValid(true)
  }, [description, image, title])

  const changeFileToObjectUrl = (file: File): string => {
    const fileUrl = URL.createObjectURL(file)
    console.log(fileUrl)
    return fileUrl
  }

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      console.log(e.target.files)
      const a = changeFileToObjectUrl(e.target.files[0])
      setImageFile(e.target.files[0])
      console.log(a)
      setImage(String(a))
    }
  }

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value)
  }

  const handleChangeDes = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDescription(e.target.value)
  }

  const changeObjectUrlToFile = async (): Promise<Blob> => {
    const file = await fetch(image || "").then((r) => r.blob())
    return file
  }
  const onClickNextPage = async (): Promise<void> => {
    const newDetail = new FormData()

    newDetail.append("title", title)
    newDetail.append("description", description)
    console.log(imageFile)

    if (imageFile) {
      await encodeFileToBase64(imageFile)
      dispatch(
        setCourseDetail({ title, description, imgFile: String(image64) })
      )
    } else {
      dispatch(setCourseDetail({ title, description, imgFile: image }))
    }
    // 이미지가 바뀐 경우 base64로 바꿔서 전송
    setPage(page + 1)
  }

  useEffect(() => {
    onValid()
  }, [image, title, description])
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <ImageInput
          title="이미지 등록"
          alt="이미지를 등록해 주세요"
          message="이미지를 등록해 주세요"
          previewImg={image}
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
          onClick={() => onClickNextPage()}
        />
      </Grid>
    </Grid>
  )
}

export default Test
