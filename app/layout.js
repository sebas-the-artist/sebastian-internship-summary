/* // app/layout.js
"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./components/Providers";
import Sidebar from "./components/Sidebar/Sidebar";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://kit.fontawesome.com/d7b20240a7.js"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <div className="app_shell">
            <Sidebar />
            <button 
              className="mobile-menu-toggle"
              onClick={() => document.body.classList.toggle('mobile-menu-open')}
              >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/>
              </svg>
              </button>
            <main className="app_main">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
 */
// app/layout.js - CORRECT ORDER
"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./components/Providers";
import Sidebar from "./components/Sidebar/Sidebar";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://kit.fontawesome.com/d7b20240a7.js"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <div className="app_shell">
            {/* MOBILE BUTTON FIRST (higher z-index) */}
            <button 
              className="mobile-menu-toggle"
              onClick={() => document.body.classList.toggle('mobile-menu-open')}
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/>
              </svg>
            </button>
            
            {/* SIDEBAR SECOND */}
            <Sidebar />
            
            {/* MAIN CONTENT */}
            <main className="app_main">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
