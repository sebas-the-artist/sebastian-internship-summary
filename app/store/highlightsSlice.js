import { createSlice } from '@reduxjs/toolkit';

const highlightsSlice = createSlice({
  name: 'highlights',
  initialState: {
    // { [bookId]: [ { id, text, createdAt } ] }
    byBookId: {},
  },
  reducers: {
    setHighlightsForBook: (state, action) => {
      const { bookId, highlights } = action.payload;
      state.byBookId[bookId] = highlights || [];
    },
    addHighlight: (state, action) => {
      const { bookId, highlight } = action.payload;
      const list = state.byBookId[bookId] || [];
      state.byBookId[bookId] = [...list, highlight];
    },
    removeHighlight: (state, action) => {
      const { bookId, highlightId } = action.payload;
      const list = state.byBookId[bookId] || [];
      state.byBookId[bookId] = list.filter((h) => h.id !== highlightId);
    },
  },
});

export const {
  setHighlightsForBook,
  addHighlight,
  removeHighlight,
} = highlightsSlice.actions;

export default highlightsSlice.reducer;
