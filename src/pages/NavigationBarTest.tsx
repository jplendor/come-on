import React, { useState } from "react"
import NavigationBar from "../components/common/NavigationBar"

const NavigationBarTest: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)

  return (
    <>
      <NavigationBar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        minPage={1}
        maxPage={3}
      />
      {`${currentPage} 페이지`}
    </>
  )
}

export default NavigationBarTest
