"use client";

import { useState } from "react";
import { Plus, MessageCircle } from "lucide-react";
import { CTA_WHATSAPP_LABEL, SITE } from "@/lib/site";

const FAQS = [
  {
    q: "Os aparelhos são originais?",
    a: "Sim. Trabalhamos com iPhones lacrados e seminovos avaliados, todos originais Apple, com nota fiscal e garantia real da loja.",
  },
  {
    q: "Vocês aceitam meu celular atual na troca?",
    a: "Sim. Avaliamos seu aparelho na loja e abatemos o valor na hora da compra do novo.",
  },
  {
    q: "Quais as formas de pagamento?",
    a: "PIX, cartão em até 18x e parcelamento facilitado. Chame no WhatsApp e consulte as condições do dia.",
  },
  {
    q: "Vocês configuram o aparelho para mim?",
    a: "Sim, e sem custo extra: migramos fotos, contatos e apps e ensinamos o essencial antes de você sair.",
  },
  {
    q: "Onde fica a loja?",
    a: "Rua Coronel Carvalho, 356, Centro de Angra dos Reis, ao lado da pizzaria Dito & Feito. Seg a Sáb, 9h às 18h.",
  },
] as const;

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="duvidas" aria-label="Dúvidas frequentes" className="bg-coal py-14 md:py-28">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-4 md:grid-cols-2 md:gap-14 md:px-8">
        <div className="rv">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-accent-soft">
            Dúvidas
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
            Perguntas de quem chega na loja
          </h2>
          <p className="mt-4 max-w-[52ch] leading-relaxed text-fog">
            Não achou a sua? Pergunte direto — o Ryan responde.
          </p>
          <a
            href={SITE.waGeneral}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent-soft active:scale-[0.98]"
          >
            <MessageCircle size={16} strokeWidth={2} aria-hidden />
            {CTA_WHATSAPP_LABEL}
          </a>
        </div>
        <div className="rv">
          {open === null && (
            <p role="status" className="sr-only">
              Nenhuma pergunta expandida
            </p>
          )}
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={f.q}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-4 text-left"
                  >
                    <span className="font-semibold">{f.q}</span>
                    <Plus
                      size={18}
                      strokeWidth={2}
                      aria-hidden
                      className={`shrink-0 text-accent-soft transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}
                    />
                  </button>
                  <div
                    className={`grid transition-colors duration-200 ${isOpen ? "grid-rows-[1fr] pb-4 opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <p className="overflow-hidden text-sm leading-relaxed text-fog">{f.a}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}