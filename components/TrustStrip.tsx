import { CTA_WHATSAPP_LABEL, SITE } from "@/lib/site";
import { stats } from "@/lib/stats";

/**
 * TRUST STRIP — faixa de confiança logo abaixo do hero, NUNCA dentro dele.
 * Estatísticas dinâmicas (geradas no build) + CTA WhatsApp (mesmo intent/label).
 */
export function TrustStrip() {
  const STATS = [
    { value: stats.yearsMarketLabel, label: "de mercado Apple em Angra" },
    { value: stats.dreamsDoneLabel, label: "sonhos realizados na loja" },
    { value: stats.instagramFollowersLabel, label: `seguidores no @rw.apple` },
  ] as const;

  return (
    <section aria-label="A loja em números" className="border-y border-white/10 bg-coal">
      <dl className="mx-auto grid max-w-[1400px] grid-cols-3 gap-3 px-4 py-8 sm:gap-6 md:px-8 md:py-12">
        {STATS.map((s, i) => (
          <div key={s.label} className={`rv ${i === 1 ? "rv-d1" : i === 2 ? "rv-d2" : ""} flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3`}>
            <dt className="order-2 text-[11px] leading-snug text-ash sm:text-sm">{s.label}</dt>
            <dd className="order-1 font-display text-2xl font-bold tracking-tight md:text-4xl">
              {s.value}
            </dd>
          </div>
        ))}

        {/* CTA inline na trust strip — mesmo intent, mesmo label */}
        <div className="rv rv-d3 col-span-3 flex items-center justify-center md:justify-start">
          <a
            href={SITE.waGeneral}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent-soft active:scale-[0.98]"
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            {CTA_WHATSAPP_LABEL}
          </a>
        </div>
      </dl>
    </section>
  );
}