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
import { Close as CloseIcon, Edit as EditIcon } from "@mui/icons-material"

// TODO: 버튼 2개 작업
// 1. 메모버튼 [V]
// 2. 리스트 삭제 버튼 [V]

const ThemeCardNumbering = styled(Typography)<TypographyProps>(({ theme }) => ({
  "&.MuiTypography-root": {
    backgroundColor: theme.palette.primary.main,
  },
}))

const ThemeGrid = styled(Grid)<GridProps>(({ theme }) => ({
  "&.MuiGrid-root": {
    borderRadius: "10px 0 0 10px",
    border: `1px solid ${theme.palette.primary.main}`,
  },
}))

const CARD_NUMBERING = {
  color: "white",
  height: "110px",
  lineHeight: "110px",
  borderRadius: "0 10px 10px 0",
}

const TITLE_WRAP = {
  height: "110px",
  padding: "15px",
}

const TITLE_TOP = {
  fontWeight: 800,
  fontSize: "10px",
  lineHeight: "12px",
  //  TODO: 추후에 props로 color 속성 전달예정
  color: "#FFA3A3",
  border: "1px solid #FFA3A3",
}
const TITLE_BODY = {
  fontWeight: "bold",
  lineHeight: "24px",
}

const TITLE_BOTTOM = {
  fontWeight: "400",
  lineHeight: "19px",
}

const GRID_WRAP = {
  py: "5px",
}

const EDIT_BTN = {
  height: "0px",
  mb: "5px",
}

export interface ListDetailCardProp {
  index: number
  titleTop: string
  titleBody: string
  titleBottom: string
}

interface ListDetailCardProps {
  item: ListDetailCardProp
}

const ListDetailCard: React.FC<ListDetailCardProps> = ({
  item: { index, titleBody, titleBottom, titleTop },
}) => {
  return (
    <Grid container spacing={2} sx={GRID_WRAP}>
      <Grid item xs={2}>
        <ThemeCardNumbering variant="h2" align="center" sx={CARD_NUMBERING}>
          {index}
        </ThemeCardNumbering>
      </Grid>
      <Grid item xs={10}>
        <ThemeGrid container>
          <Grid item xs={11}>
            <Box sx={TITLE_WRAP}>
              <Typography component="span" sx={TITLE_TOP}>
                {titleTop}
              </Typography>
              <Typography variant="h6" sx={TITLE_BODY}>
                {titleBody}
              </Typography>
              <Typography variant="subtitle2" sx={TITLE_BOTTOM}>
                {titleBottom}
                <IconButton
                  aria-label="edit this"
                  color="secondary"
                  sx={EDIT_BTN}
                >
                  <EditIcon />
                </IconButton>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={1}>
            <IconButton aria-label="close this" color="secondary" size="small">
              <CloseIcon />
            </IconButton>
          </Grid>
        </ThemeGrid>
      </Grid>
    </Grid>
  )
}

export default ListDetailCard
