import React from "react"
import { Link } from "react-router-dom"

const MeetingListRead = (): JSX.Element => {
  return (
    <>
      <div>모임 리스트 조회</div>
      <div>*** 임시 링크 (SpeedDial로 연결 예정) ***</div>
      <Link to="/meeting/register">모임 생성</Link>
      <br />
      <Link to="/meeting/3">모임 수정</Link>
    </>
  )
}

export default MeetingListRead
