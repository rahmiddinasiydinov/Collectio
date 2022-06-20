import { createSlice } from "@reduxjs/toolkit";

const languageSlice = createSlice({
  name: "languageSlice",
  initialState: { currentLanguage: "uz" },
  reducers: {
    setLanguage: (state, actions) => {
      state.currentLanguage = actions.payload;
    },
  },
});
export const languageActions = languageSlice.actions;
export default languageSlice.reducer;
