"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import {
  ChevronLeft,
  Headphones,
  Laptop,
  LayoutGrid,
  Smartphone,
  Tablet,
  Watch,
} from "lucide-react";
import { CTA_WHATSAPP_LABEL } from "@/lib/site";
import { PRODUCTS, type Product } from "@/lib/products";

/**
 * PÁGINA DO CATÁLOGO (/catalogo) — Grade com filtro lateral por família.
 * Era seção da home; virou aba própria do site (nav + botão do hero apontam pra cá).
 */

type Family = "iPhone" | "MacBook" | "Apple Watch" | "iPad" | "AirPods";
type Filter = Family | "Todos";

function familyOf(p: Product): Family {
  if (p.id.startsWith("macbook")) return "MacBook";
  if (p.id.startsWith("watch")) return "Apple Watch";
  if (p.id.startsWith("ipad")) return "iPad";
  if (p.id.startsWith("airpods")) return "AirPods";
  return "iPhone";
}

const FILTERS: { id: Filter; icon: typeof Smartphone }[] = [
  { id: "Todos", icon: LayoutGrid },
  { id: "iPhone", icon: Smartphone },
  { id: "MacBook", icon: Laptop },
  { id: "Apple Watch", icon: Watch },
  { id: "iPad", icon: Tablet },
  { id: "AirPods", icon: Headphones },
];

export function Catalog() {
  const [active, setActive] = useState<Filter>("Todos");

  const counts = useMemo(() => {
    const map = new Map<Filter, number>([["Todos", PRODUCTS.length]]);
    for (const p of PRODUCTS) {
      const f = familyOf(p);
      map.set(f, (map.get(f) ?? 0) + 1);
    }
    return map;
  }, []);

  const visible = useMemo(
    () =>
      active === "Todos"
        ? PRODUCTS
        : PRODUCTS.filter((p) => familyOf(p) === active),
    [active]
  );

  return (
    <MotionConfig reducedMotion="user">
    <section
      id="catalogo"
      aria-label="Catálogo de produtos"
      className="pb-20 pt-24 md:pb-28 md:pt-32"
    >
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <a
          href="/#topo"
          className="inline-flex w-fit items-center gap-1.5 text-xs text-ash transition-colors duration-200 hover:text-white"
        >
          <ChevronLeft size={14} strokeWidth={2} aria-hidden />
          Voltar ao início
        </a>

        <p className="mt-7 text-[11px] font-medium uppercase tracking-[0.18em] text-accent-soft">
          Catálogo
        </p>
        <h1 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight md:text-5xl">
          iPhones, Mac e os seus
        </h1>
        <p className="mt-3 max-w-[60ch] leading-relaxed text-fog">
          Todos lacrados, com nota fiscal e até 18x. O valor de cada um a gente
          fecha no WhatsApp — sem surpresa.
        </p>

        <div className="mt-10 flex flex-col gap-8 lg:flex-row">
          <aside aria-label="Filtrar produtos por categoria" className="lg:w-56 lg:shrink-0">
            <div className="flex gap-2 overflow-x-auto pb-1 lg:sticky lg:top-24 lg:flex-col lg:overflow-visible lg:pb-0">
              {FILTERS.map((f) => {
                const Icon = f.icon;
                const isActive = active === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setActive(f.id)}
                    aria-pressed={isActive}
                    className={`relative inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                      isActive
                        ? "text-white"
                        : "border border-white/10 text-fog hover:border-white/25 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="catalog-filter-pill"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                        className="absolute inset-0 rounded-full bg-accent"
                        aria-hidden
                      />
                    )}
                    <span className="relative z-10 inline-flex items-center gap-2">
                      <Icon size={16} strokeWidth={2} aria-hidden />
                      {f.id}
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                          isActive ? "bg-white/20 text-white" : "bg-white/5 text-ash"
                        }`}
                      >
                        {counts.get(f.id) ?? 0}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            <motion.p
              key={`${active}-${visible.length}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              aria-live="polite"
              className="text-sm text-ash"
            >
              {visible.length}{" "}
              {visible.length === 1 ? "produto" : "produtos"}
              {active !== "Todos" && (
                <>
                  {" em "} <span className="text-fog">{active}</span>
                </>
              )}
            </motion.p>

            <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-2 md:gap-5 xl:grid-cols-3">
              <AnimatePresence mode="popLayout">
              {visible.map((p, i) => (
            <motion.li
              key={p.id}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{
                duration: 0.35,
                delay: Math.min(i * 0.04, 0.4),
                ease: [0.23, 1, 0.32, 1],
              }}
              className="flex flex-col overflow-hidden rounded-[20px] border border-white/10 bg-graphite transition-colors duration-200 hover:border-white/25"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-black">
                <img
                  src={p.img}
                  alt={p.alt}
                  width={1200}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain"
                />
                <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/80 backdrop-blur">
                  {p.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-1.5 p-3 md:gap-2 md:p-6">
                <h2 className="font-display text-base font-bold tracking-tight md:text-xl">
                  {p.name}
                </h2>
                <p className="text-xs leading-relaxed text-fog line-clamp-2 md:text-sm md:line-clamp-none">{p.desc}</p>
                <a
                  href={p.wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-accent px-3 py-2.5 text-xs font-semibold text-white transition-colors duration-200 hover:bg-accent-soft active:scale-[0.98] md:px-6 md:py-3 md:text-sm"
                >
                  {CTA_WHATSAPP_LABEL}
                </a>
              </div>
            </motion.li>
          ))}
          </AnimatePresence>
            </ul>
          </div>
        </div>
      </div>
    </section>
    </MotionConfig>
  );
}