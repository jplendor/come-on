/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react"
import {
  Box,
  Grid,
  GridProps,
  IconButton,
  Typography,
  TypographyProps,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { KeyboardArrowRight, Edit, Close } from "@mui/icons-material"
import { Draggable } from "react-beautiful-dnd"
import { PlaceType } from "types/API/course-service"
import PlaceEditModal from "components/meeting/PlaceEditModal"

// TODO: 버튼 2개 작업
// 1. 메모버튼 [V]
// 2. 리스트 삭제 버튼 [V]

const CATEGORY_LIST = [
  { name: "SCHOOL", value: "학교" },
  { name: "CAFE", value: "카페" },
  { name: "BAR", value: "술집" },
  { name: "SPORT", value: "스포츠" },
  { name: "SHOPPING", value: "쇼핑" },
  { name: "ETC", value: "기타" },
  { name: "ATTRACTION", value: "관광명소" },
  { name: "RESTAURANT", value: "음식점" },
  { name: "ACCOMMODATION", value: "숙박" },
  { name: "CULTURE", value: "문화시설" },
  { name: "ACTIVITY", value: "액티비티" },
  { name: "기타", value: "ETC" },
]

const ThemeCardNumbering = styled(Typography)<TypographyProps>(() => ({
  borderRadius: "30px",
  width: "22px",
  height: "22px",
  margin: "auto",
  backgroundColor: "#337FFE",
  color: "white",

  zIndex: "100",
}))

const SELECTED_NUM_CARD = {
  backgroundColor: "#1951B2",
  padding: "0px",
}

const DEFAULT_CARD = {
  border: "1px solid #EEEEEE",
  padding: "0px",
}

const SELECTED_CARD = {
  border: "1px solid #1951B2",
  padding: "0px",
}
const ThemeGrid = styled(Grid)<GridProps>(({ theme }) => ({
  "&.MuiGrid-root": {
    borderRadius: "4px",
    color: "black",
  },
  border: `1px solid #EEEEEE`,
}))

const ADDRESS_FONT = {
  fontSize: "12px",
  padding: "0px",

  color: "#9E9E9E",
}
const CARD_NUMBERING = {
  color: "primary",
  margin: "center",
  textAlign: "center",
  padding: "0px",
}

const ITEM_BOX = {
  color: "#EEEEEE",
  padding: "8px 12px",
}

const LINE_FIRST = {
  position: "relative",
  zIndex: "10",
  borderLeft: "thin solid #EEEEEE;",
  left: "25px",
  top: "52px",
  height: "52px",
}

const LINE_MIDDLE = {
  position: "relative",
  zIndex: "11",
  borderLeft: "thin solid #EEEEEE;",
  left: "25px",
  height: "92px",
}

const LINE_LAST = {
  margin: "0",
  position: "relative",
  zIndex: "10",
  borderLeft: "thin solid #EEEEEE",
  left: "25px",
  height: "52px",
  bottom: "12px",
  padding: "0px",
}

const TITLE_DES = {
  margin: "0",
  lineHeight: "140%",
  fontSize: "14px",
  color: "#616161",
  padding: "0px",
}

const GRID_WRAP = {
  color: "#EEEEEE",
  padding: "0px",
}

const NUMBERING_BOX = {
  display: "flex",
  alignItem: "center",
  padding: "0px",
}

const TITLE_BOX = {
  display: "flex",
  alignItems: "center",
  flexwrap: "nowrap",
  lineHeight: "140%",
  padding: "0px",
}

const TITLE_FONT = {
  fontWeight: "bold",
  lineHeight: "140%",
  fontSize: "16px",
  padding: "0px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  maxWidth: "60%",
}

const DES_BOX = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  displayDirection: "column",
  flexwrap: "nowrap",
  padding: "0px",
  margin: "0px",
}

const ICON = {
  width: "14px",
  height: "14px",
  fontSize: "14px",
  margin: "0px",
  padding: "0px",
  color: "#BDBDBD",
}

const ButtonGroup = {
  display: "flex",
  flexDirection: "column",
  alignItems: "end",
  justifyContent: "space-between",
  p: "10px",
}

const TITLE_CATEGORY = {
  display: "block",
  fontSize: "10px",

  color: "#9E9E9E",
}

const CATEGORY_BOX = {
  display: "flex",
  m: "0 10px",
  padding: "1px 3px",
  justifyContent: "center",
  alignItems: "center",
  height: "19px",
  borderRadius: "2px",
  backgroundColor: "#EEEEEE",
}
export interface ListDetailCardProp {
  index: number
  titleTop: string
  titleBody: string
  titleBottom: string
}
export interface Place {
  id: number
  order: number
  name: string
  lng: number // 경도 x
  lat: number // 위도 y
  apiId: number
  category: string
  address: string
}

interface CoursePlace extends Place {
  description: string
}

interface MeetingPlace extends Place {
  memo: string
}
interface ListDetailCardProps {
  item: CoursePlace | MeetingPlace
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void
  isSelected: boolean
  onRemove: (index: number) => void
  maxLen: number
  editing?: boolean
  mode: PlaceType
  // eslint-disable-next-line react/require-default-props
}

const PlaceDetailDraggableCard: React.FC<ListDetailCardProps> = ({
  mode,
  onClick,
  isSelected,
  item,
  editing,
  maxLen,
  onRemove,
}) => {
  const [open, setOpen] = useState<boolean>(false)

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {}, [open])

  const OpenModal = (): void => {
    setOpen(true)
  }

  const closeModal = (): void => {
    setOpen(false)
  }

  const { order: index, name: placeName, category, apiId, address, id } = item
  let description: string | null = null
  let memo: string | null = null

  if (mode === PlaceType.m) {
    const { memo: itemMemo } = item as MeetingPlace
    memo = itemMemo
  }

  if (mode === PlaceType.c) {
    const { description: itemDescription } = item as CoursePlace
    description = itemDescription
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type

  const newPlace: Place = {
    order: item.order,
    name: item.name,
    lng: item.lng, // 경도 x
    lat: item.lat, // 위도 y
    apiId: item.apiId,
    category: "ETC",
    address: item.address,
    id: item.id,
  }

  const routeUrl = `https://map.kakao.com/link/to/${apiId}`

  const handleClickClose = (e: React.MouseEvent<HTMLElement>): void => {
    e.stopPropagation()
    onRemove(id)
  }

  const filterCategory = (): string => {
    const newCategory = category === "" || undefined ? "ETC" : category
    const korCategory = CATEGORY_LIST.filter((it) => it.name === newCategory)[0]
      .value

    return korCategory
  }
  /* //draggable */

  return (
    <Draggable draggableId={`${item.id}`} index={item.order - 1}>
      {(provided2) => (
        <Grid
          container
          spacing={2}
          sx={GRID_WRAP}
          {...provided2.draggableProps}
          {...provided2.dragHandleProps}
          ref={provided2.innerRef}
        >
          <Grid item xs={2} sx={NUMBERING_BOX}>
            {maxLen !== 1 ? (
              <Box
                sx={
                  // eslint-disable-next-line no-nested-ternary
                  index === 1
                    ? LINE_FIRST
                    : index === maxLen
                    ? LINE_LAST
                    : LINE_MIDDLE
                }
              />
            ) : (
              ""
            )}
            <ThemeCardNumbering
              align="center"
              sx={isSelected ? SELECTED_NUM_CARD : CARD_NUMBERING}
            >
              {index}
            </ThemeCardNumbering>
          </Grid>

          <Grid item xs={10}>
            <ThemeGrid
              container
              style={{ marginBottom: "12px" }}
              id={String(index)}
              onClick={onClick}
              sx={isSelected ? SELECTED_CARD : DEFAULT_CARD}
            >
              <Grid item xs={10}>
                <Box sx={ITEM_BOX}>
                  <Box sx={TITLE_BOX}>
                    <Typography sx={TITLE_FONT}>{placeName}</Typography>

                    <Box sx={CATEGORY_BOX}>
                      <Typography component="span" sx={TITLE_CATEGORY}>
                        {filterCategory()}
                      </Typography>
                    </Box>
                    <IconButton sx={ICON} onClick={OpenModal}>
                      <Edit />
                    </IconButton>
                  </Box>
                  <Box sx={DES_BOX}>
                    <Typography variant="subtitle2" sx={TITLE_DES}>
                      {description !== null ? description : memo}
                    </Typography>
                  </Box>
                  <Typography variant="subtitle2" sx={ADDRESS_FONT}>
                    {address}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={2} sx={ButtonGroup}>
                <IconButton sx={ICON} onClick={handleClickClose}>
                  <Close />
                </IconButton>
                <a href={routeUrl} target="_blank" rel="noreferrer">
                  <IconButton sx={ICON}>
                    <KeyboardArrowRight />
                  </IconButton>
                </a>
              </Grid>
            </ThemeGrid>
          </Grid>
          <PlaceEditModal
            open={open}
            onClose={closeModal}
            item={item}
            newPlace={newPlace}
            mode={editing === true ? PlaceType.e : mode}
            id={id}
          />
        </Grid>
      )}
    </Draggable>
  )
}

PlaceDetailDraggableCard.defaultProps = {
  editing: false,
}

export default PlaceDetailDraggableCard
