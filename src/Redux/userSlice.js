import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user', 
    initialState: {
        user: null,
        admin:null
    },
    reducers: {
        setUser: (state, actions) => {
            state.user = actions.payload
        }, 
        setAdmin: (state, actions) => {
            state.admin = actions.payload
        }
    }
})
export const userActions = userSlice.actions;
export default userSlice.reducer;