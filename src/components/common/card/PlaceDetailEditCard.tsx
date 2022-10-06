import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import {
  Box,
  Grid,
  GridProps,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  TypographyProps,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { Close } from "@mui/icons-material"
import { generateComponent } from "utils"
import { useUpdateMeetingPlaceMutation } from "features/meeting/meetingSlice"
import { useParams } from "react-router-dom"

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
]

const ThemeCardNumbering = styled(Typography)<TypographyProps>(({ theme }) => ({
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

export interface ListDetailCardProp {
  index: number
  titleTop: string
  titleBody: string
  titleBottom: string
}
interface Place {
  id: number
  order: number
  name: string
  lng: number // 경도 x
  lat: number // 위도 y
  apiId: number
  category: string
  address: string
}

export enum PlaceType {
  m = "meeting",
  c = "course",
}

interface CoursePlace extends Place {
  description: string
}

interface MeetingPlace extends Place {
  memo: string
}
interface PlaceDetailEditCard {
  item: CoursePlace | MeetingPlace
  isSelected: boolean
  maxLen: number
  mode: PlaceType
  setIsEditing: Dispatch<SetStateAction<boolean>>
}

const PlaceDetailEditCard: React.FC<PlaceDetailEditCard> = ({
  mode,
  isSelected,
  item,
  maxLen,
  setIsEditing,
}) => {
  const { order: index, name: placeName, address } = item

  const [category, setCategory] = useState<string>()
  const [memo, setMemo] = useState<string>()
  const [description, setDescription] = useState<string>()

  useEffect(() => {
    setCategory(
      CATEGORY_LIST.filter((it) => it.value === item.category)[0].name
    )

    if (mode === PlaceType.m) {
      const { memo: itemMemo } = item as MeetingPlace
      setMemo(itemMemo)
    }

    if (mode === PlaceType.c) {
      const { description: itemDescription } = item as CoursePlace
      setDescription(itemDescription)
    }
  }, [item, mode])

  const handleCategoryChange = (e: SelectChangeEvent): void => {
    setCategory(e.target.value)
  }

  const handleMemoChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setMemo(e.target.value)
  }

  const [updateMeetingPlaceMutation] = useUpdateMeetingPlaceMutation()

  const { meetingId } = useParams()

  const handleClickClose = async (): Promise<void> => {
    if (mode === PlaceType.m) {
      try {
        const res = await updateMeetingPlaceMutation({
          meetingId: Number(meetingId),
          placeId: item.id,
          updatedPlace: { ...item, category, memo },
        }).unwrap()

        setIsEditing(false)

        if (res.code !== "SUCCESS") {
          throw new Error(`error code: ${res.code}`)
        }
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message)
        } else {
          alert(`unexpected error: ${error}`)
        }
      }
    }
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
          sx={isSelected ? SELECTED_CARD : DEFAULT_CARD}
        >
          <Grid item xs={10}>
            <Box sx={ITEM_BOX}>
              <Box sx={TITLE_BOX}>
                <Typography sx={TITLE_FONT}>{placeName}</Typography>
                {category && (
                  <Select
                    size="small"
                    value={category}
                    onChange={handleCategoryChange}
                  >
                    <MenuItem value="">카테고리</MenuItem>
                    {generateComponent(CATEGORY_LIST, (data, key) => (
                      <MenuItem value={data.name} key={key}>
                        {data.value}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              </Box>
              <Box sx={DES_BOX}>
                {memo && (
                  <TextField
                    size="small"
                    value={memo}
                    onChange={handleMemoChange}
                  />
                )}
                {description && <TextField size="small" value={description} />}
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
          </Grid>
        </ThemeGrid>
      </Grid>
    </Grid>
  )
}

export default PlaceDetailEditCard
