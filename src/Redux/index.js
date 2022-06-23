import { configureStore } from '@reduxjs/toolkit';
import themeSlice from './theme';
import languageSlice from './languageSlice';
import userSlice from './userSlice';
export const store = configureStore({
    reducer: {
        // language: languageSlice, 
        // theme: themeSlice,
        user: userSlice,
    }
})