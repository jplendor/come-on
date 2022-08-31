import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useRef,
} from "react"

import { styled } from "@mui/material/styles"
import { Box, Input, Typography, TextField, Fab } from "@mui/material"
import { PhotoCamera } from "@mui/icons-material"
import NabvigationBar from "../components/common/NavigationBar"
import Guide from "../components/common/Guide"

interface NavigationBarProps {
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
  minPage: number
  maxPage: number
}

const FormBox = styled(Box)(() => ({}))

const TitleContainer = styled(Box)(() => ({}))

const DetailContainer = styled(Box)(() => ({}))

const ImgContainer = styled(Box)(() => ({
  margin: "0 auto",
  padding: "0",
  width: "100%",
  height: "20rem",
  objectFit: "cover",
  borderRadius: "6px",
  position: "relative",
}))

const LABEL_STYLE = {
  margin: "20px 0",
  fontWeight: "800",
}

const INPUT_STYLE = {
  width: "100%",
}

const FORM_STYLE = {
  padding: "0 10px",
}

const ICON_STYLE = {
  color: "white",
}

const IconContainer = styled(Box)(() => ({
  zIndex: "1000",
  position: "absolute",
  bottom: "25px",
  right: "25px",
}))

const CourseRegiDetail = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const selectFile = useRef<any>(null)
  return (
    <>
      <NabvigationBar
        currentPage={1}
        setCurrentPage={setCurrentPage}
        minPage={1}
        maxPage={3}
      />
      <Guide guideStr=" 코스정보를 입력해 주세요!" />
      {/*  */}
      <ImgContainer>
        <img
          src="https://pbs.twimg.com/media/DVT-AesUQAATx65.jpg"
          alt="img"
          width="100%"
          height="100%"
          z-index="0"
        />
        <IconContainer>
          <Fab
            color="secondary"
            aria-label="camera"
            size="large"
            component="label"
          >
            <PhotoCamera sx={ICON_STYLE} />
            <input hidden accept="image/*" type="file" ref={selectFile} />
          </Fab>
        </IconContainer>
      </ImgContainer>

      <FormBox sx={FORM_STYLE}>
        <TitleContainer>
          <Typography variant="h6" sx={LABEL_STYLE}>
            코스이름
          </Typography>
          <Input type="text" sx={INPUT_STYLE} />
        </TitleContainer>
        <DetailContainer>
          <Typography variant="h6" sx={LABEL_STYLE}>
            코스설명
          </Typography>
          <TextField multiline maxRows="10" sx={INPUT_STYLE} rows={10} />
        </DetailContainer>
      </FormBox>
    </>
  )
}

export default CourseRegiDetail
