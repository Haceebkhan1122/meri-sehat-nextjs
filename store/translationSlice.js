import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  i18n: {}
}

export const translationSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    addTranslation: (state, action) => {
      state.i18n = action.payload
    }
  }
})

export const { addTranslation } = translationSlice.actions;

export default translationSlice.reducer;