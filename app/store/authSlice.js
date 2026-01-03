/* 
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthModalOpen: false,
    authStatus: 'idle',
    authError: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    toggleAuthModal: (state) => {
      state.isAuthModalOpen = !state.isAuthModalOpen;
      state.authError = null;
      state.authStatus = 'idle';
    },
    setAuthLoading: (state) => {
      state.authStatus = 'loading';
      state.authError = null;
    },
    setAuthError: (state, action) => {
      state.authStatus = 'error';
      state.authError = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const {
  setUser,
  toggleAuthModal,
  setAuthLoading,
  setAuthError,
  logout,
} = authSlice.actions;

export default authSlice.reducer;

 */

// store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    authStatus: "idle",      // "idle" | "loading" | "succeeded" | "failed"
    authError: null,
    isAuthModalOpen: false,
  },
  reducers: {
    toggleAuthModal(state) {
      state.isAuthModalOpen = !state.isAuthModalOpen;
      // clear errors when opening
      if (state.isAuthModalOpen) {
        state.authError = null;
      }
    },
    setAuthLoading(state) {
      state.authStatus = "loading";
      state.authError = null;
    },
    setUser(state, action) {
      state.user = action.payload;
      state.authStatus = "succeeded";   // ← leaves "loading"
      state.authError = null;
    },
    setAuthError(state, action) {
      state.authStatus = "failed";      // ← leaves "loading"
      state.authError = action.payload;
    },
    logout(state) {
      state.user = null;
      state.authStatus = "idle";
      state.authError = null;
    },
  },
});

export const {
  toggleAuthModal,
  setAuthLoading,
  setAuthError,
  setUser,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
