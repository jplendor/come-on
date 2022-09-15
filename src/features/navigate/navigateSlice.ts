import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { loggedIn } from "features/auth/authSlice"
import { RootState } from "store"

interface NavigateState {
  navbar: {
    currentIndex: number
  }
}

const initialState: NavigateState = {
  navbar: {
    currentIndex: 0,
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
      const index = localStorage.getItem("index") || "0"
      state.navbar.currentIndex = parseInt(index, 10)
    })
  },
})

export const { setCurrentIndex } = navigateSlice.actions

export const stateNavigate = (state: RootState): NavigateState => state.navigate

export default navigateSlice.reducer
