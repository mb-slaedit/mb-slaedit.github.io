import { AtSign } from "lucide-react";
import { SITE } from "@/lib/site";

/** Fotos reais dos destaques "CLIENTES" do Instagram @rw.apple (destaques 22–31). */
const CLIENT_PHOTOS = [31, 30, 29, 28, 27, 26, 25, 24, 23, 22] as const;

/**
 * QUEM COMPROU — Prova social real: fotos dos clientes da loja, sem depoimentos inventados.
 * Toque abre o Instagram da loja. Grid 5 colunas no desktop, 3 no tablet, 2 no mobile.
 */
export function Reviews() {
  return (
    <section aria-label="Clientes da loja" className="py-14 md:py-28">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <h2 className="rv max-w-2xl font-display text-3xl font-bold tracking-tight md:text-5xl">
          Quem comprou, aparece aqui
        </h2>
        <p className="rv mt-3 max-w-[60ch] leading-relaxed text-fog">
          Trechos dos destaques “CLIENTES” do Instagram — {SITE.instagramFollowers}{" "}
          seguidores acompanham cada sonho realizado.
        </p>
        <ul className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-3 md:mt-10 md:grid-cols-5 md:gap-5">
          {CLIENT_PHOTOS.map((n, i) => (
            <li key={n} className={`rv ${i % 3 === 1 ? "rv-d1" : i % 3 === 2 ? "rv-d2" : ""}`}>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ver destaque CLIENTES ${n} no Instagram da RW Apple`}
                className="group block overflow-hidden rounded-[20px] border border-white/10 transition-colors duration-200 hover:border-white/30"
              >
                <img
                  src={`/clientes-${n}.jpg`}
                  alt={`Cliente da RW Apple recebendo iPhone na loja — destaque ${n}`}
                  loading="lazy"
                  width={300}
                  height={300}
                  className="aspect-square w-full object-cover [object-position:center_35%] transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </a>
            </li>
          ))}
        </ul>
        <a
          href={SITE.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="rv mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:border-white/45 hover:bg-white/5 active:scale-[0.98] md:mt-8"
        >
          <AtSign size={16} strokeWidth={2} aria-hidden />
          Ver tudo no Instagram
        </a>
      </div>
    </section>
  );
}