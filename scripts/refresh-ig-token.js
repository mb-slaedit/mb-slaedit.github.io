#!/usr/bin/env node
/**
 * refresh-ig-token.js — Renova o token do Instagram automaticamente
 * 
 * Uso:
 *   node scripts/refresh-ig-token.js
 * 
 * Adicione ao crontab para rodar semanalmente:
 *   0 3 * * 1 cd /path/to/project && node scripts/refresh-ig-token.js >> logs/refresh-ig.log 2>&1
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

const TOKEN_FILE = path.join(__dirname, "..", "lib", "ig-token.json");

async function refreshToken() {
  const tokenPath = path.join(process.cwd(), "lib", "ig-token.json");
  
  if (!fs.existsSync(tokenPath)) {
    console.error("❌ Arquivo de token não encontrado:", tokenPath);
    console.log("Execute primeiro o fluxo OAuth para obter o token inicial.");
    process.exit(1);
  }

  const tokenData = JSON.parse(fs.readFileSync(tokenPath, "utf8"));
  const { access_token } = tokenData;

  if (!tokenData.access_token) {
    console.error("❌ Token não encontrado no arquivo");
    process.exit(1);
  }

  const IG_APP_SECRET = process.env.IG_APP_SECRET;
  
  if (!IG_APP_SECRET) {
    console.error("❌ IG_APP_SECRET não configurado nas variáveis de ambiente");
    process.exit(1);
  }

  console.log("🔄 Renovando token do Instagram...");

  try {
    const url = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${tokenData.access_token}`;
    
    const response = await new Promise((resolve, reject) => {
      https.get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => data += chunk);
        res.on("end", () => resolve({ status: res.statusCode, data }));
      }).on("error", reject);
    });

    if (![200, 201].includes(response.status)) {
      const error = JSON.parse(response.data);
      throw new Error(error.error?.message || `HTTP ${response.status}`);
    }

    const newToken = JSON.parse(response.data);
    
    // Salva novo token
    const newTokenData = {
      access_token: newToken.access_token,
      token_type: newToken.token_type,
      expires_in: newToken.expires_in,
      updatedAt: new Date().toISOString(),
    };

    fs.writeFileSync(
      path.join(__dirname, "..", "lib", "ig-token.json"),
      JSON.stringify(newTokenData, null, 2)
    );

    console.log("✅ Token renovado com sucesso!");
    console.log(`   Novo token expira em: ${newTokenData.expires_in} segundos (${Math.round(newTokenData.expires_in / 86400)} dias)`);
    console.log(`   Atualizado em: ${newTokenData.updatedAt}`);

  } catch (error) {
    console.error("❌ Erro ao renovar token:", error.message);
    process.exit(1);
  }
}

// Se chamado diretamente
if (require.main === module) {
  refreshToken().catch(e => {
    console.error("❌ Erro fatal:", e.message);
    process.exit(1);
  });
}

module.exports = { refreshToken };