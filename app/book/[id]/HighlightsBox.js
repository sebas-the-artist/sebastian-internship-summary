'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addHighlight,
  removeHighlight,
  setHighlightsForBook,
} from '../../store/highlightsSlice';
import { db } from '../../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function HighlightsBox({ bookId }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const allByBook = useSelector((state) => state.highlights.byBookId);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const highlights = useMemo(
    () => allByBook[bookId] || [],
    [allByBook, bookId]
  );

  // Load highlights for this book/user once
  useEffect(() => {
    if (!user) return;
    if (highlights.length) return;

    let cancelled = false;

    (async () => {
      setLoading(true);
      try {
        const ref = doc(db, 'highlights', `${user.uid}_${bookId}`);
        const snap = await getDoc(ref);
        if (!cancelled) {
          const data = snap.exists() ? snap.data() : {};
          dispatch(
            setHighlightsForBook({
              bookId,
              highlights: data.items || [],
            })
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user, bookId, highlights.length, dispatch]);

  const handleAdd = async () => {
    if (!user || !text.trim()) return;

    const newHighlight = {
      id: crypto.randomUUID(),
      text: text.trim(),
      createdAt: Date.now(),
    };

    const nextItems = [...highlights, newHighlight];

    dispatch(addHighlight({ bookId, highlight: newHighlight }));
    setText('');

    const ref = doc(db, 'highlights', `${user.uid}_${bookId}`);
    await setDoc(
      ref,
      {
        userId: user.uid,
        bookId,
        items: nextItems,
      },
      { merge: true }
    );
  };

  const handleRemove = async (highlightId) => {
    if (!user) return;

    const nextItems = highlights.filter((h) => h.id !== highlightId);

    dispatch(removeHighlight({ bookId, highlightId }));

    const ref = doc(db, 'highlights', `${user.uid}_${bookId}`);
    await setDoc(
      ref,
      {
        userId: user.uid,
        bookId,
        items: nextItems,
      },
      { merge: true }
    );
  };

  if (!user) {
    return null;
  }

  return (
    <section className="highlights">
      <h2 className="highlights__title">Highlights</h2>

      <div className="highlights__inputRow">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="highlights__textarea"
          placeholder="Write a highlight or key idea…"
          rows={2}
        />
        <button
          type="button"
          className="highlights__addButton"
          onClick={handleAdd}
          disabled={!text.trim() || loading}
        >
          Add highlight
        </button>
      </div>

      {loading && !highlights.length && (
        <p className="highlights__text">Loading your highlights…</p>
      )}

      {highlights.length > 0 && (
        <ul className="highlights__list">
          {highlights.map((h) => (
            <li key={h.id} className="highlights__item">
              <p className="highlights__itemText">{h.text}</p>
              <button
                type="button"
                className="highlights__remove"
                onClick={() => handleRemove(h.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
