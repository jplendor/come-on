/* eslint-disable react/jsx-props-no-spreading */
import { styled } from "@mui/material/styles"
import { Draggable } from "react-beautiful-dnd"
import React, { useEffect, useState } from "react"
import { Place, PlaceType } from "types/API/course-service"
import PlaceEditModal from "components/meeting/PlaceEditModal"
import { KeyboardArrowRight, Edit, Close } from "@mui/icons-material"
import { Box, Grid, GridProps, IconButton, Typography } from "@mui/material"
import theme from "theme"

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

const ThemeCardNumbering = styled(Typography)({
  width: "22px",
  height: "22px",
  zIndex: "100",
  color: "white",
  margin: "auto",
  borderRadius: "30px",
  backgroundColor: theme.primary[500],
})

const SELECTED_NUM_CARD = {
  backgroundColor: theme.primary[700],
  padding: "0px",
}

const DEFAULT_CARD = {
  border: `1px solid ${theme.grayscale[200]}`,
  padding: "0px",
}

const SELECTED_CARD = {
  border: "1px solid #1951B2",
  padding: "0px",
}
const ThemeGrid = styled(Grid)<GridProps>({
  "&.MuiGrid-root": {
    borderRadius: "4px",
    color: "black",
  },

  border: `1px solid ${theme.grayscale[200]}`,
})

const AddressFont = styled(Typography)(
  ({
    theme: {
      grayscale,
      textStyles: {
        body3: { regular },
      },
    },
  }) => ({
    fontSize: regular.fontSize,
    padding: "0px",
    color: grayscale[500],
  })
)

const CARD_NUMBERING = {
  color: "primary",
  margin: "center",
  textAlign: "center",
  padding: "0px",
}

const ITEM_BOX = {
  padding: "8px 12px",
  color: theme.grayscale[200],
}
const LINE_FIRST = {
  top: "52px",
  left: "25px",
  zIndex: "10",
  height: "52px",
  position: "relative",
  borderLeft: `thin solid ${theme.grayscale[200]};`,
}

const LINE_MIDDLE = {
  left: "25px",
  zIndex: "11",
  height: "92px",
  position: "relative",
  borderLeft: `thin solid ${theme.grayscale[200]};`,
}

const LINE_LAST = {
  margin: "0",
  zIndex: "10",
  left: "25px",
  height: "52px",
  bottom: "12px",
  padding: "0px",
  position: "relative",
  borderLeft: `thin solid ${theme.grayscale[200]};`,
}

const TitleDes = styled(Typography)(
  ({
    theme: {
      grayscale,
      textStyles: {
        body1: { bold },
      },
    },
  }) => ({
    margin: "0",
    padding: "0px",
    color: grayscale[700],
    fontSize: bold.fontSize,
    lineHeight: bold.lineHeight,
  })
)
const GRID_WRAP = {
  padding: "0px",
  color: theme.grayscale[200],
}

const NUMBERING_BOX = {
  padding: "0px",
  display: "flex",
  alignItem: "center",
}

const TITLE_BOX = {
  padding: "0px",
  display: "flex",
  flexwrap: "nowrap",
  lineHeight: "140%",
  alignItems: "center",
}

const TitleFont = styled(Typography)(
  ({
    theme: {
      textStyles: {
        title4: { bold },
      },
    },
  }) => ({
    padding: "0px",
    maxWidth: "60%",
    overflow: "hidden",
    fontWeight: "bold",
    whiteSpace: "nowrap",
    lineHeight: bold.lineHeight,
    fontSize: bold.fontSize,
    textOverflow: "ellipsis",
  })
)

const DES_BOX = {
  width: "100%",
  margin: "0px",
  padding: "0px",
  display: "flex",
  flexwrap: "nowrap",
  displayDirection: "column",
  justifyContent: "space-between",
}

const ICON = {
  width: "14px",
  margin: "0px",
  height: "14px",
  padding: "0px",
  fontSize: "14px",
  color: theme.grayscale[400],
}

const ButtonGroup = {
  p: "10px",
  display: "flex",
  alignItems: "end",
  flexDirection: "column",
  justifyContent: "space-between",
}

const TITLE_CATEGORY = {
  display: "block",
  fontSize: "10px",
  color: theme.grayscale[500],
}

const CATEGORY_BOX = {
  m: "0 10px",
  height: "19px",
  display: "flex",
  padding: "1px 3px",
  alignItems: "center",
  borderRadius: "2px",
  justifyContent: "center",
  backgroundColor: theme.grayscale[200],
}

interface CoursePlace extends Place {
  description: string
}

interface MeetingPlace extends Place {
  memo: string
}
interface ListDetailCardProps {
  maxLen: number
  mode: PlaceType
  editing?: boolean
  isSelected: boolean
  item: CoursePlace | MeetingPlace
  onRemove: (index: number) => void
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void
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
                    <TitleFont>{placeName}</TitleFont>
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
                    <TitleDes>
                      {description !== null ? description : memo}
                    </TitleDes>
                  </Box>
                  <AddressFont>{address}</AddressFont>
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
