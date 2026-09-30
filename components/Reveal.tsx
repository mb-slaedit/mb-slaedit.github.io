"use client";

import { useEffect } from "react";

/**
 * Liga .rv -> .rv-on uma vez via IntersectionObserver (transform/opacity apenas).
 * Respeita prefers-reduced-motion: mostra tudo instantaneamente.
 */
export function Reveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(".rv").forEach((el) => el.classList.add("rv-on"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("rv-on");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    const els = Array.from(document.querySelectorAll(".rv"));
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}