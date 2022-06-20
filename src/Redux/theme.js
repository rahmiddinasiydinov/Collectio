import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name:'theme',
    initialState: {currentTheme:'light'}, 
    reducers: {
        setTheme:(state, actions)=> {
            state.currentTheme = actions.payload
        }
    }
    
})
export const themeActions = themeSlice.actions;
export default themeSlice.reducer;