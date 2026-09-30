import { MessageCircle } from "lucide-react";
import { CTA_WHATSAPP_LABEL, SITE } from "@/lib/site";

/**
 * CTA FINAL — Mesma intenção e mesmo rótulo do resto da página.
 * Radial gradient sutil de acento para profundidade.
 */
export function FinalCta() {
  return (
    <section aria-label="Falar com a loja" className="py-14 md:py-28">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <div className="rv relative overflow-hidden rounded-[20px] border border-white/10 bg-graphite px-6 py-10 text-center md:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 50% 120%, rgba(0,113,227,0.35), transparent 70%)",
            }}
          />
          <h2 className="relative mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight md:text-5xl">
            Pronto para sair de iPhone novo?
          </h2>
          <p className="relative mx-auto mt-4 max-w-[52ch] leading-relaxed text-fog">
            Manda um oi agora e receba os modelos disponíveis hoje.
          </p>
          <a
            href={SITE.waGeneral}
            target="_blank"
            rel="noopener noreferrer"
            className="relative mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent-soft active:scale-[0.98] md:mt-8"
          >
            <MessageCircle size={17} strokeWidth={2} aria-hidden />
            {CTA_WHATSAPP_LABEL}
          </a>
        </div>
      </div>
    </section>
  );
}