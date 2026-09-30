"use client";

import { useCallback, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const PHOTOS = [
  { src: "/fachada-1.jpg", alt: "Fachada da loja RW Apple no Centro de Angra dos Reis", label: "Fachada" },
  { src: "/fachada-2.jpg", alt: "Vitrines com iPhones e Apple Watch dentro da loja", label: "Vitrines" },
  { src: "/fachada-3.jpg", alt: "Parede Apple Watch e armários com produtos na loja", label: "Mostruário" },
  { src: "/fachada-4.jpg", alt: "Logo RW na parede e lounge de atendimento da loja", label: "Recepção" },
  { src: "/fachada-5.jpg", alt: "Ryan no escritório da loja com iMac e MacBook", label: "Escritório" },
] as const;

/**
 * Galeria da loja — 5 fotos reais no mesmo lugar, crossfade + zoom sutil.
 * Setas, dots, contador, teclado, swipe. Propósito: explorar o espaço (feedback direto).
 */
export function StoreGallery() {
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const total = PHOTOS.length;

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + total) % total),
    [total]
  );

  return (
    <div
      className="rv relative overflow-hidden rounded-[20px] border border-white/10"
      role="region"
      aria-roledescription="carrossel"
      aria-label="Fotos da loja RW Apple"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (dx < -40) go(1);
        if (dx > 40) go(-1);
        touchX.current = null;
      }}
    >
      <div className="relative aspect-[4/3] w-full">
        {PHOTOS.map((p, i) => (
          <img
            key={p.src}
            src={p.src}
            alt={p.alt}
            loading={i === 0 ? "eager" : "lazy"}
            aria-hidden={i === index ? undefined : true}
            className={`gal-photo absolute inset-0 h-full w-full object-cover ${
              i === index ? "gal-on" : ""
            }`}
          />
        ))}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
      </div>

      <p aria-live="polite" className="absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
        {PHOTOS[index].label} · {index + 1}/{total}
      </p>

      <div className="absolute bottom-4 left-4 flex gap-2">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Foto anterior da loja"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-ink/60 text-white backdrop-blur transition-colors duration-200 hover:border-white/60 hover:bg-ink/80 active:scale-[0.96]"
        >
          <ArrowLeft size={17} strokeWidth={2} aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Próxima foto da loja"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-ink/60 text-white backdrop-blur transition-colors duration-200 hover:border-white/60 hover:bg-ink/80 active:scale-[0.96]"
        >
          <ArrowRight size={17} strokeWidth={2} aria-hidden />
        </button>
      </div>

      <div className="absolute bottom-6 right-4 flex gap-1.5" aria-hidden>
        {PHOTOS.map((p, i) => (
          <span
            key={p.src}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "w-5 bg-white" : "w-1.5 bg-white/35"
            }`}
          />
        ))}
      </div>
    </div>
  );
}