import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
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
import { useCreateMeetingPlaceMutation } from "features/meeting/meetingSlice"
import { useDispatch, useSelector } from "react-redux"
import {
  addCoursePlace,
  updateToSave,
  useAddCoursePlaceSingleMutation,
} from "features/course/courseSlice"
import { Place, PlaceType } from "types/API/course-service"
import { RootState } from "store"
import { PlaceOutlined } from "@mui/icons-material"
import CourseNextStepButton from "components/user/course/CourseNextStepButton"

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
  { name: "SCHOOL", value: "??????" },
  { name: "CAFE", value: "??????" },
  { name: "BAR", value: "??????" },
  { name: "SPORT", value: "?????????" },
  { name: "SHOPPING", value: "??????" },
  { name: "ETC", value: "??????" },
  { name: "ATTRACTION", value: "????????????" },
  { name: "RESTAURANT", value: "?????????" },
  { name: "ACCOMMODATION", value: "??????" },
  { name: "CULTURE", value: "????????????" },
  { name: "ACTIVITY", value: "????????????" },
]

const PlaceAddModal = (props: PlaceAddModalProps): JSX.Element => {
  const { open, onClose, newPlace, mode, id, page, setPage } = props
  const [category, setCategory] = useState("")
  const [memo, setMemo] = useState("")
  const placeItems = useSelector((state: RootState) => {
    return state.course.coursePlaces
  })
  const [addCoursePlaceSingle] = useAddCoursePlaceSingleMutation()
  const [valid, isValid] = useState(false)

  useEffect(() => {
    if (memo !== "" && category !== "") {
      isValid(true)
    }
  }, [memo, category])

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

  const onClickAddCoursePlace = async (): Promise<void> => {
    const myPlace = {
      name: newPlace.name,
      description: memo,
      lat: newPlace.lat,
      lng: newPlace.lng,
      address: newPlace.address,
      apiId: newPlace.apiId,
      category,
    }

    await addCoursePlaceSingle({ postData: myPlace, courseId: id })
    if (setPage !== undefined) setPage(3)
  }

  // ???????????? ??????
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
          <Typography sx={CATEGORY_FONTSTYLE}>???????????? ??????</Typography>
          <Select
            sx={SELECT_STYLE}
            value={category}
            onChange={handleCategoryChange}
            fullWidth
            displayEmpty
          >
            <MenuItem value="">????????????</MenuItem>
            {generateComponent(CATEGORY_LIST, (data, key) => (
              <MenuItem value={data.name} key={key}>
                {data.value}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box sx={INPUTBOX_STYLE}>
          <TextInput
            title="????????????"
            name="memo"
            value={memo}
            maxLength={30}
            placeholder="?????? ????????? ?????? ????????? ???????????????."
            handleChange={handleMemoChange}
            multiline
            rows={2}
          />
        </Box>
        <CourseNextStepButton
          btnStyle={BUTTON_STYLE}
          onClick={addPlace}
          isValid={valid}
          content="????????????"
        >
          ??????
        </CourseNextStepButton>
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
          <Typography sx={CATEGORY_FONTSTYLE}>???????????? ??????</Typography>
          <Select
            sx={SELECT_STYLE}
            value={category}
            onChange={handleCategoryChange}
            fullWidth
            displayEmpty
          >
            <MenuItem value="">????????????</MenuItem>
            {generateComponent(CATEGORY_LIST, (data, key) => (
              <MenuItem value={data.name} key={key}>
                {data.value}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box sx={INPUTBOX_STYLE}>
          <TextInput
            title="????????????"
            name="memo"
            value={memo}
            maxLength={30}
            placeholder="?????? ????????? ?????? ????????? ???????????????."
            handleChange={handleMemoChange}
            multiline
            rows={2}
          />
        </Box>

        <CourseNextStepButton
          btnStyle={BUTTON_STYLE}
          onClick={
            mode === PlaceType.c
              ? onClickAddCoursePlace
              : onClickUpdateAddCoursePlace
          }
          isValid={valid}
          content="????????????"
        />
      </Dialog>
    )
  }
  const content = mode === PlaceType.m ? makeContent() : makeCourseContent()

  return content && <div>{content}</div>
}

PlaceAddModal.defaultProps = {
  id: undefined,
  page: undefined,
  setPage: undefined,
}
export default PlaceAddModal
