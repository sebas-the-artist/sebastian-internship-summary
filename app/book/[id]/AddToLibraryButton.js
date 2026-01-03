'use client';
//app/book/[id]/AddToLibraryButton.js

import "./AddToLibraryButton.css";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import {
  addBookToLibrary,
  removeBookFromLibrary,
} from '../../store/librarySlice';
import { toggleAuthModal } from '../../store/authSlice';
import { db } from '../../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function AddToLibraryButton({ book }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const savedBooks = useSelector((state) => state.library.savedBooks);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const isSaved = savedBooks.some((b) => b.id === book.id);

  // clear the inline message after a moment
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => setMessage(''), 2000);
    return () => clearTimeout(t);
  }, [message]);

  const syncToFirestore = async (books) => {
    if (!user) return;
    const libraryRef = doc(db, 'libraries', user.uid);
    await setDoc(libraryRef, { books }, { merge: true });
  };

  const handleClick = async () => {
    if (!user) {
      dispatch(toggleAuthModal());
      return;
    }
    if (saving) return;

    setSaving(true);

    try {
      if (isSaved) {
        // remove
        const nextBooks = savedBooks.filter((b) => b.id !== book.id);
        dispatch(removeBookFromLibrary(book.id));
        await syncToFirestore(nextBooks);
        //setMessage('Removed from your library');
      } else {
        // add
        const nextBooks = [...savedBooks, book];
        dispatch(addBookToLibrary(book));
        await syncToFirestore(nextBooks);
        //setMessage('Added to your library (click again to remove)');
      }
    } catch (err) {
      console.error('Failed to update library', err);
      setMessage('Something went wrong. Try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="book__libraryWrapper">
  <button
    type="button"
    className="book__button book__button--ghost"
    onClick={handleClick}
    disabled={saving}
  >
    {isSaved
      ? saving
      ? 'Adding…'
      : 'In My Library'
      : saving
      ? 'Removing…'
      : 'Add title to My Library'}
  </button>

  <p className="book__libraryMessage">
    {message}
  </p>
</div>
  );
}

