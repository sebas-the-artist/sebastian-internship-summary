// store/themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const getInitialMode = () => {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
};

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: getInitialMode(),
    favoriteColor: "#6b7280", // default gray
  },
  reducers: {
    setTheme: (state, action) => {
      state.mode = action.payload === "light" ? "light" : "dark";
    },
    toggleTheme: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
    setFavoriteColor: (state, action) => {
      state.favoriteColor = action.payload;
    },
  },
});

export const { setTheme, toggleTheme, setFavoriteColor } = themeSlice.actions;
export const selectThemeMode = (state) => state.theme.mode;
export const selectFavoriteColor = (state) => state.theme.favoriteColor;

export const initTheme = () => (dispatch) => {
  const mode = getInitialMode();
  dispatch(setTheme(mode));
};

export default themeSlice.reducer;
