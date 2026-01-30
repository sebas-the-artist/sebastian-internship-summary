// components/SearchBar/SearchBar.jsx
"use client";

import React, { useState, useEffect } from "react";
import "./SearchBar.css";

const DEBOUNCE_MS = 400;

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    const handle = setTimeout(() => {
      setDebounced(value.trim());
    }, DEBOUNCE_MS);
    return () => clearTimeout(handle);
  }, [value]);

  useEffect(() => {
    if (!onSearch) return;
    onSearch(debounced);
  }, [debounced, onSearch]);

  return (
    <div className="search-bar">
      <input
        type="search"
        placeholder="Search books, authors, topics…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="search-bar__input"
      />
      <button type="button" className="search-bar__iconButton">
        <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
      </button>
    </div>
  );
}
