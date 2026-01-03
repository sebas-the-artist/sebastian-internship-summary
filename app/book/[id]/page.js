// app/book/[id]/page.jsx
"use client";

import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Link from "next/link";
import { fetchBookById } from "../../store/booksSlice";

import HighlightsBox from "./HighlightsBox";
import AddToLibraryButton from "./AddToLibraryButton";
import "./book.css";

export default function BookPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { currentBook, isLoading, error } = useSelector(
    (state) => state.books
  );
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (id) {
      dispatch(fetchBookById(id));
    }
  }, [id, dispatch]);

  if (isLoading || !currentBook) {
    return (
      <section className="book__wrapper">
        <p>Loading book…</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="book__wrapper">
        <p className="book__error">Failed to load book.</p>
      </section>
    );
  }

  const book = currentBook;
  console.log("Player book:", book)

  const shortSummary =
    book.summary && book.summary.length > 450
      ? book.summary.slice(0, 450) + "..."
      : book.summary;

  return (
    <section className="book__wrapper">
      <div className="book__layout">
        <div className="book__coverColumn">
          <img
            src={book.imageLink}
            alt={book.title}
            className="book__img"
          />
          {book.subscriptionRequired && (
            <span className="book__pill">Premium</span>
          )}

          <div className="book__libraryWrapper">
            <AddToLibraryButton book={book} />
            <p className="book__libraryMessage">
              Add or remove this book from your library.
            </p>
          </div>
        </div>

        <div className="book__contentColumn">
          <h1 className="book__title">{book.title}</h1>
          <p className="book__author">{book.author}</p>

          <div className="book__metaRow">
            <span className="book__metaItem">
              {book.subTitle || "Book summary"}
            </span>
          </div>

          <p className="book__description">{shortSummary}</p>

          <div className="book__buttonsRow">
            <Link
              href={`/player/${book.id}`}
              className="book__button book__button--primary"
            >
              Listen
            </Link>
            <a
              href="#summary"
              className="book__button book__button--secondary"
            >
              Read
            </a>
          </div>

          <div className="book__authorSection">
            <h2 className="book__heading">About the author</h2>
            <p className="book__authorDescription">
              {book.authorDescription || "Author biography coming soon."}
            </p>
          </div>

          <HighlightsBox bookId={book.id} user={user} />
        </div>
      </div>
    </section>
  );
}
