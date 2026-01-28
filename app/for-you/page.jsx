// app/for-you/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSelectedBook,
  fetchRecommendedBooks,
  fetchSuggestedBooks,
} from "../store/booksSlice";
import Link from "next/link";
import SearchBar from "../components/Searchbar/SearchBar.js";

import SkeletonLoader from "../components/Skeleton/SkeletonLoader";
//import "./forYou.css";
import "../globals.css";

// Search API used by the search bar
async function searchBooks(query) {
  if (!query) return [];

  const url =
    "https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle" +
    `?search=${encodeURIComponent(query)}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Search failed");
  }
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

const FALLBACK_SELECTED = {
  id: "cant-hurt-me",
  title: "Can't Hurt Me",
  author: "David Goggins",
  imageLink: "./assets/chm-book.png", // ← YOUR LOCAL IMAGE
  summary:
    "Master your mind and defy the odds. Build mental toughness through extreme discipline and relentless self-improvement.",
  subscriptionRequired: false,
};

export default function ForYouPage() {
  const dispatch = useDispatch();

  const { selectedBook, recommendedBooks, suggestedBooks, isLoading, error } =
    useSelector((state) => state.books);

  const effectiveSelected =
    selectedBook && selectedBook.title ? selectedBook : FALLBACK_SELECTED;

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);

  useEffect(() => {
    dispatch(fetchSelectedBook());
    dispatch(fetchRecommendedBooks());
    dispatch(fetchSuggestedBooks());
  }, [dispatch]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (!searchQuery) {
        setSearchResults([]);
        setIsSearching(false);
        setSearchError(null);
        return;
      }

      setIsSearching(true);
      setSearchError(null);

      try {
        const results = await searchBooks(searchQuery);
        if (cancelled) return;
        setSearchResults(results);
      } catch (err) {
        if (cancelled) return;
        setSearchError(err.message || "Search failed");
        setSearchResults([]);
      } finally {
        if (!cancelled) setIsSearching(false);
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [searchQuery]);

  const showSearchSection =
    !!searchQuery && (isSearching || searchResults.length > 0 || searchError);

  if (
    isLoading &&
    !selectedBook &&
    !recommendedBooks.length &&
    !suggestedBooks.length
  ) {
    return (
      <section className="forYou__wrapper">
        <div className="forYou__headerRow">
          <div>
            <h1 className="forYou__heading">For your mom</h1>
            <p className="forYou__subtitle">
              Browse featured and recommended titles
            </p>
          </div>
          <div className="forYou__searchInHeader">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
        <SkeletonLoader />
      </section>
    );
  }

  if (error) {
    return (
      <section className="forYou__wrapper">
        <div className="forYou__headerRow">
          <div>
            <h1 className="forYou__heading phone__header">For you</h1>
          </div>
          <div className="forYou__searchInHeader">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
        <p className="forYou__error">Something went wrong loading books.</p>
      </section>
    );
  }

  return (
    <section className="forYou__wrapper">
      <div className="forYou__headerRow">
        <div>
          <h1 className="forYou__heading phone__header">For you</h1>
          <p className="forYou__subtitle">
            {/* Browse featured and recommended titles */}
          </p>
        </div>
        <div className="forYou__searchInHeader">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {showSearchSection && (
        <div className="forYou__section forYou__section--search">
          <h2 className="forYou__heading">
            {isSearching
              ? "Searching…"
              : searchResults.length
                ? "Search results"
                : "No results"}
          </h2>
          {searchError && <p className="forYou__error">{searchError}</p>}
          {!isSearching && !searchError && searchResults.length > 0 && (
            <div className="forYou__grid">
              {searchResults.map((book) => (
                <Link
                  key={book.id}
                  href={`/book/${book.id}`}
                  className="forYou__card"
                >
                  <img
                    src={book.imageLink}
                    alt={book.title}
                    className="forYou__cardImg"
                  />
                  <div className="forYou__cardBody">
                    <h3 className="forYou__cardTitle">{book.title}</h3>
                    <p className="forYou__cardAuthor">{book.author}</p>
                    {book.subscriptionRequired && (
                      <span className="forYou__pill">Premium</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
          {!isSearching &&
            !searchError &&
            searchResults.length === 0 &&
            searchQuery && (
              <p className="forYou__empty">
                Nothing found for "{searchQuery}".
              </p>
            )}
        </div>
      )}

      {/* HERO - PURE CSS BOOK COVER */}
      {/* <div className="forYou__selected">
        <h2 className="forYou__heading">Selected for you</h2>
        <Link
          href={`/book/${effectiveSelected.id}`}
          className="forYou__selectedCard"
        >
          <div className="forYou__selectedImg--css">
            <div className="book-cover-title">CAN'T HURT ME</div>
            <div className="book-cover-author">David Goggins</div>
          </div>
          <div className="forYou__selectedContent">
            {effectiveSelected.subscriptionRequired && (
              <p className="forYou__selectedTag">Premium</p>
            )}
            <h3 className="forYou__selectedTitle">{effectiveSelected.title}</h3>
            <p className="forYou__selectedAuthor">{effectiveSelected.author}</p>
            <p className="forYou__selectedSummary">
              {effectiveSelected.summary}
            </p>
          </div>
        </Link>
      </div> */}
      {/* selected for you hero */}
      <div className="forYou__selected--wrapper">
        <div className="forYou__selected">
          <h2 className="forYou__heading">Selected Just For You :</h2>
          <Link
            //href={`/book/${effectiveSelected.id}`}
            href={`/book/2l0idxm1rvw`}
            className="forYou__selectedCard"
          >
            <img
              src={effectiveSelected.imageLink}
              alt={`${effectiveSelected.title} by ${effectiveSelected.author}`}
              className="forYou__selectedImg"
            />
            <div className="forYou__selectedContent">
              {effectiveSelected.subscriptionRequired && (
                <p className="forYou__selectedTag">Premium</p>
              )}
              <h3 className="forYou__selectedTitle">
                {effectiveSelected.title}
              </h3>
              <p className="forYou__selectedAuthor">
                {effectiveSelected.author}
              </p>
              <p className="forYou__selectedSummary">
                {effectiveSelected.summary}
              </p>
            </div>
          </Link>
        </div>
      </div>

      <div className="forYou__section">
        <h2 className="forYou__heading">Recommended</h2>
        <div className="forYou__grid">
          {recommendedBooks.map((book) => (
            <Link
              key={book.id}
              href={`/book/${book.id}`}
              className="forYou__card"
            >
              <img
                src={book.imageLink}
                alt={book.title}
                className="forYou__cardImg"
              />
              <div className="forYou__cardBody">
                <h3 className="forYou__cardTitle">{book.title}</h3>
                <p className="forYou__cardAuthor">{book.author}</p>
                {book.subscriptionRequired && (
                  <span className="forYou__pill">Premium</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="forYou__section">
        <h2 className="forYou__heading">Suggested</h2>
        <div className="forYou__grid">
          {suggestedBooks.map((book) => (
            <Link
              key={book.id}
              href={`/book/${book.id}`}
              className="forYou__card"
            >
              <img
                src={book.imageLink}
                alt={book.title}
                className="forYou__cardImg"
              />
              <div className="forYou__cardBody">
                <h3 className="forYou__cardTitle">{book.title}</h3>
                <p className="forYou__cardAuthor">{book.author}</p>
                {book.subscriptionRequired && (
                  <span className="forYou__pill">Premium</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
