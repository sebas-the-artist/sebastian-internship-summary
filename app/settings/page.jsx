// app/settings/page.jsx
"use client";

import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toggleAuthModal } from "../store/authSlice";
import { toggleTheme, selectThemeMode } from "../store/themeSlice";
import "./settings.css";

export default function SettingsPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const mode = useSelector(selectThemeMode);

  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [favoriteColor, setFavoriteColor] = useState("#6b7280"); // default gray

  useEffect(() => {
    if (!user) {
      setPlan(null);
      setFavoriteColor("#6b7280"); // reset to default
      return;
    }

    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const subRef = doc(db, "subscriptions", user.uid);
        const colorRef = doc(db, "users", user.uid);

        const [subSnap, colorSnap] = await Promise.all([
          getDoc(subRef),
          getDoc(colorRef),
        ]);

        if (!cancelled) {
          // Subscription
          if (subSnap.exists()) {
            setPlan(subSnap.data().plan || "basic");
          } else {
            setPlan("basic");
          }

          // Favorite color
          if (colorSnap.exists()) {
            const colorData = colorSnap.data();
            setFavoriteColor(colorData.favoriteColor || "#6b7280");
          } else {
            setFavoriteColor("#6b7280");
          }
        }
      } catch (err) {
        console.error("Failed to load data", err);
        if (!cancelled) {
          setPlan("basic");
          setFavoriteColor("#6b7280");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [user]);

  const saveFavoriteColor = async (color) => {
    if (!user) return;

    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          favoriteColor: color,
        },
        { merge: true }
      );
    } catch (err) {
      console.error("Failed to save color", err);
    }
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const handleColorChange = (e) => {
    const color = e.target.value;
    setFavoriteColor(color);
    saveFavoriteColor(color);
  };

  if (!user) {
    return (
      <section className="settings__wrapper">
        <div className="settings__card settings__card--center">
          <h1 className="settings__title">Settings</h1>
          <p className="settings__text">
            Login to view your subscription details.
          </p>
          <button
            type="button"
            className="settings__button favorite-color"
            style={{ backgroundColor: favoriteColor }}
            onClick={() => dispatch(toggleAuthModal())}
          >
            Login
          </button>
        </div>

        <div className="settings__card settings__card--center">
          <h2 className="settings__title">Appearance</h2>
          <div className="settings__row">
            <span className="settings__label">Theme</span>
            <button
              type="button"
              className="settings__button favorite-color"
              style={{ backgroundColor: favoriteColor }}
              onClick={handleThemeToggle}
            >
              {mode === "dark" ? "Switch to light" : "Switch to dark"}
            </button>
          </div>
        </div>
      </section>
    );
  }

  const subscriptionLabel =
    plan === "premium-plus"
      ? "Premium Plus"
      : plan === "premium"
      ? "Premium"
      : "Basic";

  const isPaid = plan === "premium" || plan === "premium-plus";

  return (
    <section className="settings__wrapper">
      {/* TOP BOX: Account */}
      <div className="settings__card">
        <h1 className="settings__title">Account</h1>

        <div className="settings__row">
          <span className="settings__label">Email</span>
          <span className="settings__value">{user.email}</span>
        </div>

        <div className="settings__row">
          <span className="settings__label">Subscription</span>
          <span className="settings__value">
            {loading ? "Loading…" : subscriptionLabel}
          </span>
        </div>

        {!isPaid && (
          <div className="settings__actions">
            <Link
              href="/choose-plan"
              className="settings__button"
              style={{ backgroundColor: favoriteColor }}
            >
              Upgrade plan
            </Link>
          </div>
        )}
      </div>

      {/* BOTTOM BOX: Appearance */}
      <div className="settings__card">
        <h2 className="settings__title">Appearance</h2>

        <div className="settings__row">
          <span className="settings__label">Theme</span>
          <button
            type="button"
            className="settings__button"
            style={{ backgroundColor: favoriteColor }}
            onClick={handleThemeToggle}
            suppressHydrationWarning
          >
            {mode === "dark" ? "Switch to light" : "Switch to dark"}
          </button>
        </div>

        <div className="settings__row">
          <span className="settings__label">Favorite color</span>
          <input
            type="color"
            className="settings__colorInput"
            value={favoriteColor}
            onChange={handleColorChange}
          />
        </div>
      </div>
    </section>
  );
}
