"use client";

import "./SkeletonLoader.css";

export default function SkeletonLoader() {
  return (
    <div className="skeleton__wrapper">
      {/* Selected for you skeleton */}
      <div className="skeleton__selected">
        <div className="skeleton__thumbnail skeleton__pulse" />
        <div className="skeleton__content">
          <div className="skeleton__line skeleton__pulse" />
          <div className="skeleton__line skeleton__pulse" />
          <div className="skeleton__line skeleton__pulse skeleton__line--short" />
        </div>
      </div>

      {/* Recommended skeleton row */}
      <div className="skeleton__section">
        <div className="skeleton__title skeleton__pulse" />
        <div className="skeleton__grid">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="skeleton__card">
              <div className="skeleton__cardImg skeleton__pulse" />
              <div className="skeleton__cardBody">
                <div className="skeleton__line skeleton__pulse" />
                <div className="skeleton__line skeleton__pulse skeleton__line--short" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* "use client";

import "./SkeletonLoader.css";

export default function SkeletonLoader() {
  return (
    <div className="skeleton__wrapper">
      <div className="skeleton__block skeleton__block--lg" />
      <div className="skeleton__grid">
        <div className="skeleton__block" />
        <div className="skeleton__block" />
        <div className="skeleton__block" />
      </div>
    </div>
  );
}
 */
