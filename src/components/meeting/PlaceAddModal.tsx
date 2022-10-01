import React, { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
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
import { PlaceType } from "components/common/card/DisplayListDetailCard"
import { Place } from "components/common/card/SearchCard"
import { useCreateMeetingPlaceMutation } from "features/meeting/meetingSlice"

interface PlaceAddModalProps {
  open: boolean
  onClose: () => void
  newPlace: Place
  mode: PlaceType
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
  const { open, onClose, newPlace, mode } = props

  const [category, setCategory] = useState("")
  const [memo, setMemo] = useState("")

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

  const makeContent = (): JSX.Element => {
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>모임 장소</DialogTitle>
        <Typography variant="h5">{newPlace.name}</Typography>
        <Typography>{newPlace.address}</Typography>
        <Select value={category} onChange={handleCategoryChange} displayEmpty>
          <MenuItem value="">카테고리</MenuItem>
          {generateComponent(CATEGORY_LIST, (data, key) => (
            <MenuItem value={data.name} key={key}>
              {data.value}
            </MenuItem>
          ))}
        </Select>
        <TextInput
          title="모임메모"
          name="memo"
          value={memo}
          placeholder="모임 장소에 대한 메모를 남겨보세요."
          handleChange={handleMemoChange}
        />
        <Button onClick={addPlace}>추가하기</Button>
      </Dialog>
    )
  }

  const content = makeContent()

  return <div>{content}</div>
}

export default PlaceAddModal
