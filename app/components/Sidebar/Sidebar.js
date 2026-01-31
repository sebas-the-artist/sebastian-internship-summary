"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toggleAuthModal, logout } from "../../store/authSlice";
import { signOut } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { auth } from "../../lib/firebase";
import "../../globals.css";

export default function Sidebar() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const sidebarRef = useRef(null);
  const tabRef = useRef(null);

  // DO NOT early-return before these hooks

  // layout body class
  useEffect(() => {
    document.body.classList.toggle("sidebar-collapsed", isCollapsed);
  }, [isCollapsed]);

  // mobile open body class
  useEffect(() => {
    document.body.classList.toggle("sidebar-open", isMobileOpen);
  }, [isMobileOpen]);

  // click outside to close (mobile)
  useEffect(() => {
    if (!isMobileOpen) return;

    function handleClickOutside(event) {
      const sidebarEl = sidebarRef.current;
      const tabEl = tabRef.current;
      const target = event.target;

      if (!sidebarEl) return;
      if (sidebarEl.contains(target)) return;
      if (tabEl && tabEl.contains(target)) return;

      setIsMobileOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMobileOpen]);

  // NOW it's safe to early-return based on route
  const isHomeOrSales = pathname === "/" || pathname === "/choose-plan";
  if (isHomeOrSales) return null;

  const handleAuthClick = async () => {
    if (user) {
      await signOut(auth);
      dispatch(logout());
    } else {
      dispatch(toggleAuthModal());
    }
  };

  const handleHelpClick = () => {
    alert(
      "Is this an emergency?\n\nIf yes: call 911.\nIf no: you probably got this."
    );
  };

  const handleTabClick = () => {
    if (window.innerWidth <= 768) {
      setIsMobileOpen((prev) => !prev);
    } else {
      setIsCollapsed((prev) => !prev);
    }
  };

  const isActive = (route) => pathname === route;

  return (
    <>
      <button
        type="button"
        className="sidebar__pull-tab"
        onClick={handleTabClick}
        aria-label="Toggle navigation"
        ref={tabRef}
      >
        <span className="sidebar__pull-tab-icon">
          {isCollapsed || isMobileOpen ? "⮜" : "⮞"}
        </span>
      </button>

      <aside className="sidebar__container" ref={sidebarRef}>
        <div className="sidebar__logoRow">
          <Link href="/">
            <Image
              src="/assets/logo.png"
              alt="Summarist"
              width={160}
              height={48}
              className="sidebar__logo"
            />
          </Link>
        </div>

        <nav className="sidebar__nav">
          <Link
            href="/for-you"
            className={`sidebar__link ${
              isActive("/for-you") ? "sidebar__link--active" : ""
            }`}
          >
            <i className="fa-regular fa-house sidebar__icon" />
            <span>For you</span>
          </Link>

          <Link
            href="/library"
            className={`sidebar__link ${
              isActive("/library") ? "sidebar__link--active" : ""
            }`}
          >
            <i className="fa-regular fa-bookmark sidebar__icon" />
            <span>My library</span>
          </Link>

          <Link
            href="/highlights"
            className={`sidebar__link ${
              isActive("/highlights") ? "sidebar__link--active" : ""
            }`}
          >
            <i className="fa-solid fa-highlighter sidebar__icon" />
            <span>Highlights</span>
          </Link>

          <button type="button" className="sidebar__link">
            <i className="fa-solid fa-magnifying-glass sidebar__icon" />
            <span>Search</span>
          </button>

          <Link
            href="/settings"
            id="sidebar__divide"
            className={`sidebar__link ${
              isActive("/settings") ? "sidebar__link--active" : ""
            }`}
          >
            <i className="fa-solid fa-user-gear sidebar__icon" />
            <span>Settings</span>
          </Link>

          <button
            type="button"
            className="sidebar__link"
            onClick={handleHelpClick}
          >
            <i className="fa-regular fa-circle-question sidebar__icon" />
            <span>Help &amp; Support</span>
          </button>

          <button
            type="button"
            className="sidebar__link"
            onClick={handleAuthClick}
          >
            <i
              className={`sidebar__icon ${
                user
                  ? "fa-solid fa-arrow-right-from-bracket"
                  : "fa-solid fa-arrow-right-to-bracket"
              }`}
            />
            <span>{user ? "Logout" : "Login"}</span>
          </button>
        </nav>
      </aside>
    </>
  );
}



/* // components/Sidebar/Sidebar.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toggleAuthModal, logout } from "../../store/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
//import "./Sidebar.css";
import "../../globals.css"

export default function Sidebar() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const isHomeOrSales = pathname === "/" || pathname === "/choose-plan";

  if (isHomeOrSales) return null;

  const handleAuthClick = async () => {
    if (user) {
      await signOut(auth);
      dispatch(logout());
    } else {
      dispatch(toggleAuthModal());
    }
  };

  const handleHelpClick = () => {
    alert("Is this an emergency?\n\nIf yes: call 911.\nIf no: you probably got this.");
  };

  return (
    <aside className="sidebar__container">
      <div className="sidebar__logoRow">
        <Link href="/">
          <Image
            src="/assets/logo.png"
            alt="Summarist"
            width={120}
            height={32}
            className="sidebar__logo"
          />
        </Link>
      </div>

      <nav className="sidebar__nav">
        <Link
          href="/for-you"
          className={`sidebar__link ${
            pathname === "/for-you" ? "sidebar__link--active" : ""
          }`}
        >
          <i className="fa-regular fa-house sidebar__icon" />
          <span>For you</span>
        </Link>

        <Link
          href="/library"
          className={`sidebar__link ${
            pathname === "/library" ? "sidebar__link--active" : ""
          }`}
        >
          <i className="fa-regular fa-bookmark sidebar__icon" />
          <span>My library</span>
        </Link>

        <Link
          href="/highlights"
          className={`sidebar__link ${
            pathname === "/highlights" ? "sidebar__link--active" : ""
          }`}
        >
          <i className="fa-solid fa-highlighter sidebar__icon" />
          <span>Highlights</span>
        </Link>

        <button type="button" className="sidebar__link">
          <i className="fa-solid fa-magnifying-glass sidebar__icon" />
          <span>Search</span>
        </button>

        <Link
          href="/settings"
          id="sidebar__divide"
          className= {`sidebar__link ${
            pathname === "/settings" ? "sidebar__link--active" : ""
          }`}
        >
          <i className="fa-solid fa-user-gear sidebar__icon " />
          <span>Settings</span>
        </Link>

        <button
          type="button"
          className="sidebar__link"
          onClick={handleHelpClick}
        >
          <i className="fa-regular fa-circle-question sidebar__icon" />
          <span>Help &amp; Support</span>
        </button>

        <button
          type="button"
          className="sidebar__link"
          onClick={handleAuthClick}
        >
          <i
            className={`sidebar__icon ${
              user
                ? "fa-solid fa-arrow-right-from-bracket"
                : "fa-solid fa-arrow-right-to-bracket"
            }`}
          />
          <span>{user ? "Logout" : "Login"}</span>
        </button>
      </nav>
    </aside>
  );
}
 */

/* "use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toggleAuthModal, logout } from "../../store/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import "./Sidebar.css";

export default function Sidebar() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const isHomeOrSales = pathname === "/" || pathname === "/choose-plan";

  if (isHomeOrSales) return null;

  const handleAuthClick = async () => {
    if (user) {
      await signOut(auth);
      dispatch(logout());
    } else {
      dispatch(toggleAuthModal());
    }
  };

  const handleHelpClick = () => {
    alert("Is this an emergency?\n\nIf yes: call 911.\nIf no: you probably got this.");
  };

  return (
    <aside className="sidebar__container">
      <div className="sidebar__logoRow">
        <Link href="/">
          <Image
            src="/assets/logo.png"
            alt="Summarist"
            //width={120}
            width={160}
            //height={32}
            height={48}
            className="sidebar__logo"
          />
        </Link>
      </div>

      <nav className="sidebar__nav">
        <Link
          href="/for-you"
          className={`sidebar__link ${
            pathname === "/for-you" ? "sidebar__link--active" : ""
          }`}
        >
          For you
        </Link>

        <Link
          href="/library"
          className={`sidebar__link ${
            pathname === "/library" ? "sidebar__link--active" : ""
          }`}
        >
          Library
        </Link>

        <Link
          href="/highlights"
          className={`sidebar__link ${
            pathname === "/highlights" ? "sidebar__link--active" : ""
          }`}
        >
          Highlights
        </Link>

        <button type="button" className="sidebar__link">
          Search
        </button>

        <Link
          href="/settings"
          className={`sidebar__link ${
            pathname === "/settings" ? "sidebar__link--active" : ""
          }`}
        >
          Settings
        </Link>

        <button
          type="button"
          className="sidebar__link"
          onClick={handleHelpClick}
        >
          Help &amp; Support
        </button>

        <button
          type="button"
          className="sidebar__link"
          onClick={handleAuthClick}
        >
          {user ? "Logout" : "Login"}
        </button>
      </nav>
    </aside>
  );
}
 */