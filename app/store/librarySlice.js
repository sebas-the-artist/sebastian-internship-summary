import { createSlice } from '@reduxjs/toolkit';

const librarySlice = createSlice({
  name: 'library',
  initialState: {
    savedBooks: [],
    status: 'idle', // optional if you added this
  },
  reducers: {
    addBookToLibrary: (state, action) => {
      const newBook = action.payload;
      const exists = state.savedBooks.some((b) => b.id === newBook.id);
      if (!exists) {
        state.savedBooks.push(newBook);
      }
    },
    removeBookFromLibrary: (state, action) => {
      const id = action.payload;
      state.savedBooks = state.savedBooks.filter((b) => b.id !== id);
    },
    setLibrary: (state, action) => {
      state.savedBooks = action.payload || [];
      state.status = 'ready';
    },
    setLibraryLoading: (state) => {
      state.status = 'loading';
    },
  },
});

export const {
  addBookToLibrary,
  removeBookFromLibrary,
  setLibrary,
  setLibraryLoading,
} = librarySlice.actions;

export default librarySlice.reducer;
