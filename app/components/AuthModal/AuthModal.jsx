"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleAuthModal,
  setAuthLoading,
  setAuthError,
} from "../../store/authSlice";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../lib/firebase";
import "./AuthModal.css";

export default function AuthModal() {
  const dispatch = useDispatch();
  const { isAuthModalOpen, authStatus, authError } = useSelector(
    (state) => state.auth
  );

  const [authMode, setAuthMode] = useState("login"); // 'login' | 'register'
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");

  if (!isAuthModalOpen) return null;

  const isLoading = authStatus === "loading";

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(setAuthLoading());

    try {
      if (authMode === "login") {
        await signInWithEmailAndPassword(auth, authEmail, authPassword);
      } else {
        await createUserWithEmailAndPassword(auth, authEmail, authPassword);
      }

      dispatch(toggleAuthModal());
      window.location.href = "/for-you";
    } catch (error) {
      dispatch(setAuthError(error.message || "Authentication failed"));
    }
  };

  const handleGuestLogin = async () => {
    dispatch(setAuthLoading());
    try {
      const guestEmail = "guest@gmail.com";
      const guestPassword = "password";

      const cred = await signInWithEmailAndPassword(
        auth,
        guestEmail,
        guestPassword
      );
      console.log("guest login success:", cred.user?.email);

      dispatch(toggleAuthModal());
      window.location.href = "/for-you";
    } catch (error) {
      console.error("guest login error:", error);
      dispatch(setAuthError(error.message || "Guest login failed"));
    }
  };

  return (
    <div className="authModal__overlay">
      <div className="authModal__container">
        <button
          className="authModal__close"
          onClick={() => dispatch(toggleAuthModal())}
        >
          ×
        </button>

        <h2 className="authModal__title">
          {authMode === "login" ? "Login" : "Create account"}
        </h2>

        <form className="authModal__form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="authModal__input"
            placeholder="Email"
            value={authEmail}
            onChange={(event) => setAuthEmail(event.target.value)}
            required
          />
          <input
            type="password"
            className="authModal__input"
            placeholder="Password"
            value={authPassword}
            onChange={(event) => setAuthPassword(event.target.value)}
            required
          />

          {authError && <p className="authModal__errorText">{authError}</p>}

          <button
            type="submit"
            className="authModal__button--primary"
            disabled={isLoading}
          >
            {isLoading
              ? "Working..."
              : authMode === "login"
              ? "Login"
              : "Register"}
          </button>
        </form>

        <div className="authModal__footer">
          <p className="authModal__text">
            {authMode === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
          </p>
          <button
            className="authModal__button--ghost"
            type="button"
            onClick={() =>
              setAuthMode(authMode === "login" ? "register" : "login")
            }
          >
            {authMode === "login" ? "Create one" : "Login"}
          </button>
        </div>

        <button
          className="authModal__button--guest"
          type="button"
          onClick={handleGuestLogin}
          disabled={isLoading}
        >
          Continue as guest
        </button>
      </div>
    </div>
  );
}
