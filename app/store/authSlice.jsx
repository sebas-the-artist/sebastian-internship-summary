import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthModalOpen: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    toggleAuthModal: (state) => {
      state.isAuthModalOpen = !state.isAuthModalOpen;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, toggleAuthModal, logout } = authSlice.actions;
export default authSlice.reducer;
