import { createSlice } from "@reduxjs/toolkit";

// if authSlice.js is at app/store/authSlice.js
//import { toggleAuthModal } from '../../store/authSlice';


const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthModalOpen: false,
    authStatus: "idle",
    authError: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    toggleAuthModal: (state) => {
      state.isAuthModalOpen = !state.isAuthModalOpen;
      state.authError = null;
      state.authStatus = "idle";
    },
    setAuthLoading: (state) => {
      state.authStatus = "loading";
      state.authError = null;
    },
    setAuthError: (state, action) => {
      state.authStatus = "error";
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


/* import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthModalOpen: false,
    authStatus: "idle",
    authError: null,
  },
  reducers: {
    setUser: (state, action) => {
      // Expect a plain object or null
      state.user = action.payload;
    },
    toggleAuthModal: (state) => {
      state.isAuthModalOpen = !state.isAuthModalOpen;
      state.authError = null;
      state.authStatus = "idle";
    },
    setAuthLoading: (state) => {
      state.authStatus = "loading";
      state.authError = null;
    },
    setAuthError: (state, action) => {
      state.authStatus = "error";
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
