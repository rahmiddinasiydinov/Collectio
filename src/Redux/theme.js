import { createSlice } from "@reduxjs/toolkit";

const theme = window.localStorage.getItem('theme') || 'light';
const themeSlice = createSlice({
    name:'theme',
    initialState: { currentTheme: theme }, 
    reducers: {
        setTheme:(state, actions)=> {
            state.currentTheme = actions.payload
        }
    }
    
})
export const themeActions = themeSlice.actions;
export default themeSlice.reducer;