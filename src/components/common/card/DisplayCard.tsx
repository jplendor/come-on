import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Box, Grid, GridProps, IconButton, Typography } from "@mui/material"
import { Edit, Add as AddIcon } from "@mui/icons-material"

import { styled } from "@mui/material/styles"
import { addCoursePlace } from "features/course/courseSlice"
import { RootState } from "store"

const ThemeGrid = styled(Grid)<GridProps>(({ theme }) => ({
  "&.MuiGrid-root": {
    borderRadius: "10px ",
    color: "black",
  },
  border: `1px solid #92B4EC`,
  padding: "0 10px",
}))

const TITLE_TOP = {
  fontWeight: 800,
  fontSize: "10px",
  lineHeight: "12px",
  //  TODO: 추후에 props로 color 속성 전달예정
  color: "#FFA3A3",
  border: "1px solid #FFA3A3",
}
const TITLE_BODY = {
  fontWeight: "bold",
  lineHeight: "24px",
}

const TITLE_BOTTOM = {
  fontWeight: "400",
  lineHeight: "19px",
}

const TITLE_WRAP = {
  padding: "12px 8px",
  fontSize: "16px",
  lineHegiht: "140%",
  fontWeight: "bold",
}

const SELECTED_CARD = {
  border: "1px solid #FFD24C",
}
const ICON_STYLE = {
  // relative로 상위 컴포넌트의 우측에 배정되게 할 것.
}

interface ListDetailCardProp {
  index: number // 카드의 인덱스 넘버 - order
  address_name: string // 주소
  category_name: string // 플레이스 카테고리 -placeCategory
  place_name: string // 장소 이름           -name
  place_url: string // 플레이스 주소        -
  x: number // 경도 longitude              -lon
  y: number // 위도 latitude               -lat
  description: string // 설명              -description
  id: number // 카카오 id          -kakaoPlaceId
}

interface ListDetailCardProps {
  item: ListDetailCardProp
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void
  isSelected: string
}
//

/* eslint camelcase: ["error", {properties: "never"}] */
const DisplayCard: React.FC<ListDetailCardProps> = ({
  onClick,
  isSelected,
  item,
}) => {
  const obj = {
    index: item.index, // 순서
    cateName: "ETC", // 카테고리네임
    placeName: item.place_name, // 장소이름
    addressName: item.address_name, // 주소
    x: item.x, // 위도,경도
    y: item.y, // place_url
    place_url: item.place_url,
    kakaoPlaceId: item.id,
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const placeList = useSelector((state: RootState) => {
    return state.course.coursePlaces
  })

  const onAddClick = (): void => {
    // 클릭시 해당 컴포넌트 정보가 상태에 저장됨
    const result: boolean = window.confirm(
      `${obj.placeName}을 코스로 추가하시겠습니까?`
    )
    if (result === true) {
      alert(`${obj.placeName}이 코스로 추가되었습니다.`)
      const newPlace = {
        id: 0,
        order: obj.index,
        name: obj.placeName,
        description: "값을 입력해 주세요",
        lng: obj.x, // 경도 x
        lat: obj.y, // 위도 y
        apiId: obj.kakaoPlaceId,
        category: "ETC",
        address: "",
      }
      dispatch(addCoursePlace(newPlace))
      navigate("/course", { state: 200 })
    }
    console.log(placeList)
  }

  return (
    <>
      {" "}
      <Grid item xs={10} sx={{ margin: "12px 0" }}>
        <ThemeGrid
          container
          id={String(obj.index)}
          onClick={onClick}
          sx={isSelected === String(obj.index) ? SELECTED_CARD : {}}
        >
          <Grid item xs={11}>
            <Box sx={TITLE_WRAP}>
              <Typography component="span" sx={TITLE_TOP}>
                {obj.cateName}
              </Typography>
              <Typography variant="h6" sx={TITLE_BODY}>
                {obj.placeName}
                <IconButton type="button" onClick={onAddClick}>
                  <AddIcon sx={ICON_STYLE} color="secondary" fontSize="large" />
                </IconButton>
              </Typography>
              <Typography variant="subtitle2" sx={TITLE_BOTTOM}>
                {obj.addressName}
                <IconButton aria-label="edit this" color="secondary" />
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={1}>
            <IconButton
              aria-label="close this"
              color="secondary"
              size="small"
            />
          </Grid>
        </ThemeGrid>
      </Grid>
    </>
  )
}

export default DisplayCard
