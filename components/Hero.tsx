import { ChevronDown, MessageCircle } from "lucide-react";
import { CTA_WHATSAPP_LABEL, SITE } from "@/lib/site";
import Image from "next/image";

/**
 * HERO — a "cara do site".
 * Imagem hero.png como fundo, copy ancorada bottom-left.
 * Headline 2 linhas + sub ≤20 palavras + 1 CTA primário + 1 secundário, tudo no 1º viewport.
 * Design mais claro/arejado com mais branco.
 */
export function Hero() {
  return (
    <section id="topo" aria-label="Apresentação" className="relative min-h-[100dvh] overflow-hidden">
      {/* Imagem hero como fundo — mobile usa versão retrato, desktop a panorâmica */}
      <div className="absolute inset-0 z-0" aria-hidden>
        <picture>
          <source media="(min-width: 768px)" srcSet="/hero.png" />
          <Image
            src="/hero-mobile.jpg"
            alt=""
            fill
            priority
            className="object-cover object-[60%_center] md:object-center"
            sizes="100vw"
          />
        </picture>
        {/* Overlay sutil escuro apenas para legibilidade do texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/10" />
      </div>

      <div
        data-hero-content
        className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col justify-end px-4 pb-20 pt-24 md:px-8 md:pb-24"
      >
        {/* Eyebrow — única na home (máx 1 per 3 sections) */}
        <p className="enter enter-d1 mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/80">
          Angra dos Reis · 6 anos de mercado
        </p>

        {/* Headline — max 2 linhas desktop */}
        <h1 className="enter enter-d2 max-w-3xl font-display text-[32px] font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl text-white">
          O iPhone que você sonha, com quem você confia.
        </h1>

        {/* Subtext — ≤20 palavras, max 3-4 linhas */}
        <p className="enter enter-d3 mt-4 max-w-[52ch] text-base leading-relaxed text-white/80 md:text-lg">
          Na RW Apple em Angra: originais, garantia real e atendimento que te ensina a usar.
        </p>

        {/* CTAs — 1 primário + 1 secundário, mesmo intent = mesmo label */}
        <div className="enter enter-d4 mt-7 flex flex-wrap items-center gap-3">
          <a
            href={SITE.waGeneral}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-white/90 active:scale-[0.98] shadow-lg"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            {CTA_WHATSAPP_LABEL}
          </a>
          <a
            href="/catalogo"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/20 active:scale-[0.98] shadow-lg"
          >
            Ver catálogo
          </a>
        </div>

        {/* Scroll cue */}
        <a
          href="#historia"
          aria-label="Rolar para a história"
          className="mt-10 inline-flex w-fit items-center gap-2 text-xs text-white/60 transition-colors hover:text-white"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="animate-bounce">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
          role e descubra
        </a>
      </div>
    </section>
  );
}