import { configureStore } from '@reduxjs/toolkit';
import themeSlice from './theme';
import languageSlice from './languageSlice';

export const store = configureStore({
    reducer: {
        language: languageSlice, 
        theme:themeSlice
    }
})