import { createSlice } from "@reduxjs/toolkit";


const MenuSlice = createSlice({
    name: 'menu',
    initialState: { isOpen: false },
    reducers: {
        toggleMenu: (state, actions) => {
            state.isOpen = actions.payload
        }
    }
});
export const MenuActions = MenuSlice.actions;
export default MenuSlice.reducer;