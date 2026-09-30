#!/usr/bin/env node
/**
 * generate-stats.js — Gera stats.json com dados dinâmicos para TrustStrip
 * Uso: node scripts/generate-stats.js [--ig-token=TOKEN]
 * 
 * Calcula automaticamente:
 * - Anos de mercado (baseado em START_YEAR)
 * - Seguidores do Instagram (se token fornecido, via Instagram Basic Display API)
 * - Sonhos realizados (valor estático ou calculado)
 * 
 * Rodar no build: "build": "node scripts/generate-stats.js && next build"
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

const PROJECT_DIR = process.cwd();
const STATS_FILE = path.join(PROJECT_DIR, "lib", "stats.json");

// Configurações
const START_YEAR = 2018; // Ano de fundação da RW Apple
const DREAMS_BASE = 12000; // Base de sonhos realizados
const DREAMS_PER_YEAR = 2000; // Estimativa de sonhos por ano

// Args
const args = process.argv.slice(2);
const igTokenArg = args.find(a => a.startsWith("--ig-token="));
const IG_TOKEN = igTokenArg ? igTokenArg.split("=")[1] : process.env.IG_TOKEN;

// Tenta ler token do arquivo local
let LOCAL_TOKEN = null;
const TOKEN_FILE = path.join(PROJECT_DIR, "lib", "ig-token.json");
if (fs.existsSync(TOKEN_FILE)) {
  try {
    const tokenData = JSON.parse(fs.readFileSync(TOKEN_FILE, "utf8"));
    if (tokenData.access_token) {
      console.log("🔑 Token lido do arquivo local ig-token.json");
      LOCAL_TOKEN = tokenData.access_token;
    }
  } catch (e) {
    console.log("⚠️  Erro ao ler ig-token.json:", e.message);
  }
}

const EFFECTIVE_TOKEN = IG_TOKEN || LOCAL_TOKEN;

function calculateYears() {
  const currentYear = new Date().getFullYear();
  return currentYear - START_YEAR;
}

function calculateDreams() {
  const years = calculateYears();
  return DREAMS_BASE + (years * DREAMS_PER_YEAR);
}

function formatNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1).replace(".0", "") + "M";
  if (num >= 1000) return (num / 1000).toFixed(1).replace(".0", "") + "k";
  return num.toString();
}

async function fetchInstagramFollowers(token) {
  if (!token) {
    console.log("⚠️  Token não disponível. Usando valor estático.");
    return null;
  }

  return new Promise((resolve) => {
    const url = `https://graph.instagram.com/me?fields=followers_count&access_token=${token}`;
    
    https.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => data += chunk);
      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          if (json.followers_count) {
            console.log(`✅ Instagram followers: ${json.followers_count}`);
            resolve(json.followers_count);
          } else {
            console.log("⚠️  Resposta inesperada da API:", json);
            resolve(null);
          }
        } catch (e) {
          console.log("⚠️  Erro ao parsear JSON:", e.message);
          resolve(null);
        }
      });
    }).on("error", (e) => {
      console.log("⚠️  Erro na requisição:", e.message);
      resolve(null);
    });
  });
}

async function main() {
  console.log("🔄 Gerando stats.json...\n");

  const years = calculateYears();
  const dreams = calculateDreams();
  
  console.log(`📅 Anos de mercado: ${years} (desde ${START_YEAR})`);
  console.log(`💭 Sonhos realizados: ~${formatNumber(dreams)}`);

  let followers = null;
  if (EFFECTIVE_TOKEN) {
    followers = await fetchInstagramFollowers(EFFECTIVE_TOKEN);
  }

  const stats = {
    generatedAt: new Date().toISOString(),
    yearsMarket: years,
    yearsMarketLabel: `${years} anos`,
    dreamsDone: dreams,
    dreamsDoneLabel: `+${formatNumber(dreams)}`,
    instagramFollowers: followers,
    instagramFollowersLabel: followers ? formatNumber(followers) : "8.896",
  };

  fs.writeFileSync(STATS_FILE, JSON.stringify(stats, null, 2));
  console.log(`\n✅ stats.json gerado em ${STATS_FILE}`);
  console.log(JSON.stringify(stats, null, 2));
}

function formatNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1).replace(".0", "") + "M";
  if (num >= 1000) return (num / 1000).toFixed(1).replace(".0", "") + "k";
  return num.toString();
}

main().catch(e => {
  console.error("❌ Erro:", e);
  process.exit(1);
});