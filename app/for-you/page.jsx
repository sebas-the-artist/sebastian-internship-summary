"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSelectedBook,
  fetchRecommendedBooks,
  fetchSuggestedBooks,
} from "../store/booksSlice";
import Link from "next/link";
import SkeletonLoader from "../components/Skeleton/SkeletonLoader";
import "./forYou.css";

export default function ForYouPage() {
  const dispatch = useDispatch();
  const { selectedBook, recommendedBooks, suggestedBooks, isLoading, error } =
    useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchSelectedBook());
    dispatch(fetchRecommendedBooks());
    dispatch(fetchSuggestedBooks());
  }, [dispatch]);

  if (isLoading && !selectedBook) {
    return (
      <section className="forYou__wrapper">
        <SkeletonLoader />
      </section>
    );
  }

  if (error) {
    return (
      <section className="forYou__wrapper">
        <p className="forYou__error">Something went wrong loading books.</p>
      </section>
    );
  }

  return (
    <section className="forYou__wrapper">
      {/* Selected Book */}
      {selectedBook && (
        <div className="forYou__selected">
          <h1 className="forYou__heading">Selected for you</h1>
          <Link
            href={`/book/${selectedBook.id}`}
            className="forYou__selectedCard"
          >
            <img
              src={selectedBook.imageLink}
              alt={selectedBook.title}
              className="forYou__selectedImg"
            />
            <div className="forYou__selectedContent">
              <p className="forYou__selectedTag">
                {selectedBook.subscriptionRequired ? "Premium" : "Free"}
              </p>
              <h2 className="forYou__selectedTitle">{selectedBook.title}</h2>
              <p className="forYou__selectedAuthor">{selectedBook.author}</p>
              <p className="forYou__selectedSummary">{selectedBook.summary}</p>
            </div>
          </Link>
        </div>
      )}

      {/* Recommended */}
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

      {/* Suggested */}
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
