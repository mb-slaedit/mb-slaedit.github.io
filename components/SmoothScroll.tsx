"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

/**
 * Desliza até um seletor com a mesma suavidade do scroll manual (3s).
 */
export function scrollToTarget(selector: string) {
  const el = document.querySelector(selector);
  if (!el) return;
  if (!lenis || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.scrollIntoView();
    return;
  }
  lenis.scrollTo(el as HTMLElement, {
    offset: 0,
    duration: 3,
    easing: (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  });
}

/**
 * Scroll suave (Lenis) sincronizado com GSAP + cliques em âncoras
 * roteados pela mesma animação — nenhum pulo seco.
 * Re-âncora hashes vindos de navegação cross-page (/catalogo -> /#historia).
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /**
     * Página aberta com hash (ex.: vindo de /catalogo): o navegador salta cedo
     * demais (antes das fontes) e o Lenis anula o salto nativo ao assumir o
     * controle — refaz o destino depois das fontes, com o mesmo voo lento de 3s.
     */
    const reanchor = () => {
      const h = window.location.hash;
      if (!h) return;
      let el: Element | null = null;
      try {
        el = document.querySelector(h);
      } catch {
        return;
      }
      if (!el) return;
      if (reduced || !lenis) el.scrollIntoView();
      else scrollToTarget(h);
    };
    if (window.location.hash && document.fonts) {
      document.fonts.ready.then(reanchor).catch(() => {});
    }

    if (reduced) return;
    lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    if (document.fonts) {
      document.fonts.ready.then(() => ScrollTrigger.refresh()).catch(() => {});
    }
    const tick = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const hash = a.getAttribute("href");
      if (!hash || hash === "#") return;
      const el = document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      scrollToTarget(hash);
      history.replaceState(null, "", hash);
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", onLoad);
      gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = null;
    };
  }, []);
  return null;
}