import{ createSlice} from '@reduxjs/toolkit'

const scrollHeightSlice = createSlice({
    name: 'height',
    initialState: { scrollY: 0 },
    reducers: {
        setHeight: (state, action) => {
            state.scrollY = action.payload;
        }
    }
});
export const scrollActions = scrollHeightSlice.actions;
export default scrollHeightSlice.reducer