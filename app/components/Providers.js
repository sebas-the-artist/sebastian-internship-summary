'use client';

import { Provider } from 'react-redux';
import { store } from '../store/store';
import AuthModal from './AuthModal/AuthModal';

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      {children}
      <AuthModal />
    </Provider>
  );
}

//
//
//
/* 'use client';
import { Provider } from 'react-redux';
import { store } from '../store/store';
// import AuthModal from './AuthModal/AuthModal';  ← Not ready yet
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/authSlice';

export default function Providers({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user));
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}

 */