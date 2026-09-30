"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxImageProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Wrapper que aplica parallax suave à imagem interna via GSAP.
 * Só roda se não houver reduced-motion.
 */
export function ParallaxFrame({ children, className }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !ref.current) return;
    const ctx = gsap.context(() => {
      const img = ref.current?.querySelector<HTMLElement>("[data-parallax]");
      if (!img) return;
      gsap.set(img, { scale: 1.15 });
      gsap.fromTo(
        img,
        { yPercent: -5 },
        {
          yPercent: 5,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, [reduce]);

  return <div ref={ref} className={className}>{children}</div>;
}