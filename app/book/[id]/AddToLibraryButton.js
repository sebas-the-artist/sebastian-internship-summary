'use client';

export default function AddToLibraryButton({ bookId }) {
  const handleClick = () => {
    console.log('Add to library:', bookId);
    // later: integrate with Firebase / Redux to actually save the book
  };

  return (
    <button
      type="button"
      className="book__button book__button--ghost"
      onClick={handleClick}
    >
      Add title to My Library
    </button>
  );
}
