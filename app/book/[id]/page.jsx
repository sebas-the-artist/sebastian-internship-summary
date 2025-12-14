import "./book.css";
import AddToLibraryButton from "./AddToLibraryButton";

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

export default async function BookPage({ params }) {
  // Next 15+: params is a Promise
  const { id } = await params;

  let book;

  try {
    book = await fetchBookById(id);
  } catch (error) {
    return (
      <section className="book__wrapper">
        <p className="book__error">
          Could not load this book. Please try again later.
        </p>
      </section>
    );
  }

  const playerHref = `/player/${book.id}`;

  return (
    <section className="book__wrapper">
      <div className="book__layout">
        <div className="book__coverColumn">
          <img src={book.imageLink} alt={book.title} className="book__img" />
          {book.subscriptionRequired && (
            <span className="book__pill">Premium</span>
          )}
        </div>

        <div className="book__contentColumn">
          <h1 className="book__title">{book.title}</h1>
          <p className="book__author">by {book.author}</p>
          <p className="book__subtitle">{book.subTitle}</p>

          <div className="book__metaRow">
            <span className="book__metaItem">
              Rating: {book.averageRating?.toFixed?.(1) ?? "N/A"}
            </span>
            <span className="book__metaItem">
              Type: {book.type || "Audio & text"}
            </span>
          </div>

          <p className="book__description">{book.bookDescription}</p>

          <div className="book__buttonsRow">
            <a href={playerHref} className="book__button book__button--primary">
              Read
            </a>
            <a
              href={playerHref}
              className="book__button book__button--secondary"
            >
              Listen
            </a>

            {/* Client component handles the click */}
            <AddToLibraryButton bookId={book.id} />
          </div>

          <div className="book__tagsRow">
            {Array.isArray(book.tags) &&
              book.tags.map((tag) => (
                <span key={tag} className="book__tag">
                  {tag}
                </span>
              ))}
          </div>

          <div className="book__authorSection">
            <h2 className="book__heading">About the author</h2>
            <p className="book__authorDescription">{book.authorDescription}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
