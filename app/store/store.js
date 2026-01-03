// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import booksReducer from "./booksSlice";
import libraryReducer from "./librarySlice";
import highlightsReducer from "./highlightsSlice";
import themeReducer from "./themeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: booksReducer,
    library: libraryReducer,
    highlights: highlightsReducer,
    theme: themeReducer,
  },
});
