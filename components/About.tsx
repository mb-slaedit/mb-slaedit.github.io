import { MapPin, Clock, AtSign } from "lucide-react";
import { SITE } from "@/lib/site";
import { StoreGallery } from "@/components/StoreGallery";

/**
 * A LOJA — Split único da página (imagem + texto), com endereço, horário e mapa.
 * Layout family: split image/text (1 de 2 máximos permitidos seguidos).
 */
export function About() {
  return (
    <section id="loja" aria-label="A loja e o fundador" className="bg-coal py-14 md:py-28">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 px-4 md:grid-cols-2 md:gap-14 md:px-8">
        <StoreGallery />
        <div className="rv">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
            Prazer, Ryan. A loja é a minha casa.
          </h2>
          <p className="mt-4 max-w-[58ch] leading-relaxed text-fog">
            Sou o Ryan William, fundador da RW Apple. Há 6 anos no mercado, vivo de
            tecnologia para entregar uma experiência baseada em confiança e atendimento
            humanizado. Aqui você não compra só um produto — realiza um sonho num ambiente
            acolhedor.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} strokeWidth={2} aria-hidden className="mt-0.5 shrink-0 text-accent-soft" />
              <span>
                {SITE.address}
                <br />
                <span className="text-ash">Ao lado da pizzaria Dito & Feito</span>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock size={18} strokeWidth={2} aria-hidden className="mt-0.5 shrink-0 text-accent-soft" />
              <span>{SITE.hours}</span>
            </li>
          </ul>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={SITE.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent-soft active:scale-[0.98]"
            >
              <MapPin size={16} strokeWidth={2} aria-hidden />
              Como chegar
            </a>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:border-white/45 hover:bg-white/5 active:scale-[0.98]"
            >
              <AtSign size={16} strokeWidth={2} aria-hidden />
              Ver Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}