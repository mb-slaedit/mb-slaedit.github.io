import { BadgeCheck, RefreshCcw, CreditCard, Settings, GraduationCap } from "lucide-react";
import Image from "next/image";
import { ParallaxFrame } from "@/components/ParallaxFrame";
import { DETAIL_IMG, AULA_IMG } from "@/lib/products";

/**
 * SERVIÇOS — Bento de 5 células (exatamente 5 conteúdos = 5 células).
 * 2 com foto real + parallax, 1 com accent surface, 2 em graphite.
 * Zero célula vazia. Regra de variedade visual: ≥2 células com variação real de background.
 */
export function Services() {
  return (
    <section id="servicos" aria-label="Serviços da loja" className="py-14 md:py-28">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <p className="rv text-[11px] font-medium uppercase tracking-[0.18em] text-accent-soft">
          Serviços
        </p>
        <h2 className="rv mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight md:text-5xl">
          Mais que uma venda, um acompanhamento
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-3 md:gap-5">
          {/* Célula 1: foto + parallax — span 2 no md */}
          <ParallaxFrame className="rv relative overflow-hidden rounded-[20px] border border-white/10 md:col-span-2">
            <Image
              data-parallax
              src={DETAIL_IMG.src}
              alt={DETAIL_IMG.alt}
              width={1400}
              height={800}
              loading="lazy"
              decoding="async"
              className="h-40 w-full object-cover md:h-64"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
            <div className="absolute bottom-0 p-5 md:p-6">
              <BadgeCheck size={20} strokeWidth={2} aria-hidden className="text-accent-soft" />
              <h3 className="mt-2 font-display text-xl font-bold">Originais com garantia real</h3>
              <p className="mt-1 max-w-[52ch] text-sm text-fog">
                Aparelhos originais, com nota fiscal e garantia que funciona de verdade — na loja, com gente.
              </p>
            </div>
          </ParallaxFrame>

          {/* Célula 2: accent surface */ }
          <article className="rv rv-d1 rounded-[20px] border border-accent/40 bg-accent/10 p-5 md:p-6">
            <RefreshCcw size={20} strokeWidth={2} aria-hidden className="text-accent-soft" />
            <h3 className="mt-2 font-display text-xl font-bold">Troca do seu usado</h3>
            <p className="mt-1 text-sm leading-relaxed text-fog">
              Avaliamos seu aparelho atual e abatemos do novo na hora.
            </p>
          </article>

          {/* Célula 3: foto + parallax — Parcelamento em até 18x (preenche todo o card) */ }
          <ParallaxFrame className="rv rv-d1 relative overflow-hidden rounded-[20px] border border-white/10">
            <Image
              data-parallax
              src="/parcelamento.jpg"
              alt="Parcelamento em até 18x no cartão — PIX e condições flexíveis para caber no seu mês"
              width={1200}
              height={1800}
              loading="lazy"
              decoding="async"
              className="h-40 w-full object-cover object-center md:h-full md:min-h-[240px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
            <div className="absolute bottom-0 p-5 md:p-6">
              <CreditCard size={20} strokeWidth={2} aria-hidden className="text-accent-soft" />
              <h3 className="mt-2 font-display text-xl font-bold">Parcelamento em até 18x</h3>
              <p className="mt-1 text-sm leading-relaxed text-fog">
                No cartão em até 18x, além de PIX e condições para caber no mês.
              </p>
            </div>
          </ParallaxFrame>

          {/* Célula 4: foto + parallax — Migração e configuração */ }
          <ParallaxFrame className="rv rv-d2 relative overflow-hidden rounded-[20px] border border-white/10">
            <Image
              data-parallax
              src="/migration-config.webp"
              alt="Migração de fotos, contatos e apps para iPhone novo — transferência segura sem perda de dados"
              width={1248}
              height={702}
              loading="lazy"
              decoding="async"
              className="h-40 w-full object-cover md:h-full md:min-h-[240px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
            <div className="absolute bottom-0 p-5 md:p-6">
              <Settings size={20} strokeWidth={2} aria-hidden className="text-accent-soft" />
              <h3 className="mt-2 font-display text-xl font-bold">Migração e configuração</h3>
              <p className="mt-1 text-sm text-fog">
                Fotos, contatos e apps transferidos com você, sem perda.
              </p>
            </div>
          </ParallaxFrame>

          {/* Célula 5: foto + parallax */ }
          <ParallaxFrame className="rv rv-d2 relative overflow-hidden rounded-[20px] border border-white/10">
            <Image
              data-parallax
              src={AULA_IMG.src}
              alt={AULA_IMG.alt}
              width={1200}
              height={800}
              loading="lazy"
              decoding="async"
              className="h-40 w-full object-cover md:h-full md:min-h-[240px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
            <div className="absolute bottom-0 p-5 md:p-6">
              <GraduationCap size={20} strokeWidth={2} aria-hidden className="text-accent-soft" />
              <h3 className="mt-2 font-display text-xl font-bold">Aula de uso e suporte</h3>
              <p className="mt-1 text-sm text-fog">
                Aprenda a usar de verdade — e volte quando precisar.
              </p>
            </div>
          </ParallaxFrame>
        </div>
      </div>
    </section>
  );
}