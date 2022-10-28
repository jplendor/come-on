import React, { Dispatch, SetStateAction, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material"
import { generateComponent } from "utils"
import TextInput from "components/common/input/TextInput"
import { Place } from "components/common/card/SearchCard"
import { useCreateMeetingPlaceMutation } from "features/meeting/meetingSlice"
import { useDispatch, useSelector } from "react-redux"
import {
  addCoursePlace,
  updateToSave,
  useUpdateCoursePlaceToDBMutation,
} from "features/course/courseSlice"
import { PlaceType } from "types/API/course-service"
import { RootState } from "store"
import { PlaceOutlined } from "@mui/icons-material"

interface PlaceAddModalProps {
  open: boolean
  onClose: () => void
  newPlace: Place
  mode: PlaceType
  id?: number
  page?: number
  setPage?: Dispatch<SetStateAction<number>>
}

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

const PlaceAddModal = (props: PlaceAddModalProps): JSX.Element => {
  const { open, onClose, newPlace, mode, id, page, setPage } = props
  const [category, setCategory] = useState("")
  const [memo, setMemo] = useState("")
  const placeItems = useSelector((state: RootState) => {
    return state.course.coursePlaces
  })
  const handleCategoryChange = (e: SelectChangeEvent): void => {
    setCategory(e.target.value)
  }

  const handleMemoChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setMemo(e.target.value)
  }

  const handleClose = (): void => {
    setCategory("")
    setMemo("")
    onClose()
  }

  const navigate = useNavigate()

  const { meetingId } = useParams()
  const [createMeetingPlace] = useCreateMeetingPlaceMutation()

  const addPlace = async (): Promise<void> => {
    try {
      const res = await createMeetingPlace({
        meetingId: Number(meetingId),
        newPlace: {
          id: newPlace.id,
          apiId: newPlace.apiId,
          name: newPlace.name,
          lat: newPlace.lat,
          lng: newPlace.lng,
          memo,
          category,
          address: newPlace.address,
        },
      }).unwrap()

      if (res.code !== "SUCCESS") {
        throw new Error(`error code: ${res.code}`)
      }

      navigate(`/meeting/${meetingId}`)
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      } else {
        alert(`unexpected error: ${error}`)
      }
    }
  }

  const dispatch = useDispatch()
  const [updateCoursePlaceToDB] = useUpdateCoursePlaceToDBMutation()

  const onClickAddCoursePlace = async (): Promise<void> => {
    const itemsLen = placeItems.length
    const order = placeItems[0].id === 0 ? 1 : itemsLen + 1

    const myPlace = {
      ...newPlace,
      order,
      description: memo,
      category,
    }

    dispatch(addCoursePlace(myPlace))
    dispatch(updateToSave({ toSave: myPlace }))
    console.log(myPlace)
    await updateCoursePlaceToDB({ courseId: id!, toSave: [myPlace] })
    if (setPage !== undefined) setPage(3)
  }

  // 업데이트 로직
  const onClickUpdateAddCoursePlace = (): void => {
    const place = {
      ...newPlace,
      id: 0,
      description: memo,
      category,
    }

    dispatch(addCoursePlace(place))

    const typePlace = {
      apiId: newPlace.apiId,
      name: newPlace.name,
      lat: newPlace.lat,
      lng: newPlace.lng,
      description: memo,
      category,
      address: newPlace.address,
    }

    const itemsLen = placeItems.length
    const order = itemsLen === 0 ? 0 : itemsLen + 1
    const myPlace = {
      ...typePlace,
      order,
      description: memo,
      category,
    }
    dispatch(updateToSave({ toSave: myPlace }))
    navigate(`/course/${id}/update`, { state: 2 })
  }

  const makeContent = (): JSX.Element => {
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
            title="모임메모"
            name="memo"
            value={memo}
            placeholder="모임 장소에 대한 메모를 남겨보세요."
            handleChange={handleMemoChange}
            multiline
            rows={2}
          />
        </Box>
        <Button variant="contained" sx={BUTTON_STYLE} onClick={addPlace}>
          추가하기
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
            placeholder="코스 장소에 대한 메모를 남겨보세요."
            handleChange={handleMemoChange}
            multiline
            rows={2}
          />
        </Box>
        <Button
          variant="contained"
          sx={BUTTON_STYLE}
          onClick={
            mode === PlaceType.c
              ? onClickAddCoursePlace
              : onClickUpdateAddCoursePlace
          }
        >
          추가하기
        </Button>
      </Dialog>
    )
  }
  const content = mode === PlaceType.m ? makeContent() : makeCourseContent()

  return content && <div>{content}</div>
}

PlaceAddModal.defaultProps = {
  id: undefined,
  page: undefined,
  setPage: console.log("sorry error this"),
}
export default PlaceAddModal
