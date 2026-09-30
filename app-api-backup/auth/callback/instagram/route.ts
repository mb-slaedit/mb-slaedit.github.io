import { NextRequest, NextResponse } from "next/server";

const IG_APP_ID = process.env.IG_APP_ID;
const IG_APP_SECRET = process.env.IG_APP_SECRET;
const REDIRECT_URI = process.env.IG_REDIRECT_URI || `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback/instagram`;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const errorReason = searchParams.get("error_reason");
  const errorDescription = searchParams.get("error_description");

  // Tratamento de erros do OAuth
  if (error) {
    console.error("Instagram OAuth error:", { error, errorReason, errorDescription });
    return NextResponse.redirect(
      new URL(`/?error=instagram_auth_failed&reason=${errorReason}&description=${errorDescription}`, request.url)
    );
  }

  if (!code) {
    return NextResponse.redirect(
      new URL("/?error=missing_code", request.url)
    );
  }

  if (!IG_APP_ID || !IG_APP_SECRET) {
    console.error("Missing Instagram app credentials");
    return NextResponse.redirect(
      new URL("/?error=server_config_error", request.url)
    );
  }

  try {
    // Troca o code por access_token de curta duração (1 hora)
    const tokenResponse = await fetch("https://api.instagram.com/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: IG_APP_ID,
        client_secret: IG_APP_SECRET,
        grant_type: "authorization_code",
        redirect_uri: REDIRECT_URI,
        code,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error("Token exchange failed:", tokenData);
      throw new Error(tokenData.error_message || "Token exchange failed");
    }

    const { access_token: shortToken, user_id } = tokenData;

    // Troca por long-lived token (60 dias)
    const longTokenResponse = await fetch(
      `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${IG_APP_SECRET}&access_token=${shortToken}`
    );

    const longTokenData = await longTokenResponse.json();

    if (!longTokenResponse.ok) {
      console.error("Long-lived token exchange failed:", longTokenData);
      throw new Error(longTokenData.error?.message || "Long-lived token exchange failed");
    }

    const { access_token: longToken, expires_in } = longTokenData;

    // Salva o token (em produção, guarde em banco/Redis/KV)
    // Aqui apenas redireciona com sucesso - em produção, salve em KV/Redis/DB
    const response = NextResponse.redirect(
      new URL("/?instagram_connected=true", request.url)
    );

    // Define cookie httpOnly com o token (opcional, para uso server-side)
    response.cookies.set("ig_long_token", longToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 55, // 55 dias (menos que 60 pra renovar antes)
      path: "/",
    });

    // Salva também o user_id para referência
    response.cookies.set("ig_user_id", user_id, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 60,
      path: "/",
    });

    return response;

  } catch (error) {
    console.error("Instagram OAuth callback error:", error);
    const message = error instanceof Error ? error.message : "Erro desconhecido";
    return NextResponse.redirect(
      new URL(`/?error=callback_failed&message=${encodeURIComponent(message)}`, request.url)
    );
  }
}