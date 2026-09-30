"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Parallax editorial — só transform/opacity, tudo com scrub suavizado.
 * Hero: vídeo afunda e dá zoom leve enquanto o texto sobe e dissolve.
 * NOTA: o parallax das fotos [data-parallax] é dono exclusivo do
 * ParallaxFrame (trigger por frame). Não duplicar aqui — dois
 * ScrollTriggers no mesmo alvo causavam travada na 1ª chegada.
 * Propósito: profundidade/hierarquia no scroll. Respeita reduced-motion.
 */
export function ScrollEffects() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const hero = document.getElementById("topo");
      const video = hero?.querySelector("video");
      const content = hero?.querySelector("[data-hero-content]");
      if (hero && video) {
        gsap.fromTo(
          video,
          { yPercent: -8, scale: 1.12 },
          {
            yPercent: 8,
            scale: 1.2,
            ease: "none",
            scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 1 },
          }
        );
      }
      if (hero && content) {
        gsap.to(content, {
          yPercent: -14,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 1 },
        });
      }
      // [data-parallax] removido daqui — dono exclusivo: ParallaxFrame.
    });
    return () => ctx.revert();
  }, []);
  return null;
}