// app/library/page.jsx
"use client";

import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import "./library.css";
import { db } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { removeBookFromLibrary } from "../store/librarySlice";
import { useMemo, useState } from "react";

export default function LibraryPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const savedBooks = useSelector((state) => state.library.savedBooks);
  const [sortMode, setSortMode] = useState("az");

  const sorted = useMemo(() => {
    if (!Array.isArray(savedBooks)) return [];
    const copy = [...savedBooks];
    if (sortMode === "az") {
      return copy.sort((a, b) => a.title.localeCompare(b.title));
    }
    return copy; // recent
  }, [savedBooks, sortMode]);

  const toggleSort = () => {
    setSortMode((prev) => (prev === "az" ? "recent" : "az"));
  };

  const handleRemove = async (e, bookId) => {
    e.preventDefault();
    e.stopPropagation();

    const nextBooks = savedBooks.filter((b) => b.id !== bookId);
    dispatch(removeBookFromLibrary(bookId));

    if (!user) return;

    try {
      const ref = doc(db, "libraries", user.uid);
      await setDoc(ref, { books: nextBooks }, { merge: true });
    } catch (err) {
      console.error("Failed to update library", err);
    }
  };

  if (!user) {
    return (
      <section className="library__wrapper">
        <h1 className="library__title">My Library</h1>
        <p className="library__text">
          Login to save and access your favorite titles.
        </p>
      </section>
    );
  }

  if (!sorted.length) {
    return (
      <section className="library__wrapper">
        <h1 className="library__title">My Library</h1>
        <p className="library__text">You haven’t added any titles yet.</p>
      </section>
    );
  }

  return (
    <section className="library__wrapper">
      <div className="library__headerRow">
        <div>
          <h1 className="library__title">My Library</h1>
          <p className="library__text">
            {sorted.length} {sorted.length === 1 ? "title" : "titles"} saved
          </p>
        </div>
        <button type="button" className="library__sort" onClick={toggleSort}>
          <span className="library__sortLabel">Sort:</span>
          <span className="library__sortValue">
            {sortMode === "az" ? "A–Z" : "Recently added"}
          </span>
        </button>
      </div>

      <div className="library__grid">
        {sorted.map((book) => (
          <Link
            key={book.id}
            href={`/book/${book.id}`}
            className="library__card"
          >
            <img
              src={book.imageLink}
              alt={book.title}
              className="library__cardImg"
            />
            <div className="library__cardBody">
              <h2 className="library__cardTitle">{book.title}</h2>
              <p className="library__cardAuthor">{book.author}</p>
              {book.subscriptionRequired && (
                <span className="library__pill">Premium</span>
              )}
              <button
                type="button"
                className="library__remove"
                onClick={(e) => handleRemove(e, book.id)}
              >
                Remove
              </button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* "use client";

import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { removeBookFromLibrary } from "../store/librarySlice";
import "./library.css";
import { db } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useState, useMemo } from "react";

export default function LibraryPage() {
  // 1) ALL HOOKS FIRST, NO CONDITIONS ABOVE
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const savedBooks = useSelector((state) => state.library.savedBooks);
  const [sortMode, setSortMode] = useState("az");

  // 2) useMemo ALWAYS runs; it can safely depend on user / savedBooks
  const sorted = useMemo(() => {
    if (!savedBooks || !Array.isArray(savedBooks)) return [];
    const copy = [...savedBooks];
    if (sortMode === "az") {
      return copy.sort((a, b) => a.title.localeCompare(b.title));
    }
    // “recently added” = original order
    return copy;
  }, [savedBooks, sortMode]);

  const toggleSort = () => {
    setSortMode((prev) => (prev === "az" ? "recent" : "az"));
  };

  const handleRemove = async (e, bookId) => {
    e.preventDefault();
    e.stopPropagation();

    const nextBooks = savedBooks.filter((b) => b.id !== bookId);
    dispatch(removeBookFromLibrary(bookId));

    try {
      const ref = doc(db, "libraries", user.uid);
      await setDoc(ref, { books: nextBooks }, { merge: true });
    } catch (err) {
      console.error("Failed to update library", err);
    }
  };

  // 3) AFTER ALL HOOKS, NOW DO CONDITIONAL RETURNS

  if (!user) {
    return (
      <section className="library__wrapper">
        <h1 className="library__title">My Library</h1>
        <p className="library__text">
          Sign in to see the books you have saved.
        </p>
      </section>
    );
  }

  if (!sorted.length) {
    return (
      <section className="library__wrapper">
        <h1 className="library__title">My Library</h1>
        <p className="library__text">You haven’t added any titles yet.</p>
      </section>
    );
  }

  return (
    <section className="library__wrapper">
      <div className="library__headerRow">
        <div>
          <h1 className="library__title">My Library</h1>
          <p className="library__text">
            {sorted.length} {sorted.length === 1 ? "title" : "titles"} saved
          </p>
        </div>
        <button type="button" className="library__sort" onClick={toggleSort}>
          <span className="library__sortLabel">Sort:</span>
          <span className="library__sortValue">
            {sortMode === "az" ? "A–Z" : "Recently added"}
          </span>
        </button>
      </div>

      <div className="library__grid">
        {sorted.map((book) => (
          <Link
            key={book.id}
            href={`/book/${book.id}`}
            className="library__card"
          >
            <img
              src={book.imageLink}
              alt={book.title}
              className="library__cardImg"
            />
            <div className="library__cardBody">
              <h2 className="library__cardTitle">{book.title}</h2>
              <p className="library__cardAuthor">{book.author}</p>
              {book.subscriptionRequired && (
                <span className="library__pill">Premium</span>
              )}
              <button
                type="button"
                className="library__remove"
                onClick={(e) => handleRemove(e, book.id)}
              >
                Remove
              </button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
 */
