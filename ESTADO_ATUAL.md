# 📋 ESTADO ATUAL — RW Apple (Resumo para Nova Sessão)

## 🎯 Stack & Config
- **Framework**: Next.js 16 (App Router) + TypeScript + Tailwind v4
- **Styling**: CSS custom properties + design tokens (ink/coal/graphite/accent #0071e3)
- **Motion**: GSAP ScrollTrigger + Lenis (smooth scroll 3s) + Framer Motion
- **Icons**: Lucide React
- **Fonts**: Space Grotesk (display) + Inter (UI) + JetBrains Mono (mono)
- **Deploy**: Static export (`output: export`) → `out/` + `serve -l 8100`

---

## 📦 Estado Atual (Build ✅ Verde)

| Componente | Status | Detalhes |
|------------|--------|----------|
| **Build** | ✅ Verde | `npm run build` → `out/` + `serve -l 8100` |
| **TypeScript** | ✅ OK | Strict mode, zero erros |
| **Lint** | ✅ OK | ESLint + Next.js config |
| **Servidor** | ✅ Rodando | `http://127.0.0.1:8100/` |
| **Site no OpenCode** | ✅ Aberto | Aba de visualização ativa |

---

## 🏗️ Arquitetura & Páginas

| Rota | Componente | Status |
|------|------------|--------|
| `/` | Home (Hero + TrustStrip + ScrollStory + Services + About + Reviews + FAQ + FinalCTA) | ✅ |
| `/catalogo` | Catálogo estático (9 produtos) | ✅ |
| `/catalogo` (página) | `app/catalogo/page.tsx` | ✅ |

**API routes** movidas para backup (static export não suporta rotas dinâmicas):
- `app/api/auth/callback/instagram/route.ts` → `app-api-backup/`
- `app/api/auth/refresh/instagram/route.ts` → `app-api-backup/`

---

## 📦 Catálogo Final (9 produtos reais)

| ID | Modelo | Imagem | Status |
|----|--------|--------|--------|
| `18-pro-max` | 18 Pro Max | `/ig-18-chegou.jpg` (IG real) | Lançamento |
| `18-pro` | 18 Pro | `/ig-18-cores.jpg` | Disponível |
| `18` | 18 | `/ig-18-cores.jpg` | Disponível |
| `17-pro-max` | 17 Pro Max | `/ig-17promax.jpg` (IG real) | Disponível |
| `17` | 17 | `/ig-17-linha.jpg` (IG real) | Disponível |
| `16` | 16 | Stock verificado | Disponível |
| `macbook-neo` | MacBook Neo | `/ig-macbook.jpg` (IG real) | Disponível |
| `watch` | Apple Watch | Stock verificado | Disponível |
| `ipad` | iPad | Stock verificado | Disponível |

> **Total: 9 produtos** — todos com fotos reais (IG) ou stock verificado, zero placeholders.

---

## 🎨 Design System (Tokens)

```css
/* Cores (Dark Locked) */
--color-ink: #060607;
--color-coal: #0c0c0f;
--color-graphite: #131318;
--color-smoke: #1e1e26;
--color-ash: #a7aab5;
--color-fog: #d6d8e0;
--color-bone: #ffffff;
--color-accent: #0071e3;      /* Apple Blue */
--color-accent-soft: #2997ff;

/* Radius */
--radius-pill: 9999px;
--radius-card: 20px;

/* Motion */
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);
--duration-slow: 550ms;
--stagger: 60ms;
```

---

## 🧩 Componentes Principais

| Componente | Arquivo | Status |
|------------|---------|--------|
| `Hero` | `components/Hero.tsx` | ✅ hero.png + overlay escuro sutil |
| `TrustStrip` | `components/TrustStrip.tsx` | ✅ 3 stats dinâmicas + CTA |
| `ScrollStory` | `components/ScrollStory.tsx` | ✅ 3 capítulos sticky-stack + parallax |
| `Services` | `components/Services.tsx` | ✅ Bento 5 células (2 parallax) |
| `About` + `StoreGallery` | `components/About.tsx` + `StoreGallery.tsx` | ✅ Galeria 5 fotos |
| `Reviews` | `components/Reviews.tsx` | ✅ 10 fotos clientes (IG) |
| `FAQ` | `components/Faq.tsx` | ✅ 5 acordeões |
| `FinalCta` | `components/FinalCta.tsx` | ✅ CTA final |
| `Catalog` | `components/Catalog.tsx` + `app/catalogo/page.tsx` | ✅ 9 produtos |
| `Footer` | `components/Footer.tsx` | ✅ Contato + links |

---

## 📊 TrustStrip (Dinâmico)

Gera `lib/stats.json` no build via `scripts/generate-stats.js`:

| Stat | Valor Atual | Fonte |
|------|-------------|-------|
| Anos de mercado | 8 anos | `new Date().getFullYear() - 2018` |
| Sonhos realizados | +28k | Base 12k + 2k/ano |
| Seguidores IG | 8.896 | Fallback (token expirado) |

> **Token IG expirado** — precisa renovar `ig-token.json` ou `IG_TOKEN` env.

---

## 📁 Arquivos-Chave para Levar

```
F:\Default Project\rw-apple\
├── lib/
│   ├── products.ts          # Catálogo completo (9 produtos)
│   ├── stats.ts             # Wrapper tipado (importa stats.json)
│   ├── stats.json           # Gerado no build (não commitado)
│   ├── stats.json           # Gerado no build (não commitado)
│   ├── ig-token.json        # Token IG (expirado - precisa renovar)
│   ├── site.ts              # Constantes do site (WA, IG, endereço)
│   └── site.ts
├── components/
│   ├── Hero.tsx + Hero.tsx
│   ├── ScrollStory.tsx      # Sticky-stack + parallax
│   ├── Services.tsx         # Bento 5 células
│   ├── ScrollStory.tsx
│   ├── Catalog.tsx          # Catálogo estático
│   └── ...
├── app/
│   ├── page.tsx             # Home (ordem das seções)
│   ├── catalogo/page.tsx    # Página /catalogo
│   └── layout.tsx           # Providers + Nav + Footer
├── scripts/
│   ├── generate-stats.js    # Gera stats.json
│   ├── refresh-ig-token.js  # Renova token IG (cron semanal)
│   └── ...
├── scripts/
│   ├── generate-stats.js
│   ├── refresh-ig-token.js
│   ├── ...
├── .env.local               # IG_APP_ID, IG_APP_SECRET, IG_REDIRECT_URI
├── next.config.ts           # output: export + headers
├── tsconfig.json            # + "**/*.json" no include
└── ESTADO_ATUAL.md          # Este arquivo
```

---

## ⚙️ Comandos Essenciais

```bash
# Desenvolvimento
npm run dev

# Build completo (roda generate-stats + next build)
npm run build

# Servir build estático
npx -y serve -l 8100 out  # na pasta out/

# Gerar stats manualmente
npm run stats:generate

# Renovar token IG (cron semanal)
npm run ig:refresh

# ═══════════════════════════════════════════
# NOVOS COMANDOS (Esta Sessão)
# ═══════════════════════════════════════════

# Setup OAuth Instagram (GUIA INTERATIVO COMPLETO)
npm run ig:setup

# Alternar configuração: Static Export ↔ Vercel Dynamic
npm run config:static    # next.config.ts (export) - atual
npm run config:dynamic   # next.config.dynamic.ts (Vercel)
```

---

## ⚠️ Pendências / Próximos Passos

| Item | Status | Ação |
|------|--------|------|
| **Token Instagram** | 🔄 **Em progresso** | Executar `npm run ig:setup` para OAuth inicial |
| **OAuth Instagram** | ✅ **Rotas restauradas** | `/api/auth/callback/instagram` + `/api/auth/refresh/instagram` em `app/api/` |
| **Seguidores IG** | Fallback 8.896 | Configurar `IG_TOKEN` válido + `IG_APP_ID/SECRET` no Vercel |
| **Deploy Produção** | 🔄 **Preparado** | `vercel.json` criado, `next.config.dynamic.ts` pronto, GitHub Actions para renovação semanal |
| **Analytics** | Parcial | GA4 ID + Plausible + Consent Mode v2 (parcial) |

---

## 🆕 Novos Scripts & Configurações (Esta Sessão)

| Arquivo | Função |
|---------|--------|
| `scripts/switch-config.js` | Alterna entre `next.config.ts` (static export) e `next.config.dynamic.ts` (Vercel) |
| `scripts/ig-oauth-setup.js` | **Guia interativo completo** para OAuth Instagram (Passo a passo) |
| `app/api/auth/callback/instagram/route.ts` | Callback OAuth restaurado (troca code → long-lived token) |
| `app/api/auth/refresh/instagram/route.ts` | Endpoint para renovar token via POST |
| `vercel.json` | Configuração Vercel (headers, regions, functions) |
| `.github/workflows/refresh-ig-token.yml` | Cron job semanal (seg 03:00 UTC) para renovar token auto |
| `package.json` | Novos scripts: `config:static`, `config:dynamic`, `ig:refresh`, `ig:setup` |

---

## 🚀 Próximos Comandos (Nova Sessão)

```bash
cd F:\Default Project\rw-apple

# 1. Setup OAuth Instagram (GUIA INTERATIVO - FAÇA ISSO PRIMEIRO)
npm run ig:setup
# → Siga os passos: cole IG_APP_ID/SECRET, autorize no browser, cole o 'code'

# 2. Build local (estático) para testar
npm run build
npx -y serve -l 8100 out
# http://127.0.0.1:8100/

# 3. Preparar para Vercel (config dinâmica)
npm run config:dynamic

# 4. Deploy no Vercel
# - Conecte repo no Vercel Dashboard
# - Configure Environment Variables:
#   IG_APP_ID, IG_APP_SECRET, IG_REDIRECT_URI, IG_TOKEN
#   NEXT_PUBLIC_SITE_URL=https://seu-dominio.vercel.app
# - Deploy!

# 5. (Opcional) Voltar para static export
npm run config:static
```

---

## 🔑 Variáveis de Ambiente (.env.local)

```env
# Instagram Basic Display API
IG_APP_ID=
IG_APP_SECRET=
IG_REDIRECT_URI=https://seudominio.com/api/auth/callback/instagram
IG_TOKEN=              # token longo (60 dias) — preencher após OAuth

# Site
NEXT_PUBLIC_SITE_URL=https://seudominio.com

# Analytics (opcional)
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=
```

---

## 📋 Checklist Pós-Deploy

- [ ] `npm run build` verde
- [ ] `npx serve -l 8100 out` → `http://127.0.0.1:8100/`
- [ ] `Ctrl+Shift+R` no browser (limpar cache)
- [ ] Verificar hero.png carrega
- [ ] Verificar catálogo `/catalogo` (9 cards)
- [ ] Verificar ScrollStory (3 capítulos sticky)
- [ ] Verificar TrustStrip (3 stats + CTA)
- [ ] Verificar Services (5 cards bento)
- [ ] Verificar FAQ (5 acordeões)
- [ ] Verificar Footer (links + WhatsApp)
- [ ] Verificar console (0 erros)
- [ ] Mobile 390px sem overflow horizontal

---

> **Arquivo gerado em:** `2026-09-29T04:30:00Z`  
> **Último build:** `2026-09-29T04:28:00Z` (✅ Verde)  
> **Próximo passo:** Renovar token Instagram + deploy produção