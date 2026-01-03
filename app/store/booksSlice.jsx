// store/booksSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/**
 * Thunks
 */

// hero: selected book on For You
export const fetchSelectedBook = createAsyncThunk(
  "books/fetchSelectedBook",
  async () => {
    const res = await fetch(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"
    );
    if (!res.ok) {
      throw new Error("Failed to fetch selected book");
    }
    const data = await res.json();
    return data; // single book object
  }
);

// recommended list
export const fetchRecommendedBooks = createAsyncThunk(
  "books/fetchRecommendedBooks",
  async () => {
    const res = await fetch(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"
    );
    if (!res.ok) {
      throw new Error("Failed to fetch recommended books");
    }
    const data = await res.json();
    return data; // array
  }
);

// suggested list
export const fetchSuggestedBooks = createAsyncThunk(
  "books/fetchSuggestedBooks",
  async () => {
    const res = await fetch(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested"
    );
    if (!res.ok) {
      throw new Error("Failed to fetch suggested books");
    }
    const data = await res.json();
    return data; // array
  }
);

// single book by id (used on /book/[id] and /player/[id])
export const fetchBookById = createAsyncThunk(
  "books/fetchBookById",
  async (id) => {
    const res = await fetch(
      `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch book");
    }
    const data = await res.json();
    return data; // single book object
  }
);

/**
 * Slice
 */

const booksSlice = createSlice({
  name: "books",
  initialState: {
    currentBook: null, // for /book/[id] and /player/[id]
    selectedBook: null, // hero on For You
    recommendedBooks: [],
    suggestedBooks: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // pending
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
      .addCase(fetchBookById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.currentBook = null;
      })

      // fulfilled
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
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.currentBook = action.payload;
        state.isLoading = false;
      })

      // rejected
      .addCase(fetchSelectedBook.rejected, (state, action) => {
        state.error = action.error.message || "Failed to load selected book";
        state.isLoading = false;
      })
      .addCase(fetchRecommendedBooks.rejected, (state, action) => {
        state.error = action.error.message || "Failed to load recommended";
        state.isLoading = false;
      })
      .addCase(fetchSuggestedBooks.rejected, (state, action) => {
        state.error = action.error.message || "Failed to load suggested";
        state.isLoading = false;
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.error = action.error.message || "Failed to load book";
        state.isLoading = false;
      });
  },
});

export default booksSlice.reducer;
