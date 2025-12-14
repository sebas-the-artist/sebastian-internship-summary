import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// selected book (single)
export const fetchSelectedBook = createAsyncThunk(
  "books/fetchSelectedBook",
  async () => {
    const res = await fetch(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"
    );
    const data = await res.json();
    return data; // single book object
  }
);

// recommended
export const fetchRecommendedBooks = createAsyncThunk(
  "books/fetchRecommendedBooks",
  async () => {
    const res = await fetch(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"
    );
    const data = await res.json();
    return data; // array
  }
);

// suggested
export const fetchSuggestedBooks = createAsyncThunk(
  "books/fetchSuggestedBooks",
  async () => {
    const res = await fetch(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested"
    );
    const data = await res.json();
    return data; // array
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState: {
    selectedBook: null,
    recommendedBooks: [],
    suggestedBooks: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // loading
      .addCase(fetchSelectedBook.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRecommendedBooks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSuggestedBooks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      // success
      .addCase(fetchSelectedBook.fulfilled, (state, action) => {
        state.selectedBook = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchRecommendedBooks.fulfilled, (state, action) => {
        state.recommendedBooks = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchSuggestedBooks.fulfilled, (state, action) => {
        state.suggestedBooks = action.payload;
        state.isLoading = false;
      })

      // error
      .addCase(fetchSelectedBook.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(fetchRecommendedBooks.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(fetchSuggestedBooks.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export default booksSlice.reducer;
