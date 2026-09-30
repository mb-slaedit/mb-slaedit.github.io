#!/usr/bin/env node
/**
 * switch-config.js — Alterna entre config estático (export) e dinâmico (Vercel)
 * 
 * Uso:
 *   node scripts/switch-config.js static   # Para build estático (atual)
 *   node scripts/switch-config.js dynamic  # Para deploy no Vercel
 */

const fs = require("fs");
const path = require("path");

const PROJECT_DIR = process.cwd();
const STATIC_CONFIG = path.join(PROJECT_DIR, "next.config.ts");
const DYNAMIC_CONFIG = path.join(PROJECT_DIR, "next.config.dynamic.ts");
const ACTIVE_CONFIG = path.join(PROJECT_DIR, "next.config.ts");

const mode = process.argv[2];

if (!mode || !["static", "dynamic"].includes(mode)) {
  console.error("Uso: node scripts/switch-config.js [static|dynamic]");
  process.exit(1);
}

if (mode === "static") {
  const staticContent = fs.readFileSync(path.join(PROJECT_DIR, "next.config.static.ts"), "utf8");
  fs.writeFileSync(ACTIVE_CONFIG, staticContent);
  console.log("✅ Configuração estática ativada (next.config.ts ← next.config.static.ts)");
  console.log("   Build: npm run build");
  console.log("   Output: pasta out/");
} else if (mode === "dynamic") {
  // Copia dynamic para next.config.ts
  const dynamicContent = fs.readFileSync(DYNAMIC_CONFIG, "utf8");
  fs.writeFileSync(ACTIVE_CONFIG, dynamicContent);
  console.log("✅ Configuração dinâmica ativada (next.config.ts ← next.config.dynamic.ts)");
  console.log("   Build: npm run build:dynamic");
  console.log("   Deploy: Vercel (detecta automaticamente)");
  console.log("");
  console.log("⚠️  IMPORTANTE: Configure no Vercel Dashboard:");
  console.log("   IG_APP_ID, IG_APP_SECRET, IG_REDIRECT_URI, IG_TOKEN");
  console.log("   NEXT_PUBLIC_SITE_URL=https://seu-dominio.vercel.app");
}