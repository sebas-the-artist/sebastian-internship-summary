// app/page.jsx
"use client";

import Link from "next/link";
import Image from "next/image";
import "./home.css";

export default function HomePage() {
  return (
    <section className="home__wrapper">
      <div className="home__inner">
        {/* Left column – copy */}
        <div className="home__content">
          <p className="home__eyebrow">Welcome to Summarist</p>
          <h1 className="home__title">
            Turn long <span className="home__titleAccent">books</span> into
            short, powerful ideas.
          </h1>

          <p className="home__subtitle">
            Get concise audio and text summaries of the world&apos;s best
            non‑fiction. Build a daily reading habit without needing hours a day.
          </p>

          <div className="home__actions">
            <Link href="/for-you" className="home__primaryButton">
              Start exploring summaries
            </Link>
            <p className="home__hint">
              You can always change theme and colors later in <Link href="/settings" className="home__titleAccent">Settings</Link>.
            </p>
          </div>

          <div className="home__features">
            <div className="home__feature">
              <span className="home__featureDot" />
              <div>
                <p className="home__featureTitle">Book‑length ideas</p>
                <p className="home__featureText">
                  Summaries of popular titles like <em>Can&apos;t Hurt Me</em> and{" "}
                  <em>Atomic Habits</em>.
                </p>
              </div>
            </div>
            <div className="home__feature">
              <span className="home__featureDot" />
              <div>
                <p className="home__featureTitle">Listen or read</p>
                <p className="home__featureText">
                  Swap between audio and text without losing your place.
                </p>
              </div>
            </div>
            <div className="home__feature">
              <span className="home__featureDot" />
              <div>
                <p className="home__featureTitle">Personalized feed</p>
                <p className="home__featureText">
                  The “For you” page highlights what matches your interests.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column – illustration + mini preview */}
        <div className="home__side">
          <div className="home__illustration">
            {/* <Link href="/for-you" className=""> */}
            <Image
              src="/assets/lady.svg"
              alt="Person listening to book summaries"
              width={420}
              height={420}
              className="home__image"
              priority
              />
              {/* </Link> */}
          </div>

          <div className="home__previewCard">
            <p className="home__previewLabel">Sneak peek</p>
            <div className="home__previewRow">
              <div className="home__previewCover" />
              <div className="home__previewInfo">
                <p className="home__previewTitle">Can&apos;t Hurt Me</p>
                <p className="home__previewAuthor">David Goggins</p>
                <p className="home__previewTag">15‑minute summary</p>
              </div>
            </div>
            <Link href="/for-you" className="home__previewButton">
              Open “For you” page
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
