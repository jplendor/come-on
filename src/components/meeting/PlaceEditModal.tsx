import React, { useState } from "react"
import { useParams } from "react-router-dom"
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material"
import { generateComponent } from "utils"
import TextInput from "components/common/input/TextInput"
import { useUpdateMeetingPlaceMutation } from "features/meeting/meetingSlice"
import { useDispatch, useSelector } from "react-redux"
import {
  addToModify,
  modifyCoursePlaces,
  modifyToSave,
} from "features/course/courseSlice"
import { PlaceType } from "types/API/course-service"
import { RootState } from "store"
import { PlaceOutlined } from "@mui/icons-material"

const CATEGORY_BOX = {
  height: "80px",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  flexDirection: "column",
  margin: "12px",
}

const DIALOG_STYLE = {
  "& .MuiDialog-paper": {
    width: "350px",
    maxHeight: "500px",
    padding: "0 12px",
  },
}

const DIALOG_TITLE = {
  textAlign: "center",
  fontWeight: "bold",
  fontSize: "22px",
  marginTop: "20px",
  marginBottom: "8px",
  paddingBottom: "0px",
}

const CATEGORY_FONTSTYLE = {
  fontSize: "16px",
  fontWeight: "bold",
  lineHeight: "140%",
  marginTop: "12px",
}

const SELECT_STYLE = { margin: "12px 0" }

const INPUTBOX_STYLE = {
  height: "100px",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  margin: "12px",
  marginTop: "17px",
}

const ADDRESS_STYLE = {
  display: "flex",
  fontSize: "14px",
  textAlign: "center",
  color: "#616161",
  justifyContent: "center",
  marginBottom: "14px",
}

const BUTTON_STYLE = {
  backgroundColor: "#337FFE",
  height: "48px",
  margin: "20px 12px 14px 12px",
}

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

interface PlaceEditModalProps {
  open: boolean
  onClose: () => void
  newPlace: any
  mode: PlaceType
  id?: number
  item: any
}

const PlaceEditModal = (props: PlaceEditModalProps): JSX.Element => {
  const { open, onClose, newPlace, mode, id, item } = props
  const [category, setCategory] = useState(item.category)
  const [memo, setMemo] = useState(
    mode === PlaceType.m ? item.memo : item.description
  )
  const updatePlaceItems = useSelector((state: RootState) => {
    return state.course.updatePlaces
  })

  const handleCategoryChange = (e: SelectChangeEvent): void => {
    setCategory(e.target.value)
  }

  const handleMemoChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setMemo(e.target.value)
  }

  const handleClose = (): void => {
    onClose()
  }

  const dispatch = useDispatch()

  const { meetingId } = useParams()

  const onClickUpdateCourse = (): void => {
    // 객체가 toSave에 있는경우 undefined, 반환 있으면 찾은 객체를 반환
    //= > toSave의 데이터를 업데이트
    const isInCourse = updatePlaceItems.toSave.find(
      (place: { order: number }): any => place.order === newPlace.order
    )

    const myPlace = {
      ...newPlace,
      description: memo,
      category,
    }
    // 1. undefined 가 아닐시 toSave를 업데이트
    if (isInCourse) {
      dispatch(modifyToSave(myPlace))
    } else if (isInCourse === undefined) {
      // undefined일시 원래있던 데이터라는 뜻 => toModify에 들어감
      dispatch(addToModify(myPlace))
    }
    // courseList업데이트
    dispatch(modifyCoursePlaces(myPlace))
    onClose()
  }

  const [updateMeetingPlaceMutation] = useUpdateMeetingPlaceMutation()

  const onClickUpdateMeeting = async (): Promise<void> => {
    try {
      const res = await updateMeetingPlaceMutation({
        meetingId: Number(meetingId),
        placeId: item.id,
        updatedPlace: { ...item, category, memo },
      }).unwrap()

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

  const makeMeetingContent = (): JSX.Element => {
    return (
      <Dialog open={open} sx={DIALOG_STYLE} onClose={handleClose} fullWidth>
        <DialogTitle sx={DIALOG_TITLE}>{newPlace.name}</DialogTitle>

        <Box sx={ADDRESS_STYLE}>
          <PlaceOutlined sx={{ color: "#616161", fontSize: "20px" }} />
          <Typography sx={{ color: "#616161" }}>{newPlace.address}</Typography>
        </Box>
        <Box sx={CATEGORY_BOX}>
          <Typography sx={CATEGORY_FONTSTYLE}>카테고리</Typography>
          <Select
            sx={SELECT_STYLE}
            value={category}
            onChange={handleCategoryChange}
            fullWidth
            displayEmpty
          >
            <MenuItem value="">카테고리</MenuItem>
            {generateComponent(CATEGORY_LIST, (data, key) => (
              <MenuItem value={data.name} key={key}>
                {data.value}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box sx={INPUTBOX_STYLE}>
          <TextInput
            title="메모"
            name="memo"
            value={memo}
            handleChange={handleMemoChange}
            multiline
            rows={2}
          />
        </Box>
        <Button
          variant="contained"
          sx={BUTTON_STYLE}
          onClick={onClickUpdateMeeting}
        >
          수정하기
        </Button>
      </Dialog>
    )
  }

  const makeCourseContent = (): JSX.Element => {
    return (
      <Dialog open={open} sx={DIALOG_STYLE} onClose={handleClose} fullWidth>
        <DialogTitle sx={DIALOG_TITLE}>{newPlace.name}</DialogTitle>

        <Box sx={ADDRESS_STYLE}>
          <PlaceOutlined sx={{ color: "#616161", fontSize: "20px" }} />
          <Typography sx={{ color: "#616161" }}>{newPlace.address}</Typography>
        </Box>
        <Box sx={CATEGORY_BOX}>
          <Typography sx={CATEGORY_FONTSTYLE}>카테고리 선택</Typography>
          <Select
            sx={SELECT_STYLE}
            value={category}
            onChange={handleCategoryChange}
            fullWidth
            displayEmpty
          >
            <MenuItem value="">카테고리</MenuItem>
            {generateComponent(CATEGORY_LIST, (data, key) => (
              <MenuItem value={data.name} key={key}>
                {data.value}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box sx={INPUTBOX_STYLE}>
          <TextInput
            title="코스메모"
            name="memo"
            value={memo}
            maxLength={30}
            handleChange={handleMemoChange}
            multiline
            rows={2}
          />
        </Box>
        <Button
          variant="contained"
          sx={BUTTON_STYLE}
          onClick={onClickUpdateCourse}
        >
          수정하기
        </Button>
      </Dialog>
    )
  }
  const content =
    mode === PlaceType.c || mode === "editMode"
      ? makeCourseContent()
      : makeMeetingContent()

  return content && <div>{content}</div>
}

PlaceEditModal.defaultProps = {
  id: undefined,
}
export default PlaceEditModal
