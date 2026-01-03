// app/player/[id]/page.jsx - FULL CODE with author bio included
"use client";

import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchBookById } from "../../store/booksSlice";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import "./player.css";

export default function PlayerPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentBook, isLoading, error } = useSelector((state) => state.books);

  useEffect(() => {
    if (id) {
      dispatch(fetchBookById(id));
    }
  }, [id, dispatch]);

  if (isLoading || !currentBook) {
    return (
      <section className="player__wrapper">
        <p>Loading audio…</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="player__wrapper">
        <p className="player__error">Failed to load audio.</p>
      </section>
    );
  }

  const book = currentBook;
  const shortSummary =
    book.summary && book.summary.length > 450
      ? book.summary.slice(0, 450) + "..."
      : book.summary;

  // COMBINED TEXT: Summary + Author bio
  const fullAudioText = `${shortSummary}\n\nAbout the author: ${
    book.authorDescription || "Author biography coming soon."
  }`;

  return (
    <section className="player__wrapper">
      <header className="player__header">
        {book.subscriptionRequired && (
          <span className="player__badge">Premium</span>
        )}
        <h1 className="player__title">{book.title}</h1>
        <p className="player__author">{book.author}</p>
      </header>

      <div className="player__layout">
        <div className="player__audioColumn">
          <div className="player__card">
            <p className="player__nowPlayingLabel">Now playing</p>
            <p className="player__nowPlayingTitle">{book.title}</p>

            {/* Reads summary + author bio aloud */}
            <AudioPlayer summaryText={fullAudioText} />
          </div>
        </div>

        <div className="player__summaryColumn">
          <h2 className="player__summaryHeading">Summary</h2>
          <p className="player__summaryText">{shortSummary}</p>

          <h2 className="player__summaryHeading">About the author</h2>
          <p className="player__summaryText">
            {book.authorDescription || "Author biography coming soon."}
          </p>
        </div>
      </div>
    </section>
  );
}
