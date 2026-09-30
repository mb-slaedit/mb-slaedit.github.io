# DESIGN.md — RW Apple

> **Design Read:** Premium local-business landing (Apple reseller) para consumidores que buscam confiança em Angra dos Reis, linguagem Apple-y humanizada dark, custom Tailwind v4 + GSAP scroll-storytelling.

---

## Tokens

### Color Palette (Dark Locked + Single Accent)
| Token | Hex | Uso |
|-------|-----|-----|
| `ink` | `#060607` | Base page bg (near-black warm) |
| `coal` | `#0c0c0f` | Section alternada |
| `graphite` | `#131318` | Cards superficiais |
| `smoke` | `#1e1e26` | Elevation sutil |
| `line-dark` | `#23232c` | Divisórias, borders |
| `ash` | `#a7aab5` | Texto terciário, meta |
| `fog` | `#d6d8e0` | Body copy |
| `bone` | `#ffffff` | Headlines, CTAs primários |
| **`accent`** | **`#0071E3`** | **Único accent — Apple Blue** |
| `accent-soft` | `#2997FF` | Hover, focus, glow sutil |

> **Regra:** Um único accent em toda a página. Zero roxo, zero gradientes AI.

### Typography
| Role | Fonte | Escala |
|------|-------|--------|
| Display / Headlines | **Space Grotesk** (variable, wght 300-700) | `text-4xl md:text-6xl lg:text-7xl` hero, `text-3xl md:text-5xl` sections |
| UI / Body / Labels | **Inter** (variable, opsz) | `text-base` body, `text-sm` UI, `text-[11px]` eyebrows |
| Mono / Data | **JetBrains Mono** | Números, contadores, código |

> **Escala fluida:** `clamp(1.5rem, 2vw + 1rem, 4rem)` para headlines — sem saltos de breakpoint.

### Radius Scale (Locked)
| Token | Valor | Uso |
|-------|-------|-----|
| `--radius-pill` | `9999px` | Botões, tags, pills |
| `--radius-card` | `20px` | Cards, sections, containers |
| `--radius-input` | `12px` | Inputs (se houver) |

### Motion Tokens
| Token | Valor | Uso |
|-------|-------|-----|
| `--ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` | Entradas, reveals |
| `--ease-in-out` | `cubic-bezier(0.77, 0, 0.175, 1)` | Movimento on-screen |
| `--duration-fast` | `160ms` | Press, hover |
| `--duration-base` | `250ms` | Transições UI |
| `--duration-slow` | `550ms` | Hero entrance, reveals |
| `--scroll-duration` | `3s` | Navegação interna (requisito do brief) |
| `--stagger` | `60ms` | Stagger hero / reveals |

---

## Three Dials (Travados)

| Dial | Valor | Justificativa |
|------|-------|---------------|
| **DESIGN_VARIANCE** | **8** | Apple-style asymmetric layouts, split/stack/bento variados, hero off-center |
| **MOTION_INTENSITY** | **6** | Sticky-stack storytelling (motivado), parallax interno suave, hero entrance CSS, reveal escalonado — **zero** marquee/aurora/cut-in |
| **VISUAL_DENSITY** | **3** | Espaçoso, `py-28`/`py-32`, respiro generoso, tipografia ampla |

---

## Layout Principles (Anti-Default)

1. **Hero off-center** (left-aligned content, right visual) — nunca centered
2. **Máx 1 eyebrow per 3 sections** — contagem mecânica
3. **Zero zigzag repetido** — máx 2 splits imagem+texto seguidos
4. **Bento cell count = content count** — sem células vazias
5. **Section layout family única por seção** — 8 seções = ≥ 4 famílias
6. **Real imagery only** — hero video, 5 fotos fachada, 10 clientes IG, 7 produtos (4 IG + 3 stock verificado)
7. **CTA intent único** — todos "Chamar no WhatsApp" (mesmo label)
8. **Hero fit no 1º viewport** — headline 2 linhas, sub ≤20 palavras, 2 CTAs visíveis

---

## Component Inventory

| Componente | Variações | Estados |
|------------|-----------|---------|
| Button | Primary (accent), Secondary (border), Ghost | default, hover, active, focus, disabled |
| Card | Product, Service, Review, Gallery | default, hover, focus |
| Nav | Desktop, Mobile | scrolled, transparent |
| Hero | Video background | playing, paused, reduced-motion |
| ScrollStory | Sticky-stack 3 chapters | pinned, parallax, progress bar |
| Services | Bento 5 cells | parallax, accent, graphite |
| StoreGallery | Carousel 5 photos | crossfade, zoom, dots, arrows, keyboard, swipe |
| Catalog | Grid 7 products | static, hover |
| FAQ | Accordion 5 items | open, closed |
| FinalCTA | Radial gradient | default |
| Footer | 3 columns | default |

---

## Photography Direction

**Style:** Real, warm, human, Angra lighting — nada de stock genérico

| Asset | Fonte | Especificação |
|-------|-------|---------------|
| Hero video | Cliente real | 10s, mute, loop, playsinline, poster frame |
| Fachada (5) | Loja real | 4:3, exterior + interior + detalhes |
| Clientes (10) | Instagram @rw.apple | Square, aspect-square, object-position:center_35% |
| Produtos (7) | 4 IG + 3 stock verificado | 4:3, categoria badge, WhatsApp CTA |
| Story (3) | 2 stock + 1 IG cliente | 4:3, parallax interno 1.32x scale |

**Prompt Library (para IA):**
```
# Hero poster frame
"Professional photo of Apple reseller storefront in Angra dos Reis, warm golden hour lighting, modern glass facade with Apple logo, inviting atmosphere, 16:9, photorealistic"

# Store interior
"Cozy Apple reseller interior in Brazil, wooden shelves with iPhones and Apple Watches, warm ambient lighting, customer being helped by friendly staff, 4:3, documentary style"

# Customer moment
"Happy Brazilian family receiving new iPhone at Apple store, genuine smiles, store background blurred, warm lighting, 4:3, candid photography"
```

---

## Voice & Tone

| Atributo | Direção |
|----------|---------|
| **Personalidade** | Especialista acolhedor — ensina sem pedantismo |
| **Vocabulário** | "Sonho realizado", "Acompanhamento", "Confiança", "Ensinar a usar" |
| **Estrutura** | Headline direta + sub ≤20 palavras + CTA claro |
| **Proibido** | Jargão corporativo, "soluções", "ecossistema", "transformar" |

**Do / Don't:**
| ✅ Do | ❌ Don't |
|-------|----------|
| "O iPhone que você sonha, com quem você confia" | "Soluções móveis inovadoras para sua vida digital" |
| "Ensina a usar de verdade" | "Capacitação tecnológica completa" |
| "Fecha no WhatsApp — sem surpresa" | "Consulte condições especiais" |

---

## Do / Don't (Visual)

| ✅ Do | ❌ Don't |
|-------|----------|
| Hero off-center (left content, right video) | Hero centered com texto em cima de tudo |
| Um accent só (#0071E3) | Gradientes roxos, múltiplos accents |
| Radius consistente (pill/20px/12px) | Radius aleatório por componente |
| Imagens reais (IG, fachada, clientes) | Stock photos genéricas, placeholders |
| Sticky-stack motivado (storytelling) | Marquee, aurora, cut-in, parallax gratuito |
| Scroll 3s suave (Lenis) | Scroll instantâneo ou jump |
| Reduced-motion nativo | Animação forçada sem respeito ao usuário |

---

## Acessibilidade (WCAG 2.2 AA)

- Contrast AA em todos os textos (4.5:1 normal, 3:1 large)
- Focus visible em todos os interativos
- Skip link no topo
- ARIA labels em ícones-only buttons
- alt text descritivo em todas imagens
- Skip animations em prefers-reduced-motion
- Zoom 200% sem horizontal scroll

---

## Performance Budgets

| Métrica | Mobile | Desktop |
|---------|--------|---------|
| LCP | ≤ 2.5s | ≤ 2.5s |
| INP | ≤ 200ms | ≤ 200ms |
| CLS | ≤ 0.1 | ≤ 0.1 |
| TTFB | ≤ 800ms | ≤ 600ms |
| JS Total | ≤ 170KB gz | ≤ 170KB gz |
| CSS Total | ≤ 50KB gz | ≤ 50KB gz |
| Fonts | ≤ 50KB | ≤ 50KB |
| Imagens | ≤ 500KB | ≤ 800KB |

---

## SEO Technical

- Structured data: LocalBusiness, Product, BreadcrumbList, FAQPage
- Sitemap.xml + sitemap-images.xml
- robots.txt com sitemaps
- Canonical self-referencing
- Meta tags completos (OG, Twitter, canonical)
- hreflang se multi-locale
