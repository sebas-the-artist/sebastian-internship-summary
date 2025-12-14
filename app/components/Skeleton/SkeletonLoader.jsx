"use client";

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
