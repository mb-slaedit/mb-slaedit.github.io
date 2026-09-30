"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { STORY_IMG_1, STORY_IMG_2, STORY_IMG_3 } from "@/lib/products";

gsap.registerPlugin(ScrollTrigger);

const CHAPTERS = [
  {
    n: "01",
    title: "Você entra querendo um iPhone.",
    body: "A gente escuta primeiro: para que você usa, quanto quer investir, o que precisa melhorar. A indicação nasce da sua necessidade, não da prateleira.",
  },
  {
    n: "02",
    title: "Você sai entendendo o aparelho.",
    body: "Configuramos, migramos suas fotos e contatos e ensinamos o essencial. Aqui ninguém entrega caixa fechada e some.",
  },
  {
    n: "03",
    title: "Você volta porque confia.",
    body: "Garantia real com nota fiscal, suporte depois da venda e troca do seu usado. É assim que 12 mil sonhos realizados viraram vizinhos da loja.",
  },
] as const;

const STORY_IMAGES = [STORY_IMG_1, STORY_IMG_2, STORY_IMG_3] as const;

/**
 * SCROLL STORY — Sticky stack SEQUENCIAL (um card por vez).
 * Cada card fixa no topo, faz fade-out completo, libera o pin, e o próximo fixa.
 * Sem sobreposição visual.
 */
export function ScrollStory() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !ref.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".stack-card");
      const total = cards.length;

      cards.forEach((card, i) => {
        const isLast = i === total - 1;
        const nextCard = cards[i + 1];

        // Parallax interno: foto desliza devagar dentro do frame
        const img = card.querySelector("img");
        if (img) {
          gsap.set(img, { scale: 1.15 });
          gsap.fromTo(
            img,
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: "none",
              scrollTrigger:
                i < total - 1
                  ? {
                      trigger: cards[i + 1],
                      start: "top bottom",
                      end: "top top",
                      scrub: 1,
                    }
                  : { trigger: card, start: "top bottom", end: "top top", scrub: 1 },
            }
          );
        }

        if (isLast) return;

        // Pin SEQUENCIAL: cada card fixa, faz fade-out TOTAL, libera pin, próximo assume
        const pinST = ScrollTrigger.create({
          trigger: card,
          start: "top top",
          endTrigger: card,
          end: () => `top+=${window.innerHeight}`,
          pin: true,
          pinSpacing: false,
        });

        // Fade-out COMPLETO do card atual quando o próximo chega no topo
        gsap.to(card, {
          opacity: 0,
          scale: 0.92,
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top bottom",
            end: "top top",
            scrub: 1,
            onUpdate: (self) => {
              // Garante que o card atual some completamente antes do próximo fixar
              if (self.progress > 0.95) {
                gsap.set(card, { opacity: 0, pointerEvents: "none" });
              }
            },
          },
        });

        // Libera o pin do card atual quando o próximo chega no topo
        ScrollTrigger.create({
          trigger: cards[i + 1],
          start: "top top",
          onEnter: () => {
            pinST.kill();
            gsap.set(card, { opacity: 0, pointerEvents: "none" });
          },
          once: true,
        });

        // Barra de progresso no topo
        const bar = card.querySelector(".chap-progress");
        if (bar) {
          gsap.fromTo(
            bar,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: cards[i + 1],
                start: "top bottom",
                end: "top top",
                scrub: 1,
              },
            }
          );
        }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="historia" aria-label="A experiência RW Apple" className="relative">
      <div ref={ref} className="relative">
        {CHAPTERS.map((c, i) => (
          <div
            key={c.n}
            className="stack-card relative flex min-h-[100dvh] items-center bg-ink"
            style={{ zIndex: 10 - i }}
          >
            {/* Linha divisória topo */}
            <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-white/15" />
            {/* Barra de progresso da transição */}
            {i < CHAPTERS.length - 1 && (
              <div
                aria-hidden
                className="chap-progress absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-white/70"
              />
            )}

            <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-8 px-4 py-20 md:grid-cols-2 md:gap-14 md:px-8">
              {/* Texto — alterna lado (zigzag controlado: máx 2 seguidos) */}
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <p className="font-display text-sm font-bold tracking-[0.2em] text-accent-soft">
                  {c.n}
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
                  {c.title}
                </h2>
                <p className="mt-4 max-w-[52ch] leading-relaxed text-fog">{c.body}</p>
              </div>

              {/* Imagem — parallax interno */}
              <div
                className={`relative overflow-hidden rounded-[20px] border border-white/10 ${i % 2 === 1 ? "md:order-1" : ""}`}
              >
                <Image
                  src={STORY_IMAGES[i].src}
                  alt={STORY_IMAGES[i].alt}
                  width={1400}
                  height={1000}
                  className="aspect-[4/3] w-full object-cover"
                  loading={i === 0 ? "eager" : "lazy"}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}