import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user', 
    initialState: { user: null },
    reducers: {
        setUser: (state, actions) => {
            state.user = actions.payload
        }
    }
})
export const userActions = userSlice.actions;
export default userSlice.reducer;