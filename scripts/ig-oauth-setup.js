#!/usr/bin/env node
/**
 * ig-oauth-setup.js — Guia interativo para configurar OAuth do Instagram
 * 
 * Uso:
 *   node scripts/ig-oauth-setup.js
 * 
 * Este script:
 * 1. Verifica se as credenciais estão no .env.local
 * 2. Gera a URL de autorização do Instagram
 * 3. Instrui como obter o token inicial (long-lived, 60 dias)
 * 4. Salva o token em lib/ig-token.json
 */

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const ENV_FILE = path.join(__dirname, "..", ".env.local");
const TOKEN_FILE = path.join(__dirname, "..", "lib", "ig-token.json");

function loadEnv() {
  if (!fs.existsSync(ENV_FILE)) {
    console.error("❌ Arquivo .env.local não encontrado");
    process.exit(1);
  }

  const content = fs.readFileSync(ENV_FILE, "utf8");
  const env = {};
  content.split("\n").forEach(line => {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      env[match[1].trim()] = match[2].trim();
    }
  });
  return env;
}

function saveEnv(env) {
  const lines = Object.entries(env).map(([k, v]) => `${k}=${v}`);
  fs.writeFileSync(ENV_FILE, lines.join("\n") + "\n");
}

function saveToken(tokenData) {
  fs.writeFileSync(TOKEN_FILE, JSON.stringify(tokenData, null, 2));
  console.log(`\n✅ Token salvo em ${TOKEN_FILE}`);
}

async function main() {
  console.log("🔐 Instagram OAuth Setup — RW Apple\n");
  console.log("=".repeat(50));

  const env = loadEnv();

  // 1. Verificar credenciais
  console.log("\n📋 PASSO 1: Verificar credenciais no Meta Developer Console");
  console.log("-".repeat(50));

  if (!env.IG_APP_ID || !env.IG_APP_SECRET) {
    console.log("\n❌ IG_APP_ID e IG_APP_SECRET não configurados no .env.local");
    console.log("\n🔧 AÇÃO NECESSÁRIA:");
    console.log("   1. Acesse: https://developers.facebook.com/apps/");
    console.log("   2. Crie um app (tipo 'Consumer') ou use existente");
    console.log("   3. Adicione produto: 'Instagram Basic Display'");
    console.log("   4. Em 'Basic Display' → copie 'App ID' e 'App Secret'");
    console.log("   5. Em 'Valid OAuth Redirect URIs', adicione:");
    console.log(`      ${env.IG_REDIRECT_URI || "https://seu-dominio.com/api/auth/callback/instagram"}`);
    console.log("   6. Em 'Data Deletion Request URL' e 'Deauthorize Callback URL', adicione a mesma URL");
    console.log("   7. Salve e publique o app (modo Live)");

    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const appId = await new Promise(r => rl.question("\n📝 Cole seu IG_APP_ID: "));
    const appSecret = await new Promise(r => rl.question("📝 Cole seu IG_APP_SECRET: "));
    rl.close();

    if (!appId || !appSecret) {
      console.log("\n❌ Credenciais obrigatórias. Execute novamente quando tiver.");
      process.exit(1);
    }

    env.IG_APP_ID = appId;
    env.IG_APP_SECRET = appSecret;
    saveEnv(env);
    console.log("\n✅ Credenciais salvas no .env.local");
  } else {
    console.log("✅ IG_APP_ID e IG_APP_SECRET já configurados");
  }

  // 2. Gerar URL de autorização
  console.log("\n📋 PASSO 2: Autorizar o app no Instagram");
  console.log("-".repeat(50));

  const redirectUri = env.IG_REDIRECT_URI || `https://${new URL(env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").host}/api/auth/callback/instagram`;
  const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${env.IG_APP_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=user_profile,user_media&response_type=code`;

  console.log(`\n🌐 Abra este link no navegador (logado na conta Instagram da RW Apple):`);
  console.log(`\n   ${authUrl}\n`);

  console.log("Após autorizar, você será redirecionado para:");
  console.log(`   ${redirectUri}?code=CÓDIGO_AQUI`);
  console.log("\nCopie o valor do parâmetro 'code' da URL.");

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const code = await new Promise(r => rl.question("\n📝 Cole o 'code' aqui: "));
  rl.close();

  if (!code) {
    console.log("\n❌ Code obrigatório. Execute novamente.");
    process.exit(1);
  }

  // 3. Trocar code por token de curta duração
  console.log("\n📋 PASSO 3: Obter access_token de curta duração (1 hora)");
  console.log("-".repeat(50));

  const tokenResp = await fetch("https://api.instagram.com/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: env.IG_APP_ID,
      client_secret: env.IG_APP_SECRET,
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
      code,
    }),
  });

  const tokenData = await tokenResp.json();

  if (!tokenResp.ok) {
    console.error("❌ Erro ao trocar code por token:", tokenData);
    process.exit(1);
  }

  const { access_token: shortToken, user_id } = tokenData;
  console.log(`✅ Short token obtido (user_id: ${user_id})`);

  // 4. Trocar por long-lived token (60 dias)
  console.log("\n📋 PASSO 4: Trocar por long-lived token (60 dias)");
  console.log("-".repeat(50));

  const longResp = await fetch(
    `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${env.IG_APP_SECRET}&access_token=${shortToken}`
  );
  const longData = await longResp.json();

  if (!longResp.ok) {
    console.error("❌ Erro ao obter long-lived token:", longData);
    process.exit(1);
  }

  const tokenInfo = {
    access_token: longData.access_token,
    token_type: longData.token_type,
    expires_in: longData.expires_in,
    updatedAt: new Date().toISOString(),
    user_id,
  };

  saveToken(tokenInfo);

  // 5. Atualizar .env.local com IG_TOKEN (opcional, para build)
  console.log("\n📋 PASSO 5: Atualizar IG_TOKEN no .env.local (opcional)");
  console.log("-".repeat(50));

  const addToEnv = await new Promise(r => rl.question("\n📝 Adicionar IG_TOKEN ao .env.local? (s/n): "));
  if (addToEnv.toLowerCase() === "s") {
    env.IG_TOKEN = longData.access_token;
    saveEnv(env);
    console.log("✅ IG_TOKEN adicionado ao .env.local");
  }

  // 6. Testar
  console.log("\n📋 PASSO 6: Testar token");
  console.log("-".repeat(50));

  const testResp = await fetch(`https://graph.instagram.com/me?fields=id,username,followers_count&access_token=${longData.access_token}`);
  const testData = await testResp.json();

  if (testResp.ok) {
    console.log(`\n✅ Token válido!`);
    console.log(`   Username: @${testData.username}`);
    console.log(`   Seguidores: ${testData.followers_count?.toLocaleString("pt-BR") || "N/A"}`);
    console.log(`   User ID: ${testData.id}`);
  } else {
    console.log("⚠️  Token obtido mas teste falhou:", testData);
  }

  // 7. Próximos passos
  console.log("\n" + "=".repeat(50));
  console.log("🎉 SETUP CONCLUÍDO!");
  console.log("=".repeat(50));
  console.log("\n📋 PRÓXIMOS PASSOS:");
  console.log("   1. Teste local: npm run build && npx serve -l 8100 out");
  console.log("   2. Configure no Vercel Dashboard:");
  console.log("      - IG_APP_ID, IG_APP_SECRET, IG_REDIRECT_URI, IG_TOKEN");
  console.log("      - NEXT_PUBLIC_SITE_URL=https://seu-dominio.vercel.app");
  console.log("   3. Mude para config dinâmica: npm run config:dynamic");
  console.log("   4. Deploy no Vercel");
  console.log("   5. Configure cron job semanal para renovar token:");
  console.log("      - Vercel Cron Jobs ou GitHub Actions");
  console.log("      - Comando: node scripts/refresh-ig-token.js");
}

main().catch(e => {
  console.error("❌ Erro fatal:", e);
  process.exit(1);
});