/* 'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAuthModal, logout } from '../../store/authSlice';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import './Sidebar.css';

export default function Sidebar() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const isHomeOrSales =
    pathname === '/' || pathname === '/choose-plan';

  if (isHomeOrSales) return null;

  const handleAuthClick = async () => {
    if (user) {
      // User is logged in → log out
      await signOut(auth);
      dispatch(logout());
    } else {
      // User is logged out → open auth modal
      dispatch(toggleAuthModal());
    }
  };

  return (
    <aside className="sidebar__container">
      <nav className="sidebar__nav">
        <Link
          href="/for-you"
          className={`sidebar__link ${
            pathname === '/for-you' ? 'sidebar__link--active' : ''
          }`}
        >
          For you
        </Link>

        <Link href="/library" className="sidebar__link">
          Library
        </Link>

        <button
          type="button"
          className="sidebar__link sidebar__link--disabled"
        >
          Highlights
        </button>

        <button
          type="button"
          className="sidebar__link sidebar__link--disabled"
        >
          Search
        </button>

        <Link href="/settings" className="sidebar__link">
          Settings
        </Link>

        <button
          type="button"
          className="sidebar__link sidebar__link--disabled"
        >
          Help &amp; Support
        </button>

        <button
          type="button"
          className="sidebar__link"
          onClick={handleAuthClick}
        >
          {user ? 'Logout' : 'Login'}
        </button>
      </nav>
    </aside>
  );
}
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAuthModal, logout } from '../../store/authSlice';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import './Sidebar.css';

export default function Sidebar() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const isHomeOrSales =
    pathname === '/' || pathname === '/choose-plan';

  if (isHomeOrSales) return null;

  const handleAuthClick = async () => {
    if (user) {
      await signOut(auth);
      dispatch(logout());
    } else {
      dispatch(toggleAuthModal());
    }
  };

  return (
    <aside className="sidebar__container">
      <nav className="sidebar__nav">
        <Link
          href="/for-you"
          className={`sidebar__link ${
            pathname === '/for-you' ? 'sidebar__link--active' : ''
          }`}
        >
          For you
        </Link>

        <Link href="/library" className="sidebar__link">
          Library
        </Link>

        <button
          type="button"
          className="sidebar__link sidebar__link--disabled"
        >
          Highlights
        </button>

        <button
          type="button"
          className="sidebar__link sidebar__link--disabled"
        >
          Search
        </button>

        <Link href="/settings" className="sidebar__link">
          Settings
        </Link>

        <button
          type="button"
          className="sidebar__link sidebar__link--disabled"
        >
          Help &amp; Support
        </button>

        <button
          type="button"
          className="sidebar__link"
          onClick={handleAuthClick}
        >
          {user ? 'Logout' : 'Login'}
        </button>
      </nav>
    </aside>
  );
}
