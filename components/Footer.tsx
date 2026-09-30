import { MapPin, Clock, AtSign, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-coal">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-8 px-4 py-12 md:grid-cols-3 md:px-8">
        <div>
          <p className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
            <img
              src="/logo.jpg"
              alt="Logo RW Apple"
              width={56}
              height={56}
              className="h-7 w-7 rounded-lg object-cover"
            />
            RW <span className="-ml-1 text-accent-soft">Apple</span>
          </p>
          <p className="mt-2 max-w-[40ch] text-sm leading-relaxed text-ash">
            Especialista em produtos Apple em Angra dos Reis. Confiança, aprendizado e
            atendimento humanizado.
          </p>
        </div>
        <div className="text-sm">
          <p className="font-semibold">Visite a loja</p>
          <p className="mt-2 flex items-start gap-2 text-ash">
            <MapPin size={16} strokeWidth={2} aria-hidden className="mt-0.5 shrink-0" />
            {SITE.address}
          </p>
          <p className="mt-2 flex items-start gap-2 text-ash">
            <Clock size={16} strokeWidth={2} aria-hidden className="mt-0.5 shrink-0" />
            {SITE.hours}
          </p>
        </div>
        <div className="text-sm">
          <p className="font-semibold">Fale com a gente</p>
          <div className="mt-2 flex flex-col gap-2">
            <a
              href={SITE.waGeneral}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 text-ash transition-colors hover:text-white"
            >
              <MessageCircle size={16} strokeWidth={2} aria-hidden />
              WhatsApp da loja
            </a>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 text-ash transition-colors hover:text-white"
            >
              <AtSign size={16} strokeWidth={2} aria-hidden />
              @rw.apple
            </a>
            <a
              href={SITE.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 text-ash transition-colors hover:text-white"
            >
              <MapPin size={16} strokeWidth={2} aria-hidden />
              Abrir no mapa
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-[1400px] px-4 py-5 text-xs text-ash md:px-8">
          © {new Date().getFullYear()} RW Apple — Angra dos Reis, RJ. Site demonstrativo.
        </p>
      </div>
    </footer>
  );
}