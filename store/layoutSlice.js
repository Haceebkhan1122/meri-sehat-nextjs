import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  header: {},
  footer: {}
}

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    addHeader: (state, action) => {
      state.header = action.payload
    },
    addFooter: (state, action) => {
      state.footer = action.payload
    }
  }
})

export const { addHeader, addFooter } = layoutSlice.actions;

export default layoutSlice.reducer;