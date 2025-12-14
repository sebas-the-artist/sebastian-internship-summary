'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { toggleAuthModal } from '../../store/authSlice';
import './Sidebar.css';

export default function Sidebar() {
  const pathname = usePathname();
  const dispatch = useDispatch();

  const isHomeOrSales =
    pathname === '/' || pathname === '/choose-plan';

  if (isHomeOrSales) return null;

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
          onClick={() => dispatch(toggleAuthModal())}
        >
          Login / Logout
        </button>
      </nav>
    </aside>
  );
}
