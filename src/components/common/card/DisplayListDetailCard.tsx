import React from "react"
import {
  Box,
  Grid,
  GridProps,
  IconButton,
  Typography,
  TypographyProps,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { KeyboardArrowRight } from "@mui/icons-material"
import { Link } from "react-router-dom"
// TODO: 버튼 2개 작업
// 1. 메모버튼 [V]
// 2. 리스트 삭제 버튼 [V]

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
    height: "80px",
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

const TITLE_CATEGORY = {
  width: "32px",
  fontSize: "10px",
  padding: "1px 3px",
  backgroundColor: "#EEEEEE",
  textAlign: "center",
  color: "#9E9E9E",
  margin: "1px 0px 2px 4px",

  borderRadius: "2px",
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
const TITLE_FONT = {
  fontWeight: "bold",
  lineHeight: "140%",
  fontSize: "16px",
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
  displayDirection: "column",
  flexwrap: "nowrap",
  lineHeight: "140%",
  alignItems: "center",
  padding: "0px",
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

const URL_ICON = {
  width: "14px",
  height: "14px",
  display: "relative",
  fontSize: "14px",
  margin: "0px",
  padding: "0px",
  left: "50px",
  color: "#BDBDBD",
}

export interface ListDetailCardProp {
  index: number
  titleTop: string
  titleBody: string
  titleBottom: string
}

interface CoursePlaceState {
  order: number
  name: string
  description: string
  lng: number // 경도 x
  lat: number // 위도 y
  apiId: number
  category: string
}

interface ListDetailCardProps {
  item: CoursePlaceState
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void
  isSelected: boolean
  onRemove: (index: number) => void
  maxLen: number
}

const DisplayListDetailCard: React.FC<ListDetailCardProps> = ({
  onClick,
  isSelected,
  item: { order: index, name: placeName, category, description, apiId },
  maxLen,
  onRemove,
}) => {
  const routeUrl = `https://map.kakao.com/link/to/${apiId}`
  console.log(isSelected)
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
                <Typography sx={TITLE_FONT}>{placeName}</Typography>
                <Typography component="span" sx={TITLE_CATEGORY}>
                  {category}
                </Typography>
              </Box>
              <Box sx={DES_BOX}>
                <Typography variant="subtitle2" sx={TITLE_DES}>
                  {description}
                </Typography>
                <a href={routeUrl} target="_blank" rel="noreferrer">
                  <IconButton sx={URL_ICON}>
                    <KeyboardArrowRight />
                  </IconButton>
                </a>
              </Box>
              <Typography variant="subtitle2" sx={ADDRESS_FONT}>
                임시
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={1} />
        </ThemeGrid>
      </Grid>
    </Grid>
  )
}

export default DisplayListDetailCard
