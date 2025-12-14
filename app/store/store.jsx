import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import booksSlice from "./booksSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    books: booksSlice,
  },
});
