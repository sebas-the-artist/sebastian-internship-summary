/* // components/AudioPlayer/AudioPlayer.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import "./AudioPlayer.css";

export default function AudioPlayer({ textContent, summaryText }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSupported, setIsSupported] = useState(false);
  const synthRef = useRef(null);
  const utteranceRef = useRef(null);

  // Check if speech synthesis is supported
  useEffect(() => {
    synthRef.current = window.speechSynthesis;
    setIsSupported("speechSynthesis" in window && synthRef.current);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (utteranceRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  // Get text to speak (summary first, then author bio)
  const getTextToSpeak = () => {
    if (summaryText) {
      return summaryText.length > 450
        ? summaryText.slice(0, 450) + "..."
        : summaryText;
    }
    if (textContent) return textContent;
    return "No text available to read.";
  };

  const handleToggle = async () => {
    if (!isSupported) {
      alert("Speech synthesis not supported in this browser");
      return;
    }

    const text = getTextToSpeak();
    const synth = synthRef.current;

    if (isPlaying) {
      synth.cancel();
      setIsPlaying(false);
      setCurrent(0);
      setDuration(0);
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      utteranceRef.current = utterance;

      // Voice settings
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;

      // Events
      utterance.onstart = () => {
        setIsPlaying(true);
        setCurrent(0);
      };

      utterance.onend = () => {
        setIsPlaying(false);
        setCurrent(0);
        utteranceRef.current = null;
      };

      utterance.onpause = () => setIsPlaying(false);
      utterance.onresume = () => setIsPlaying(true);

      // Estimate duration (rough: 150 words per minute)
      const wordCount = text.split(/\s+/).length;
      setDuration(Math.ceil(wordCount / 2.5)); // ~150wpm / 60 = 2.5 words/sec

      // Track progress (every 250ms)
      let elapsed = 0;
      const progressInterval = setInterval(() => {
        if (isPlaying) {
          elapsed += 0.25;
          setCurrent(Math.min(elapsed, duration));
        }
      }, 250);

      utterance.onend = () => {
        clearInterval(progressInterval);
        setIsPlaying(false);
        setCurrent(0);
        utteranceRef.current = null;
      };

      synth.speak(utterance);
    }
  };

  const handleSeek = (e) => {
    if (!isPlaying || !isSupported) return;

    const value = Number(e.target.value);
    setCurrent(value);

    // Pause and resume at estimated position
    synthRef.current.pause();
    setTimeout(() => {
      synthRef.current.resume();
    }, 100);
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  if (!isSupported) {
    return (
      <div className="audio__container">
        <p className="audio__noAudio">Speech not supported (use Chrome/Edge)</p>
      </div>
    );
  }

  const text = getTextToSpeak();

  return (
    <div className="audio__container">
      <button
        type="button"
        className="audio__playButton"
        onClick={handleToggle}
      >
        {isPlaying ? "⏸️ Pause" : "🎤 Read summary"}
      </button>

      <div className="audio__trackRow">
        <span className="audio__time">{formatTime(current)}</span>
        <input
          type="range"
          className="audio__slider"
          min={0}
          max={duration || 0}
          value={current}
          onChange={handleSeek}
          disabled={!duration}
        />
        <span className="audio__time">{formatTime(duration)}</span>
      </div>

      <p className="audio__status">
        {isPlaying ? "Reading..." : "Ready to read summary aloud"}
      </p>
    </div>
  );
}
 */

// components/AudioPlayer/AudioPlayer.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import "./AudioPlayer.css";

export default function AudioPlayer({ textContent, summaryText }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSupported, setIsSupported] = useState(false);

  const synthRef = useRef(null);
  const utteranceRef = useRef(null);
  const progressIntervalRef = useRef(null);

  // Check browser support for Web Speech API
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis;
      setIsSupported(true);
    } else {
      setIsSupported(false);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  // Text to read: prefer summary, fall back to full text
  const getTextToSpeak = () => {
    if (summaryText) {
      return summaryText;
    }
    if (textContent) {
      return textContent;
    }
    return "No text available to read.";
  };

  const handleToggle = () => {
    if (!isSupported || !synthRef.current) {
      alert("Speech synthesis is not supported in this browser.");
      return;
    }

    const synth = synthRef.current;

    // If currently playing, stop
    if (isPlaying) {
      synth.cancel();
      setIsPlaying(false);
      setCurrent(0);
      setDuration(0);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      return;
    }

    // Start reading
    const text = getTextToSpeak();
    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    // Voice settings
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.volume = 1;

    // Rough duration estimate: ~150 words per minute ≈ 2.5 words/sec
    const wordCount = text.split(/\s+/).filter(Boolean).length;
    const estimatedDuration = Math.max(1, Math.round(wordCount / 2.5)); // in seconds
    setDuration(estimatedDuration);
    setCurrent(0);

    // Events
    utterance.onstart = () => {
      setIsPlaying(true);

      // Progress timer
      let elapsed = 0;
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      progressIntervalRef.current = setInterval(() => {
        elapsed += 0.25;
        setCurrent((prev) => {
          const next = prev + 0.25;
          return next > estimatedDuration ? estimatedDuration : next;
        });
      }, 250);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setCurrent(0);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      utteranceRef.current = null;
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };

    synth.speak(utterance);
  };

  const handleSeek = (e) => {
    // With Web Speech, there is no native seeking; this just moves the fake progress
    const value = Number(e.target.value);
    setCurrent(value);
  };

  const formatTime = (sec) => {
    if (!sec || sec === Infinity) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  if (!isSupported) {
    return (
      <div className="audio__container">
        <p className="audio__noAudio">
          Speech not supported. Try Chrome or Edge.
        </p>
      </div>
    );
  }

  return (
    <div className="audio__container">
      <button
        type="button"
        className="audio__playButton"
        onClick={handleToggle}
      >
        {isPlaying ? "⏸️ Pause reading" : "🎤 Read summary"}
      </button>

      <div className="audio__trackRow">
        <span className="audio__time">{formatTime(current)}</span>
        <input
          type="range"
          className="audio__slider"
          min={0}
          max={duration || 0}
          value={current}
          onChange={handleSeek}
          disabled={!duration}
        />
        <span className="audio__time">{formatTime(duration)}</span>
      </div>

      <p className="audio__status">
        {isPlaying
          ? //? "Reading the summary aloud..."
            "I Guess You Can't Read :|"
          : "If You Can't Read, Click This"}
      </p>
    </div>
  );
}
