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
import { Place, PlaceType } from "types/API/course-service"
import { Close } from "@mui/icons-material"
import { generateComponent } from "utils"
import { useUpdateMeetingPlaceMutation } from "features/meeting/meetingSlice"
import { editCoursePlaceDetail } from "features/course/courseSlice"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
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

const ThemeCardNumbering = styled(Typography)<TypographyProps>(() => ({
  borderRadius: "30px",
  width: "22px",
  zIndex: "100",
  height: "22px",
  margin: "auto",
  color: "white",
  backgroundColor: theme.primary[500],
}))

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
const ThemeGrid = styled(Grid)<GridProps>(() => ({
  "&.MuiGrid-root": {
    borderRadius: "4px",
    color: "black",
  },
  border: `1px solid ${theme.grayscale[200]}`,
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
  color: "primary",
  margin: "center",
  textAlign: "center",
  padding: "0px",
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
  height: "14px",
  margin: "0px",
  padding: "0px",
  color: theme.grayscale[400],
  fontSize: "14px",
}

const ButtonGroup = {
  display: "flex",
  p: "10px",
  alignItems: "end",
  flexDirection: "column",
  justifyContent: "space-between",
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
  // eslint-disable-next-line react/require-default-props
  courseId?: number
  setIsEditing: Dispatch<SetStateAction<boolean>>
}

const PlaceDetailEditCard: React.FC<PlaceDetailEditCard> = ({
  mode,
  isSelected,
  item,
  maxLen,
  setIsEditing,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  courseId,
}) => {
  const [memo, setMemo] = useState<string>()
  const [category, setCategory] = useState<string>()
  const [description, setDescription] = useState<string>()
  const { order: index, name: placeName, address } = item

  useEffect(() => {
    setCategory(
      CATEGORY_LIST.filter((it) => it.name === item.category)[0].value
    )

    // 이미 category_list의 key랑 같을경우 오류가 남

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

  const handleDesChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDescription(e.target.value)
  }

  const [updateMeetingPlaceMutation] = useUpdateMeetingPlaceMutation()

  const { meetingId } = useParams()
  const dispatch = useDispatch()
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
    if (mode === PlaceType.c) {
      const myItem = item as CoursePlace
      const newItem = { ...myItem, description, category } as CoursePlace
      // 수정한 값을 전역에 저장
      dispatch(editCoursePlaceDetail(newItem))
    }
    setIsEditing(false)
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
                <TitleFont>{placeName}</TitleFont>
                {category && (
                  <Select
                    size="small"
                    value={category}
                    onChange={handleCategoryChange}
                  >
                    <MenuItem value={category}>카테고리</MenuItem>
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
                {description && (
                  <TextField
                    size="small"
                    value={description}
                    onChange={handleDesChange}
                  />
                )}
              </Box>
              <AddressFont>{address}</AddressFont>
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
