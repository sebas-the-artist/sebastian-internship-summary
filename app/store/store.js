import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import booksReducer from './booksSlice';
import libraryReducer from './librarySlice';
import highlightsReducer from './highlightsSlice';



export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: booksReducer,
    library: libraryReducer,
    highlights: highlightsReducer,
  },
});
