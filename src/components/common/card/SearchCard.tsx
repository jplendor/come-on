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
  margin: "0px",
  padding: "0px",
  display: "flex",
  flexwrap: "nowrap",
  lineHeight: "140%",
  alignItems: "center",
  displayDirection: "column",
}

interface ListDetailCardProps {
  id?: number
  page?: number
  mode: PlaceType
  itemsLen?: number
  editing?: boolean
  item: SearchCardProp
  selectedNumber: string
  setPage?: Dispatch<SetStateAction<number>>
  onClickFocus: (event: React.MouseEvent<HTMLDivElement>) => void
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
    index: item.index, // ??????
    cateName: "ETC", // ??????????????????
    placeName: item.place_name, // ????????????
    addressName: item.address_name, // ??????
    x: item.x, // ??????,??????
    y: item.y, // place_url
    place_url: item.place_url,
    kakaoPlaceId: item.id,
    address: item.address_name,
  }

  const makeNewPlace = (): Place => {
    const newPlace = {
      order: obj.index,
      name: obj.placeName,
      description: "?????? ????????? ?????????",
      lng: obj.x, // ?????? x
      lat: obj.y, // ?????? y
      apiId: obj.kakaoPlaceId,
      category: "ETC",
      address: obj.address,
      id: obj.index,
    }

    return newPlace
  }

  const onClickAddCourse = (): void => {
    // ????????? ?????? ???????????? ????????? ????????? ?????????
    const result: boolean = window.confirm(
      `${obj.placeName}??? ????????? ?????????????????????????`
    )

    if (result === true) setOpen(true)
  }

  const onClickAddMeeting = (): void => {
    // ????????? ?????? ???????????? ????????? ????????? ?????????
    const result: boolean = window.confirm(
      `${obj.placeName}??? ??????????????? ?????????????????????????`
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
              ????????????
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
