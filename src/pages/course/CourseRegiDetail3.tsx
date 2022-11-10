/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState, SetStateAction, Dispatch, useEffect } from "react"
import { Buffer } from "buffer"
import { RootState } from "store"
import { useSelector } from "react-redux"
import { styled } from "@mui/material/styles"
import { useNavigate } from "react-router-dom"
import { Box, Typography } from "@mui/material"
import { MydetailRes } from "types/API/user-service"
import { useMyDetailQuery } from "features/user/userSlice"
import { toStringYyyymmdd, generateComponent } from "utils"
import MapContainer from "components/common/course/MapContainer"
import { QueryProps } from "components/common/BasicFrame/BasicFrame"
import PlaceDetailCard from "components/common/card/PlaceDetailCard"
import { AccountCircleOutlined, DateRange } from "@mui/icons-material"
import { CoursePlaceProps, PlaceType } from "types/API/course-service"
import { useAddCoursePlaceMutation } from "features/course/courseSlice"
import LikeButton from "components/common/card/cardLayout/CardItemButton"
import CourseNextStepButton from "components/user/course/CourseNextStepButton"

const TitleContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}))

const MainContainer = styled(Box)(() => ({
  display: "flex",
  margin: "0px 20px 16px 20px",
  flexDirection: "column",
  position: "relative",
  top: "-40px",
}))

const ImgContainer = styled(Box)(() => ({
  width: "100%",
  height: "230px",
  overflow: "hidden",
  position: "relative",
  top: "-60px",
}))

const FONT_TITLE = {
  fontSize: "22px",
  fontWeight: "bold",
  margin: "auto 0",
}

const FONT_SUBTITLE = {
  fontSize: "13px",
  lineHeight: "145%",
  color: "#9E9E9E",
}

const ICON_BOX = {
  lineHegiht: "145%",
  margin: "0 auto",
  display: "flex",
  flexWrap: "nowrap",
  justifyContent: "flex-start",
  alignItems: "center",
}

const ICON_STYLE = {
  width: "16px",
  height: "16px",
}

const SUBTITLE = {
  lineHegiht: "145%",
  margin: "10px 0",
  display: "flex",
  flexWrap: "nowrap",
  justifyContent: "flex-start",
}

const TITLE = {
  width: "100%",
  display: "flex",
  marginTop: "10px",
  justifyContent: "space-between",
}

const DES_STYLE = {
  fontSize: "14px",
  lineHeight: "140%",
  color: "#616161",
}

window.Buffer = Buffer

interface pageProps {
  page: number
  setPage: Dispatch<SetStateAction<number>>
  id: number
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CourseRegiDetail3 = ({ setPage, page, id }: pageProps): JSX.Element => {
  interface MyDetailQueryProps extends QueryProps {
    data: MydetailRes
  }
  const navigate = useNavigate()
  const [selectedNumber, setselectedNumber] = useState<string>("")
  const [addCoursePlace] = useAddCoursePlaceMutation()
  const { data: userData, isLoading: isLoadingUser } =
    useMyDetailQuery() as MyDetailQueryProps

  const courseDetail = useSelector((state: RootState) => {
    return state.course.courseDetails
  })
  const placeList: CoursePlaceProps[] = useSelector((state: RootState) => {
    return state.course.coursePlaces
  })
  const [isSubmit, setIsSubmit] = useState<boolean>(false)

  const onClickFocus = (event: React.MouseEvent<HTMLDivElement>): void => {
    const e = event?.currentTarget
    if (e) {
      setselectedNumber(e.id)
    } else {
      setselectedNumber("")
    }
  }

  const courseList = useSelector((state: RootState) => {
    return state.course.coursePlaces
  })

  const onClickModify = (): void => {
    setPage(1)
  }

  const initialPlace = {
    order: 1,
    name: "newName",
    description: "값을 입력해주세요",
    lng: 38.05248142233915, // 경도 x
    lat: 127.65930674808553, // 위도 y
    apiId: 12346,
    category: "ETC",
  }

  const postData = {
    toSave: [initialPlace],
  }

  const submitPlaceList = async (courseId: number): Promise<boolean> => {
    // map으로 toSave배열에 코스 추가하기
    // toSave 전처리
    postData.toSave.pop() // 첫번쨰 데이터 삭제
    courseList.map((place: CoursePlaceProps) => postData.toSave.push(place))

    await addCoursePlace({ courseId, postData })

    return Promise.resolve(true)
  }

  // 하트 컴포넌트
  const [isLike, setIsLike] = useState<boolean>(true)
  let likeCount = 999

  const changeLikeCount = (): number => {
    if (isLike) return likeCount + 1
    return likeCount
  }

  const onClickLike = (): void => {
    setIsLike(!isLike)
  }
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    likeCount = changeLikeCount()
  }, [isLike])
  // 제출
  const submit = async (): Promise<boolean> => {
    await submitPlaceList(id)
    setIsSubmit(true)
    return Promise.resolve(true)
  }

  if (isSubmit) {
    navigate("/")
  }

  if (isLoadingUser) return <div>Loading...</div>
  return (
    courseDetail && (
      <>
        <ImgContainer>
          <img
            src={courseDetail.imgFile}
            width="100%"
            height="auto"
            style={{
              position: "absolute",
              zIndex: "-10",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            alt="img"
          />
        </ImgContainer>
        <MainContainer>
          <TitleContainer>
            <Box className="Title" sx={TITLE}>
              <Typography variant="h5" sx={FONT_TITLE}>
                {courseDetail?.title}
              </Typography>
              {likeCount && (
                <LikeButton
                  isLike={isLike!}
                  courseId={0}
                  onClickHandler={() => {
                    onClickLike()
                  }}
                  likeCount={changeLikeCount()}
                />
              )}
            </Box>
            <Box className="subTitle" sx={SUBTITLE}>
              <Typography variant="subtitle1" sx={FONT_SUBTITLE}>
                <Box sx={ICON_BOX}>
                  <AccountCircleOutlined sx={ICON_STYLE} />
                  <Typography
                    variant="subtitle1"
                    sx={FONT_SUBTITLE}
                    style={{ margin: "auto 5px" }}
                  >
                    {userData.data.nickname}
                  </Typography>
                  <DateRange sx={ICON_STYLE} />
                  {toStringYyyymmdd(new Date())}
                </Box>
              </Typography>
            </Box>
          </TitleContainer>
          <Box sx={DES_STYLE}>{courseDetail?.description}</Box>
          {placeList !== null && placeList !== undefined && (
            <MapContainer
              selectedNumber={selectedNumber}
              placeLists={placeList}
              isSuccess
              isLoading={false}
            />
          )}

          {placeList !== undefined &&
            generateComponent(placeList, (item, key) => (
              <PlaceDetailCard
                item={item}
                key={key}
                onClick={onClickFocus}
                isSelected={
                  item.order ===
                  (selectedNumber === "" ? -10 : Number(selectedNumber))
                }
                courseId={id}
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                onRemove={() => {}}
                maxLen={placeList.length}
                mode={PlaceType.c}
                isEditable={false}
              />
            ))}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <CourseNextStepButton
              content="수정하기"
              width="49%"
              isValid
              onClick={onClickModify}
            />
            <CourseNextStepButton
              content="코스등록 완료"
              width="49%"
              onClick={() => {
                submit()
              }}
              isValid
            />
          </Box>
        </MainContainer>
      </>
    )
  )
}
export default CourseRegiDetail3
