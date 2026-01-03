/* // components/Providers.js
"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "../store/store";

import { setUser } from "../store/authSlice";
import { setLibrary } from "../store/librarySlice";
import AuthModal from "./AuthModal/AuthModal.jsx";
import {
  initTheme,
  selectThemeMode,
  selectFavoriteColor,
} from "../store/themeSlice";

function AuthListener({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const safeUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        };
        dispatch(setUser(safeUser));

        try {
          const libraryRef = doc(db, "libraries", user.uid);
          const snap = await getDoc(libraryRef);
          const data = snap.exists() ? snap.data() : {};
          dispatch(setLibrary(data.books || []));
        } catch (err) {
          console.error("Failed to load library", err);
          dispatch(setLibrary([]));
        }
      } else {
        dispatch(setUser(null));
        dispatch(setLibrary([]));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      {children}
      <AuthModal />
    </>
  );
}

function ThemeListener({ children }) {
  const dispatch = useDispatch();
  const mode = useSelector(selectThemeMode);
  const favoriteColor = useSelector(selectFavoriteColor) || "#6b7280";

  // initialize theme from storage/system
  useEffect(() => {
    dispatch(initTheme());
  }, [dispatch]);

  // apply theme mode to document body
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.setAttribute("data-theme", mode);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("theme", mode);
    }
  }, [mode]);

  // FIXED: apply favorite color + hue conversion
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    
    // Set main color var
    root.style.setProperty("--favorite-color", favoriteColor);
    
    // FIXED hex → hue-rotate value (0-360deg)
    const hexToHue = (hex) => {
      hex = hex.replace("#", "");
      const r = parseInt(hex.substring(0, 2), 16) / 255;
      const g = parseInt(hex.substring(2, 4), 16) / 255;
      const b = parseInt(hex.substring(4, 6), 16) / 255;
      
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0;
      
      if (max === min) {
        h = 0;
      } else if (max === r) {
        h = ((g - b) / (max - min)) * 60;
      } else if (max === g) {
        h = ((b - r) / (max - min)) * 60 + 120;
      } else {
        h = ((r - g) / (max - min)) * 60 + 240;
      }
      
      if (h < 0) h += 360;
      return h;
    };
    
    const hue = hexToHue(favoriteColor);
    root.style.setProperty("--favorite-color-hue", `${hue}deg`);
    console.log("✅ Color sync:", favoriteColor, "Hue:", hue); // DEBUG - remove later
  }, [favoriteColor]);

  return <>{children}</>;
}

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <ThemeListener>
        <AuthListener>{children}</AuthListener>
      </ThemeListener>
    </Provider>
  );
}
 */


// components/Providers.js
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // ← ADD THIS
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "../store/store";

import { setUser } from "../store/authSlice";
import { setLibrary } from "../store/librarySlice";
import AuthModal from "./AuthModal/AuthModal.jsx";
import {
  initTheme,
  selectThemeMode,
  selectFavoriteColor,
} from "../store/themeSlice";

function AuthListener({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const safeUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        };
        dispatch(setUser(safeUser));

        try {
          const libraryRef = doc(db, "libraries", user.uid);
          const snap = await getDoc(libraryRef);
          const data = snap.exists() ? snap.data() : {};
          dispatch(setLibrary(data.books || []));
        } catch (err) {
          console.error("Failed to load library", err);
          dispatch(setLibrary([]));
        }
      } else {
        dispatch(setUser(null));
        dispatch(setLibrary([]));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      {children}
      <AuthModal />
    </>
  );
}

function ThemeListener({ children }) {
  const dispatch = useDispatch();
  const mode = useSelector(selectThemeMode);
  const favoriteColor = useSelector(selectFavoriteColor) || "#6b7280";

  // initialize theme from storage/system
  useEffect(() => {
    dispatch(initTheme());
  }, [dispatch]);

  // apply theme mode to document body
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.setAttribute("data-theme", mode);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("theme", mode);
    }
  }, [mode]);

  // FIXED: apply favorite color + hue conversion
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    
    // Set main color var
    root.style.setProperty("--favorite-color", favoriteColor);
    
    // FIXED hex → hue-rotate value (0-360deg)
    const hexToHue = (hex) => {
      hex = hex.replace("#", "");
      const r = parseInt(hex.substring(0, 2), 16) / 255;
      const g = parseInt(hex.substring(2, 4), 16) / 255;
      const b = parseInt(hex.substring(4, 6), 16) / 255;
      
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0;
      
      if (max === min) {
        h = 0;
      } else if (max === r) {
        h = ((g - b) / (max - min)) * 60;
      } else if (max === g) {
        h = ((b - r) / (max - min)) * 60 + 120;
      } else {
        h = ((r - g) / (max - min)) * 60 + 240;
      }
      
      if (h < 0) h += 360;
      return h;
    };
    
    const hue = hexToHue(favoriteColor);
    root.style.setProperty("--favorite-color-hue", `${hue}deg`);
  }, [favoriteColor]);

  return <>{children}</>;
}

// NEW: Mobile menu controller
function MenuController({ children }) {
  const router = useRouter();

  useEffect(() => {
    // Close menu on route change
    const handleRouteChange = () => {
      document.body.classList.remove('mobile-menu-open');
    };

    // Listen for Next.js route changes
    router.prefetch?.(''); // Ensure router events are active
    const handleStart = (url) => handleRouteChange();
    const handleComplete = (url) => handleRouteChange();

    // Use popstate for back/forward navigation
    const handlePopState = () => handleRouteChange();
    
    window.addEventListener('popstate', handlePopState);
    
    // Cleanup
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [router]);

  // Close menu when clicking outside (outside click handled by CSS)
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        document.body.classList.remove('mobile-menu-open');
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return <>{children}</>;
}

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <ThemeListener>
        <MenuController>
          <AuthListener>{children}</AuthListener>
        </MenuController>
      </ThemeListener>
    </Provider>
  );
}
