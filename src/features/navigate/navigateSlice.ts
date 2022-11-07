import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { RootState } from "store"
import { LocalstorageName } from "types/auth"
import { loggedIn } from "features/auth/authSlice"

interface NavigateState {
  navbar: {
    currentIndex: number
    onDial: boolean
  }
}

const initialState: NavigateState = {
  navbar: {
    currentIndex: 0,
    onDial: false,
  },
}

const navigateSlice = createSlice({
  name: "navigate",
  initialState,
  reducers: {
    setCurrentIndex: (state, action: PayloadAction<number>) => {
      state.navbar.currentIndex = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loggedIn.type, (state) => {
      const index = localStorage.getItem(LocalstorageName.navigate) || "0"
      state.navbar.currentIndex = parseInt(index, 10)
    })
  },
})

export const { setCurrentIndex } = navigateSlice.actions

export const stateNavigate = (state: RootState): NavigateState => state.navigate

export default navigateSlice.reducer
