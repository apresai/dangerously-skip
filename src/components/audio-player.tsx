"use client";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";

type AudioPlayerProps = {
  src: string;
  title: string;
};

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function AudioPlayer({ src, title }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoadedMetadata = () => {
      setDuration(audio.duration);
      setLoading(false);
    };
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onEnded = () => setPlaying(false);
    const onCanPlay = () => {
      setLoading(false);
      audio.removeEventListener("canplay", onCanPlay);
    };

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("canplay", onCanPlay);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("canplay", onCanPlay);
    };
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play();
      setPlaying(true);
    } else {
      audio.pause();
      setPlaying(false);
    }
  }, []);

  const seek = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const audio = audioRef.current;
      if (!audio || !duration) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      audio.currentTime = ratio * duration;
    },
    [duration]
  );

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const durationStr = useMemo(() => formatTime(duration), [duration]);

  return (
    <div className="bg-gray-900 rounded-lg p-6 my-6">
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Title */}
      <div className="font-mono text-sm text-gray-300 mb-4 leading-relaxed">
        {title}
      </div>

      {/* Controls row */}
      <div className="flex items-center gap-4">
        {/* Play/Pause */}
        <button
          onClick={togglePlay}
          disabled={loading}
          className="shrink-0 w-10 h-10 flex items-center justify-center rounded-md border bg-terminal-green/10 text-terminal-green border-terminal-green/30 font-mono text-sm transition-colors hover:bg-terminal-green/20 disabled:opacity-40 disabled:cursor-wait"
          aria-label={playing ? "Pause" : "Play"}
        >
          {loading ? (
            <span className="block w-4 h-4 border-2 border-terminal-green/40 border-t-terminal-green rounded-full animate-spin" />
          ) : playing ? (
            /* Pause icon */
            <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor">
              <rect x="1" y="0" width="4" height="16" rx="1" />
              <rect x="9" y="0" width="4" height="16" rx="1" />
            </svg>
          ) : (
            /* Play icon */
            <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor">
              <path d="M1 1.5v13l12-6.5z" />
            </svg>
          )}
        </button>

        {/* Progress + time */}
        <div className="flex-1 min-w-0">
          {/* Progress bar */}
          <div
            className="group relative h-2 bg-gray-700 rounded-full cursor-pointer"
            onClick={seek}
            role="slider"
            aria-valuenow={Math.round(currentTime)}
            aria-valuemin={0}
            aria-valuemax={Math.round(duration)}
            aria-label="Seek"
            tabIndex={0}
          >
            <div
              className="absolute inset-y-0 left-0 bg-terminal-green rounded-full transition-[width] duration-100"
              style={{ width: `${progress}%` }}
            />
            {/* Playhead dot */}
            {progress > 0 && (
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-terminal-green rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                style={{ left: `calc(${progress}% - 6px)` }}
              />
            )}
          </div>

          {/* Time */}
          <div className="flex justify-between mt-1.5">
            <span className="font-mono text-xs text-terminal-dim">
              {formatTime(currentTime)}
            </span>
            <span className="font-mono text-xs text-terminal-dim">
              {durationStr}
            </span>
          </div>
        </div>
      </div>

      {/* Playing indicator */}
      {playing && (
        <div className="flex items-center gap-1 mt-3">
          <span className="block w-1 h-3 bg-terminal-green/60 rounded-full animate-pulse" />
          <span className="block w-1 h-4 bg-terminal-green/80 rounded-full animate-pulse [animation-delay:150ms]" />
          <span className="block w-1 h-2 bg-terminal-green/50 rounded-full animate-pulse [animation-delay:300ms]" />
          <span className="block w-1 h-3.5 bg-terminal-green/70 rounded-full animate-pulse [animation-delay:100ms]" />
          <span className="font-mono text-xs text-terminal-green/60 ml-2">playing</span>
        </div>
      )}
    </div>
  );
}
