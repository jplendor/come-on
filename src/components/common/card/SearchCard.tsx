import React from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Box, Grid, GridProps, IconButton, Typography } from "@mui/material"
import { Add as AddIcon } from "@mui/icons-material"

import { styled } from "@mui/material/styles"
import { addCoursePlace } from "features/course/courseSlice"

const SELECTED_CARD = {
  border: "1px solid #1951B2",
  padding: "0px",
}

const DEFAULT_CARD = {
  border: "1px solid #EEEEEE",
  padding: "0px",
}
const ThemeGrid = styled(Grid)<GridProps>(() => ({
  "&.MuiGrid-root": {
    borderRadius: "4px",
    height: "80px",
    margin: "12px 0",
    color: "black",
  },
  border: `1px solid #1951B2`,
}))

const ADDRESS_FONT = {
  fontSize: "12px",
  padding: "0px",

  color: "#9E9E9E",
}
const ITEM_BOX = {
  color: "#EEEEEE",
  padding: "8px 12px",
}

const TITLE_FONT = {
  fontWeight: "bold",
  lineHeight: "140%",
  fontSize: "16px",
  padding: "0px",
}

const TITLE_BOX = {
  display: "flex",
  displayDirection: "column",
  flexwrap: "nowrap",
  lineHeight: "140%",
  alignItems: "center",
  padding: "0px",
}

const URL_ICON = {
  width: "14px",
  height: "14px",
  display: "relative",
  fontSize: "14px",
  margin: "0px",
  padding: "0px",
  left: "50px",
  color: "#BDBDBD",
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

enum PlaceType {
  m = "meeting",
  c = "course",
}

interface ListDetailCardProps {
  item: ListDetailCardProp
  onClickFocus: (event: React.MouseEvent<HTMLDivElement>) => void
  selectedNumber: string
  mode: PlaceType
}

/* eslint camelcase: ["error", {properties: "never"}] */
const SearchCard: React.FC<ListDetailCardProps> = ({
  onClickFocus,
  selectedNumber,
  item,

  mode,
}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const obj = {
    index: item.index, // 순서
    cateName: "ETC", // 카테고리네임
    placeName: item.place_name, // 장소이름
    addressName: item.address_name, // 주소
    x: item.x, // 위도,경도
    y: item.y, // place_url
    place_url: item.place_url,
    kakaoPlaceId: item.id,
    address: item.address_name,
  }

  const makeNewPlace = (): any => {
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

    return newPlace
  }

  const onClickAddCourse = (): void => {
    // 클릭시 해당 컴포넌트 정보가 상태에 저장됨
    const result: boolean = window.confirm(
      `${obj.placeName}을 코스로 추가하시겠습니까?`
    )

    if (result === true) {
      alert(`${obj.placeName}이 코스로 추가되었습니다.`)
      const newPlace = makeNewPlace()
      dispatch(addCoursePlace(newPlace))
      navigate("/course", { state: 200 })
    }
  }

  const onClickAddMeeting = (): void => {
    // 클릭시 해당 컴포넌트 정보가 상태에 저장됨
    const result: boolean = window.confirm(
      `${obj.placeName}을 모임코스로 추가하시겠습니까?`
    )

    if (result === true) {
      alert(`${obj.placeName}이 모임코스로 추가되었습니다.`)
      const newPlace = makeNewPlace()
      dispatch(addCoursePlace(newPlace))
      navigate("/meeting")
    }
  }

  return (
    <Grid item xs={10} sx={{ margin: "12px 0" }}>
      <ThemeGrid
        container
        id={String(obj.kakaoPlaceId)}
        onClick={onClickFocus}
        xs={12}
        sx={
          selectedNumber === String(obj.kakaoPlaceId)
            ? SELECTED_CARD
            : DEFAULT_CARD
        }
      >
        <Grid item xs={12} sx={TITLE_BOX}>
          <Box sx={ITEM_BOX}>
            <Typography variant="h6" sx={TITLE_FONT}>
              {obj.placeName}
              <IconButton
                type="button"
                onClick={
                  mode === PlaceType.c ? onClickAddCourse : onClickAddMeeting
                }
              >
                <AddIcon sx={URL_ICON} color="secondary" fontSize="large" />
              </IconButton>
            </Typography>
            <Typography variant="subtitle2" sx={ADDRESS_FONT}>
              {obj.addressName}
              <IconButton aria-label="edit this" color="secondary" />
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={1}>
          <IconButton aria-label="close this" color="secondary" size="small" />
        </Grid>
      </ThemeGrid>
    </Grid>
  )
}

export default SearchCard
