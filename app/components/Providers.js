'use client';

import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

import { Provider, useDispatch } from 'react-redux';
import { store } from '../store/store';

import { setUser } from '../store/authSlice';
import { setLibrary } from '../store/librarySlice';
import AuthModal from './AuthModal/AuthModal';

function AuthListener({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const safeUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        };
        dispatch(setUser(safeUser));

        try {
          const libraryRef = doc(db, 'libraries', user.uid);
          const snap = await getDoc(libraryRef);
          const data = snap.exists() ? snap.data() : {};
          dispatch(setLibrary(data.books || []));
        } catch (err) {
          console.error('Failed to load library', err);
          dispatch(setLibrary([]));
        }
      } else {
        dispatch(setUser(null));
        dispatch(setLibrary([]));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return children;
}

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <AuthListener>
        {children}
        <AuthModal />
      </AuthListener>
    </Provider>
  );
}
