/* eslint-disable react/jsx-props-no-spreading */
import React, { memo, useEffect, useMemo, useState } from "react"
import { styled } from "@mui/material/styles"
import {
  Stack,
  Paper,
  Dialog,
  Button,
  Typography,
  DialogTitle,
  DialogContent,
  PaperProps,
} from "@mui/material"

import { generateComponent } from "utils"
import {
  useGetMeetingCodeQuery,
  useUpdateMeetingCodeMutation,
} from "features/meeting/meetingSlice"
import useCopyToClipboard from "hooks/useCopyToClipboard"

interface CardDialogProps {
  dialog: boolean
  setAnchorEl: (value: null) => void
  setDialog: (value: boolean) => void
  meetingId: number
  meetingCodeId: number
}

const ThemeDialog = styled(Dialog)(() => ({
  "& .MuiDialog-paper": {
    paddingTop: "5px",
    borderRadius: "8px",
  },
}))

const DialogTitleText = styled(Typography)(
  ({
    theme: {
      grayscale,
      textStyles: {
        title3: { bold },
      },
    },
  }) => ({
    fontSize: bold.fontSize,
    lineHeight: bold.lineHeight,
    fontWeight: bold.fontWeight,
    color: grayscale[900],
  })
)

const DialogContentText = styled(Typography)(
  ({
    theme: {
      grayscale,
      textStyles: {
        body1: { regular },
      },
    },
  }) => ({
    fontSize: regular.fontSize,
    lineHeight: regular.lineHeight,
    textAlign: "center",
    color: grayscale[700],
  })
)

const CodeText = styled(Typography)(
  ({
    theme: {
      grayscale,
      textStyles: {
        title2: { regular },
      },
    },
  }) => ({
    fontSize: regular.fontSize,
    lineHeight: regular.lineHeight,
    textAlign: "center",
    color: grayscale[900],
  })
)

// 코드 표시
const Item = styled((props: PaperProps) => <Paper {...props} elevation={0} />)(
  ({ theme: { grayscale } }) => ({
    gap: "10px",
    padding: "6px 8px",
    width: "30px",
    height: "40px",
    borderRadius: "4px",
    textAlign: "center",
    backgroundColor: grayscale[100],
  })
)

const ThemeButton = styled(Button)(() => ({
  height: "48px",
  gap: "10px",
  borderRadius: "4px",
  padding: "14px 16px",
}))

// 닫기 버튼
const CancelButton = styled(ThemeButton)(({ theme: { grayscale } }) => ({
  width: "100px",
  backgroundColor: grayscale[400],
  "&:hover": {
    backgroundColor: grayscale[400],
  },
}))

// 갱신 & 복사 버튼
const ActionButton = styled(ThemeButton)(
  ({
    theme: {
      palette: { primary },
    },
  }) => ({
    width: "150px",
    backgroundColor: primary.main,
    "&:hover": {
      backgroundColor: primary.main,
    },
  })
)

const ButtonText = styled(Typography)(
  ({
    theme: {
      grayscale,
      textStyles: {
        body1: { regular },
      },
    },
  }) => ({
    fontSize: regular.fontSize,
    lineHeight: regular.lineHeight,
    color: grayscale[50],
  })
)

const CardDialog = memo(
  ({
    dialog,
    setAnchorEl,
    setDialog,
    meetingId,
    meetingCodeId,
  }: CardDialogProps): JSX.Element => {
    const [copy] = useCopyToClipboard()
    const handleCloseDialog = (e: React.MouseEvent<HTMLElement>): void => {
      e.stopPropagation()
      setAnchorEl(null)
      setDialog(false)
    }
    const [codeInfo, setCodeInfo] = useState({
      isExpired: false,
      title: "",
      code: ["-", "-", "-", "-", "-", "-"],
      content: "",
      actionButtonText: "복사하기",
    })

    const [updateCode] = useUpdateMeetingCodeMutation()
    const { isLoading, isSuccess, data, refetch } = useGetMeetingCodeQuery({
      codeId: meetingCodeId,
      meetingId,
    })

    const { title, content, code, actionButtonText, isExpired } = useMemo(
      () => codeInfo,
      [codeInfo]
    )

    const handleOnClick = (e: React.MouseEvent<HTMLElement>): void => {
      e.stopPropagation()
      // 초기 핸들러 방지
      if (isLoading) return
      // 초대코드 재요청
      if (isExpired) {
        updateCode({
          codeId: meetingCodeId,
          meetingId,
        }).then(refetch)
      } else {
        // 코드복사하기
        copy(code.join(""))
        setCodeInfo({
          ...codeInfo,
          actionButtonText: "복사완료!",
        })
      }
    }

    useEffect(() => {
      if (isSuccess) {
        const {
          data: { inviteCode, isExpired: codeStatus },
        } = data

        let info = {
          isExpired: codeStatus,
          title: "초대코드가 생성됐습니다!",
          code: inviteCode.split(""),
          content: "복사해서 사용하세요",
          actionButtonText: "복사하기",
        }
        if (codeStatus) {
          info = {
            isExpired: codeStatus,
            title: "초대코드가 만료됐습니다!",
            code: ["-", "-", "-", "-", "-", "-"],
            content: "코드를 새로 생성하세요",
            actionButtonText: "갱신하기",
          }
        }
        setCodeInfo(info)
      }
    }, [data, isSuccess])

    return (
      <ThemeDialog open={dialog}>
        <DialogTitle textAlign="center">
          <DialogTitleText>
            {isLoading ? "초대코드 생성중..." : title}
          </DialogTitleText>
        </DialogTitle>
        <DialogContent>
          <Stack direction="row" spacing="2px" justifyContent="center">
            {generateComponent(code, (value, key) => (
              <Item key={key}>
                <CodeText>{value}</CodeText>
              </Item>
            ))}
          </Stack>
          <DialogContentText pt="12px">{content}</DialogContentText>
          <Stack direction="row" spacing="8px" pt="20px">
            <CancelButton onClick={handleCloseDialog}>
              <ButtonText>닫기</ButtonText>
            </CancelButton>
            <ActionButton onClick={handleOnClick}>
              <ButtonText>{actionButtonText}</ButtonText>
            </ActionButton>
          </Stack>
        </DialogContent>
      </ThemeDialog>
    )
  }
)

export default CardDialog
