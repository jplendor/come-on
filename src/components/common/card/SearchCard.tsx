/* eslint-disable no-console */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Box, Grid, GridProps, IconButton, Typography } from "@mui/material"
import { Add as AddIcon } from "@mui/icons-material"

import { styled } from "@mui/material/styles"
import { addCoursePlace } from "features/course/courseSlice"
import PlaceAddModal from "components/meeting/PlaceAddModal"
import { CoursePlaceProps, SearchCardProp } from "types/API/course-service"

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

enum PlaceType {
  m = "meeting",
  c = "course",
  e = "editing",
}

interface ListDetailCardProps {
  item: SearchCardProp
  onClickFocus: (event: React.MouseEvent<HTMLDivElement>) => void
  selectedNumber: string
  mode: PlaceType
  editing?: boolean
  id?: number
  itemsLen?: number
}

export interface Place {
  id: number
  order: number
  name: string
  description: string
  lng: number
  lat: number
  apiId: number
  category: string
  address: string
}

/* eslint camelcase: ["error", {properties: "never"}] */
const SearchCard: React.FC<ListDetailCardProps> = ({
  onClickFocus,
  selectedNumber,
  item,
  mode,
  editing,
  id,
  itemsLen,
}) => {
  const [open, setOpen] = useState<boolean>(false)

  const closeModal = (): void => {
    console.log("close")
    setOpen(false)
  }

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

  const makeNewPlace = (): Place => {
    const newPlace = {
      order: obj.index,
      name: obj.placeName,
      description: "값을 입력해 주세요",
      lng: obj.x, // 경도 x
      lat: obj.y, // 위도 y
      apiId: obj.kakaoPlaceId,
      category: "ETC",
      address: obj.address,
      id: obj.index,
    }

    return newPlace
  }

  const onClickAddCourse = (): void => {
    // 클릭시 해당 컴포넌트 정보가 상태에 저장됨
    const result: boolean = window.confirm(
      `${obj.placeName}을 코스로 추가하시겠습니까?`
    )

    if (result === true) setOpen(true)

    // console.log(result, "안녕")
    // console.log(typeof result)
    // if (result === true) {

    // }
  }

  const onClickAddMeeting = (): void => {
    // 클릭시 해당 컴포넌트 정보가 상태에 저장됨
    const result: boolean = window.confirm(
      `${obj.placeName}을 모임장소로 추가하시겠습니까?`
    )

    if (result === true) {
      setOpen(true)
    }
  }

  return (
    <>
      <Grid container sx={{ margin: "12px 0" }}>
        <ThemeGrid
          item
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
                    editing === true || mode === PlaceType.c
                      ? onClickAddCourse
                      : onClickAddMeeting
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
            <IconButton
              aria-label="close this"
              color="secondary"
              size="small"
            />
          </Grid>
        </ThemeGrid>
      </Grid>
      {console.log("open2", open)}
      <PlaceAddModal
        open={open}
        onClose={closeModal}
        newPlace={makeNewPlace()}
        mode={editing === true ? PlaceType.e : mode}
        id={id}
      />
    </>
  )
}

SearchCard.defaultProps = {
  editing: false,
  id: undefined,
  itemsLen: 0,
}
export default SearchCard
