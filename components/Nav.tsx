"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, MessageCircle, X } from "lucide-react";
import { CTA_WHATSAPP_LABEL, SITE } from "@/lib/site";

const LINKS = [
  { href: "#historia", label: "A história" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "#servicos", label: "Serviços" },
  { href: "#loja", label: "A loja" },
  { href: "#duvidas", label: "Dúvidas" },
];

/**
 * Nav fixo com glass ao rolar.
 * Fora da home, links de âncora viram `/#hash` para navegação cross-page.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const onHome = pathname === "/";

  const href = (h: string) => (h.startsWith("#") ? (onHome ? h : `/${h}`) : h);

  useEffect(() => {
    const sentinel = document.getElementById("nav-sentinel");
    if (!sentinel) {
      setScrolled(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => setScrolled(!e.isIntersecting),
      { threshold: 0 }
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div id="nav-sentinel" aria-hidden className="absolute inset-x-0 top-0 h-10" />
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled ? "glass-dark border-b border-white/10" : "bg-transparent"
        }`}
      >
        <nav
          aria-label="Navegação principal"
          className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 md:h-[72px] md:px-8"
        >
          <a href={href("#topo")} className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
            <img
              src="/logo.jpg"
              alt="Logo RW Apple"
              width={56}
              height={56}
              className="h-7 w-7 rounded-lg object-cover"
            />
            RW <span className="-ml-1 text-accent-soft">Apple</span>
          </a>

          <ul className="hidden items-center gap-7 text-sm text-fog lg:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={href(l.href)}
                  className="transition-colors duration-200 hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={SITE.waGeneral}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent-soft active:scale-[0.98] md:px-5 md:py-2.5"
          >
            <MessageCircle size={16} strokeWidth={2} aria-hidden />
            <span className="hidden sm:inline">{CTA_WHATSAPP_LABEL}</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-fog transition-colors duration-200 hover:border-white/25 hover:text-white lg:hidden"
          >
            {open ? (
              <X size={20} strokeWidth={2} aria-hidden />
            ) : (
              <Menu size={20} strokeWidth={2} aria-hidden />
            )}
          </button>
        </nav>

        <div
          id="mobile-menu"
          className={`overflow-hidden border-white/10 bg-ink/95 backdrop-blur-xl transition-all duration-300 motion-reduce:transition-none lg:hidden ${
            open ? "visible max-h-96 border-b opacity-100" : "invisible max-h-0 opacity-0"
          }`}
        >
          <ul className="space-y-1 px-4 py-4">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={href(l.href)}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-base font-medium text-fog transition-colors duration-200 hover:bg-white/5 hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </>
  );
}