"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

/**
 * Hero Video — usa o vídeo real do cliente (hero.mp4).
 * Controles: pausa/play, poster estático sob reduced-motion.
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced) ref.current?.pause();
  }, [reduced]);

  // Poster: primeiro frame do vídeo como fallback estático
  const POSTER = "/hero-poster.jpg";

  if (reduced) {
    return (
      <img
        src={POSTER}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
    );
  }

  return (
    <>
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        src="/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
        poster={POSTER}
      />
      <button
        type="button"
        onClick={() => {
          const v = ref.current;
          if (!v) return;
          if (v.paused) {
            v.play();
            setPaused(false);
          } else {
            v.pause();
            setPaused(true);
          }
        }}
        aria-label={paused ? "Reproduzir vídeo de fundo" : "Pausar vídeo de fundo"}
        aria-pressed={paused}
        className="absolute bottom-5 right-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-ink/60 text-white backdrop-blur transition-colors duration-200 hover:border-white/60 md:right-8"
      >
        {paused ? (
          <Play size={16} strokeWidth={2} aria-hidden />
        ) : (
          <Pause size={16} strokeWidth={2} aria-hidden />
        )}
      </button>
    </>
  );
}