/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react"
import { Box, Grid, GridProps, IconButton, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import { KeyboardArrowRight, Edit } from "@mui/icons-material"
import { Place, PlaceType } from "types/API/course-service"
import theme from "theme"
import PlaceDetailEditCard from "./PlaceDetailEditCard"

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
  margin: "auto",
  borderRadius: "30px",
  color: "white",
  zIndex: "100",
  backgroundColor: "#337FFE",
})

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
const ThemeGrid = styled(Grid)<GridProps>(() => ({
  "&.MuiGrid-root": {
    borderRadius: "4px",
    color: "black",
  },
  border: `1px solid #EEEEEE`,
}))

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
  padding: "0px",
  margin: "center",
  color: "primary",
  textAlign: "center",
}

const ITEM_BOX = {
  color: theme.grayscale[200],
  padding: "8px 12px",
}

const LINE_FIRST = {
  top: "52px",
  left: "25px",
  zIndex: "10",
  height: "52px",
  position: "relative",
  borderLeft: "thin solid #EEEEEE",
}

const LINE_MIDDLE = {
  left: "25px",
  zIndex: "11",
  height: "92px",
  position: "relative",
  borderLeft: "thin solid #EEEEEE",
}

const LINE_LAST = {
  margin: "0",
  zIndex: "10",
  left: "25px",
  height: "52px",
  bottom: "12px",
  padding: "0px",
  position: "relative",
  borderLeft: "thin solid #EEEEEE",
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
    lineHeight: bold.lineHeight,
    fontSize: bold.fontSize,
    color: grayscale[700],
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
  display: "flex",
  padding: "0px",
  lineHeight: "140%",
  flexwrap: "nowrap",
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
  margin: "0px",
  height: "14px",
  padding: "0px",
  fontSize: "14px",
  color: theme.grayscale[400],
}

let ButtonGroup = {
  p: "10px",
  display: "flex",
  alignItems: "end",
  flexDirection: "column",
  justifyContent: "space-between",
}

export interface ListDetailCardProp {
  index: number
  titleTop: string
  titleBody: string
  titleBottom: string
}
interface CoursePlace extends Place {
  description: string
}

interface MeetingPlace extends Place {
  memo: string
}
interface ListDetailCardProps {
  // eslint-disable-next-line react/require-default-props
  courseId?: number
  maxLen: number
  mode: PlaceType
  isEditable: boolean
  isSelected: boolean
  item: CoursePlace | MeetingPlace
  onRemove?: (index: number) => void
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void
}

const PlaceDetailCard: React.FC<ListDetailCardProps> = ({
  mode,
  onClick,
  isSelected,
  item,
  maxLen,
  onRemove,
  courseId,
  isEditable,
}) => {
  const [isEditing, setIsEditing] = useState(false)

  if (!isEditable) {
    ButtonGroup = { ...ButtonGroup, justifyContent: "end" }
  }

  const { order: index, name: placeName, category, apiId, address, id } = item
  let description = null
  let memo = null

  if (mode === PlaceType.m) {
    const { memo: itemMemo } = item as MeetingPlace
    memo = itemMemo
  }

  if (mode === PlaceType.c) {
    const { description: itemDescription } = item as CoursePlace
    description = itemDescription
  }

  const routeUrl = `https://map.kakao.com/link/to/${apiId}`

  if (isEditing) {
    return (
      <PlaceDetailEditCard
        item={item}
        isSelected={isSelected}
        mode={mode}
        maxLen={maxLen}
        setIsEditing={setIsEditing}
        courseId={courseId}
      />
    )
  }

  const filterCategory = (): string => {
    const newCategory = category === "" || undefined ? "ETC" : category
    const korCategory = CATEGORY_LIST.filter((it) => it.name === newCategory)[0]
      .value

    return korCategory
  }

  return (
    <Grid container spacing={2} sx={GRID_WRAP}>
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

                {isEditable && (
                  <IconButton
                    sx={ICON}
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsEditing(true)
                    }}
                  >
                    <Edit />
                  </IconButton>
                )}
              </Box>
              <Box sx={DES_BOX}>
                <TitleDes>{description !== null ? description : memo}</TitleDes>
              </Box>
              <AddressFont>{address}</AddressFont>
            </Box>
          </Grid>
          <Grid item xs={2} sx={ButtonGroup}>
            <a href={routeUrl} target="_blank" rel="noreferrer">
              <IconButton sx={ICON}>
                <KeyboardArrowRight />
              </IconButton>
            </a>
          </Grid>
        </ThemeGrid>
      </Grid>
    </Grid>
  )
}

PlaceDetailCard.defaultProps = {
  // eslint-disable-next-line no-console
  onRemove: () => console.warn("onRemove not defined"),
}

export default PlaceDetailCard
