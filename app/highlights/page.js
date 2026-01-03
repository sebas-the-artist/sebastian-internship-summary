// app/highlights/page.jsx
"use client";

import "../for-you/forYou.css";

export default function HighlightsPage() {
  return (
    <section className="forYou__wrapper">
      <h1 className="forYou__heading">Highlights</h1>
      <p className="forYou__para">
        Highlights are saved per book. Open any book to view and manage your key ideas.
      </p>
    </section>
  );
}
