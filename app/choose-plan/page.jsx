// app/choose-plan/page.jsx
"use client";

import Link from "next/link";
import "./choosePlan.css";

export default function ChoosePlanPage() {
  return (
    <section className="choose__wrapper">
      <header className="choose__header">
        <h1 className="choose__title">Choose your plan</h1>
        <p className="choose__subtitle">
          Upgrade to unlock premium summaries and audio content.
        </p>
      </header>

      <div className="choose__grid">
        <div className="choose__card">
          <h2 className="choose__planName">Monthly</h2>
          <p className="choose__price">$9.99 / month</p>
          <ul className="choose__list">
            <li>Unlimited summaries</li>
            <li>Text + audio access</li>
            <li>Cancel anytime</li>
          </ul>
          <button className="choose__button">Start monthly</button>
        </div>

        <div className="choose__card choose__card--highlight">
          <div className="choose__badge">7‑day free trial</div>
          <h2 className="choose__planName">Yearly</h2>
          <p className="choose__price">$79.99 / year</p>
          <ul className="choose__list">
            <li>Everything in Monthly</li>
            <li>Save over 30%</li>
            <li>7‑day free trial, then billed yearly</li>
          </ul>
          <button className="choose__button choose__button--primary">
            Start yearly
          </button>
        </div>
      </div>

      <p className="choose__footnote">
        You can manage or cancel your subscription anytime in Settings.
      </p>

      <Link href="/for-you" className="choose__linkBack">
        Continue without subscribing
      </Link>
    </section>
  );
}
