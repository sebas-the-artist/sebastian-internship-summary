"use client";

import { useEffect, useRef, useState } from "react";

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const whole = Math.floor(seconds);
  const mins = Math.floor(whole / 60);
  const secs = whole % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function AudioPlayer({ audioSrc, title }) {
  const audioRef = useRef(null);
  const [playerIsPlaying, setPlayerIsPlaying] = useState(false);
  const [playerCurrentTime, setPlayerCurrentTime] = useState(0);
  const [playerDuration, setPlayerDuration] = useState(0);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    const handleLoadedMetadata = () => {
      setPlayerDuration(audioElement.duration || 0);
    };

    const handleTimeUpdate = () => {
      setPlayerCurrentTime(audioElement.currentTime || 0);
    };

    const handleEnded = () => {
      setPlayerIsPlaying(false);
    };

    audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);
    audioElement.addEventListener("timeupdate", handleTimeUpdate);
    audioElement.addEventListener("ended", handleEnded);

    return () => {
      audioElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audioElement.removeEventListener("timeupdate", handleTimeUpdate);
      audioElement.removeEventListener("ended", handleEnded);
    };
  }, []);

  const handleTogglePlay = () => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    if (playerIsPlaying) {
      audioElement.pause();
      setPlayerIsPlaying(false);
    } else {
      audioElement
        .play()
        .then(() => setPlayerIsPlaying(true))
        .catch((error) => {
          console.error("Audio play error:", error);
        });
    }
  };

  const handleChangeTime = (event) => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    const nextTime = Number(event.target.value);
    audioElement.currentTime = nextTime;
    setPlayerCurrentTime(nextTime);
  };

  const handleSkip = (deltaSeconds) => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    const nextTime = Math.min(
      Math.max(audioElement.currentTime + deltaSeconds, 0),
      playerDuration || audioElement.duration || 0
    );
    audioElement.currentTime = nextTime;
    setPlayerCurrentTime(nextTime);
  };

  return (
    <div className="player__card">
      <audio ref={audioRef} src={audioSrc} preload="metadata" />

      <p className="player__nowPlayingLabel">Now playing</p>
      <h2 className="player__nowPlayingTitle">{title}</h2>

      <div className="player__controlsRow">
        <button
          type="button"
          className="player__controlButton"
          onClick={() => handleSkip(-10)}
        >
          -10s
        </button>

        <button
          type="button"
          className="player__controlButton player__controlButton--primary"
          onClick={handleTogglePlay}
        >
          {playerIsPlaying ? "Pause" : "Play"}
        </button>

        <button
          type="button"
          className="player__controlButton"
          onClick={() => handleSkip(10)}
        >
          +10s
        </button>
      </div>

      <div className="player__timelineRow">
        <span className="player__time">{formatTime(playerCurrentTime)}</span>

        <input
          type="range"
          min={0}
          max={playerDuration || 0}
          value={playerCurrentTime}
          onChange={handleChangeTime}
          className="player__slider"
        />

        <span className="player__time">{formatTime(playerDuration)}</span>
      </div>
    </div>
  );
}
