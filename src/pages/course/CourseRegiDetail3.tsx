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
  top: "-50px",
}))

const ImgContainer = styled(Box)(() => ({
  width: "100%",
  height: "230px",
  overflow: "hidden",
  position: "relative",
  top: "-60px",
}))

const FontTitle = styled(Typography)(
  ({
    theme: {
      textStyles: {
        title2: { bold },
      },
    },
  }) => ({
    fontSize: bold.fontSize,
    fontWeight: bold.fontWeight,
    marginTop: "10px",
    margin: "auto 0",
  })
)

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

const DesText = styled(Typography)(
  ({
    theme: {
      grayscale,
      textStyles: {
        body1: { bold },
      },
    },
  }) => ({
    fontSize: bold.fontSize,
    lineHeight: bold.lineHeight,
    color: grayscale[700],
    margin: "auto 5px",
  })
)

const FontSubtitle = styled(Typography)(
  ({
    theme: {
      grayscale,
      textStyles: {
        body2: { bold },
      },
    },
  }) => ({
    fontSize: bold.fontSize,
    lineHeight: bold.lineHeight,
    color: grayscale[500],
  })
)

window.Buffer = Buffer

interface pageProps {
  page: number
  setPage: Dispatch<SetStateAction<number>>
  id: number
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CourseRegiDetail3 = ({ setPage, page, id }: pageProps): JSX.Element => {
  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const [selectedNumber, setselectedNumber] = useState<string>("")
  interface MyDetailQueryProps extends QueryProps {
    data: MydetailRes
  }
  const navigate = useNavigate()
  const { data: userData, isLoading: isLoadingUser } =
    useMyDetailQuery() as MyDetailQueryProps

  const courseDetail = useSelector((state: RootState) => {
    return state.course.courseDetails
  })
  const placeList: CoursePlaceProps[] = useSelector((state: RootState) => {
    return state.course.coursePlaces
  })

  const onClickFocus = (event: React.MouseEvent<HTMLDivElement>): void => {
    const e = event?.currentTarget
    if (e) {
      setselectedNumber(e.id)
    } else {
      setselectedNumber("")
    }
  }

  const onClickModify = (): void => {
    setPage(1)
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
    likeCount = changeLikeCount()
  }, [isLike])

  const submit = async (): Promise<boolean> => {
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
              <FontTitle>{courseDetail?.title}</FontTitle>
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
              <FontSubtitle>
                <Box sx={ICON_BOX}>
                  <AccountCircleOutlined sx={ICON_STYLE} />
                  <FontSubtitle>{userData.data.nickname}</FontSubtitle>
                  <DateRange sx={ICON_STYLE} />
                  {toStringYyyymmdd(new Date())}
                </Box>
              </FontSubtitle>
            </Box>
          </TitleContainer>
          <Box>
            <DesText>{courseDetail?.description}</DesText>
          </Box>
          {placeList !== null && placeList !== undefined && (
            <MapContainer
              selectedNumber={selectedNumber}
              placeLists={placeList}
              isSuccess
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
