import "./player.css";
import AudioPlayer from "./AudioPlayer";

async function fetchBookById(id) {
  const res = await fetch(
    `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch book");
  }

  const data = await res.json();
  return data;
}

export default async function PlayerPage({ params }) {
  const { id } = await params;

  let book;

  try {
    book = await fetchBookById(id);
  } catch (error) {
    return (
      <section className="player__wrapper">
        <p className="player__error">
          Could not load this book. Please try again later.
        </p>
      </section>
    );
  }

  return (
    <section className="player__wrapper">
      <header className="player__header">
        <p className="player__badge">
          {book.subscriptionRequired ? "Premium" : "Free"}
        </p>
        <h1 className="player__title">{book.title}</h1>
        <p className="player__author">by {book.author}</p>
      </header>

      <div className="player__layout">
        <div className="player__audioColumn">
          <AudioPlayer audioSrc={book.audioLink} title={book.title} />
        </div>

        <div className="player__summaryColumn">
          <h2 className="player__summaryHeading">Summary</h2>
          <p className="player__summaryText">{book.summary}</p>
        </div>
      </div>
    </section>
  );
}
