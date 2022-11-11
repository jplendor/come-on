/* eslint-disable no-console */
/* eslint-disable no-nested-ternary */
import React, { useState, Dispatch, SetStateAction } from "react"
import {
  Box,
  Button,
  Grid,
  GridProps,
  IconButton,
  Typography,
} from "@mui/material"

import { styled } from "@mui/material/styles"
import PlaceAddModal from "components/meeting/PlaceAddModal"
import { Place, PlaceType, SearchCardProp } from "types/API/course-service"

const SELECTED_CARD = {
  padding: "0px",
}

const DEFAULT_CARD = {
  padding: "0px",
}
const ThemeGrid = styled(Grid)<GridProps>(() => ({
  height: "60px",
  color: "black",
  position: "relative",
  top: "-15px",
  zIndex: "10",
  backgroundColor: "white",
}))

const AddressFont = styled(Typography)(
  ({
    theme: {
      grayscale,
      textStyles: {
        body1: { bold },
      },
    },
  }) => ({
    padding: "0px",
    color: grayscale[500],
    fontSize: bold.fontSize,
    lineHeight: bold.lineHeight,
  })
)

const ITEM_BOX = {
  color: "#EEEEEE",
  padding: "16px 20px 0px 20px",
}

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
    lineHeight: bold.lineHeight,
    padding: "0px",
  })
)

const TITLE_BOX = {
  display: "flex",
  displayDirection: "column",
  flexwrap: "nowrap",
  lineHeight: "140%",
  alignItems: "center",
  margin: "0px",
  padding: "0px",
}

interface ListDetailCardProps {
  item: SearchCardProp
  onClickFocus: (event: React.MouseEvent<HTMLDivElement>) => void
  selectedNumber: string
  mode: PlaceType
  editing?: boolean
  id?: number
  itemsLen?: number
  page?: number
  setPage?: Dispatch<SetStateAction<number>>
}

/* eslint camelcase: ["error", {properties: "never"}] */
const SearchCard: React.FC<ListDetailCardProps> = ({
  onClickFocus,
  selectedNumber,
  item,
  mode,
  editing,
  id,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  itemsLen,
  setPage,
  page,
}: ListDetailCardProps) => {
  const [open, setOpen] = useState<boolean>(false)

  const closeModal = (): void => {
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
      <Grid container sx={{ margin: "0px", marginTop: "12px" }}>
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
              <FontTitle>{obj.placeName}</FontTitle>
              <AddressFont>
                {obj.addressName}
                <IconButton aria-label="edit this" color="secondary" />
              </AddressFont>
            </Box>
          </Grid>
          <Box sx={{ padding: "20px" }}>
            <Button
              fullWidth
              sx={{ height: "48px" }}
              variant="contained"
              onClick={
                editing === true || mode === PlaceType.c
                  ? onClickAddCourse
                  : onClickAddMeeting
              }
            >
              장소선택
            </Button>
          </Box>
        </ThemeGrid>
      </Grid>
      <PlaceAddModal
        open={open}
        onClose={closeModal}
        newPlace={makeNewPlace()}
        mode={editing === true ? PlaceType.e : mode}
        id={id}
        setPage={setPage}
        page={page}
      />
    </>
  )
}

SearchCard.defaultProps = {
  editing: false,
  id: undefined,
  itemsLen: 0,
  page: undefined,
  setPage: undefined,
}
export default SearchCard
