"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleAuthModal } from "../../store/authSlice";
import "./AuthModal.css";

export default function AuthModal() {
  const dispatch = useDispatch();
  const isAuthModalOpen = useSelector((state) => state.auth.isAuthModalOpen);

  const [authMode, setAuthMode] = useState("login"); // 'login' | 'register'
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");

  if (!isAuthModalOpen) return null;

  const handleAuthSubmit = (event) => {
    event.preventDefault();
    // Later: hook this up to Firebase
    console.log(authMode, authEmail, authPassword);
    dispatch(toggleAuthModal());
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

        <form className="authModal__form" onSubmit={handleAuthSubmit}>
          <input
            type="email"
            className="authModal__input"
            placeholder="Email"
            value={authEmail}
            onChange={(event) => setAuthEmail(event.target.value)}
          />
          <input
            type="password"
            className="authModal__input"
            placeholder="Password"
            value={authPassword}
            onChange={(event) => setAuthPassword(event.target.value)}
          />

          <button type="submit" className="authModal__button--primary">
            {authMode === "login" ? "Login" : "Register"}
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
          onClick={() => {
            // later: hard‑coded guest email/pass
            dispatch(toggleAuthModal());
          }}
        >
          Continue as guest
        </button>
      </div>
    </div>
  );
}
