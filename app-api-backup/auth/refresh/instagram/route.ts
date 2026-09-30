import { NextRequest, NextResponse } from "next/server";

const IG_APP_SECRET = process.env.IG_APP_SECRET;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { access_token } = body;

    if (!access_token) {
      return NextResponse.json(
        { error: "access_token é obrigatório" },
        { status: 400 }
      );
    }

    if (!IG_APP_SECRET) {
      console.error("Missing IG_APP_SECRET");
      return NextResponse.json(
        { error: "Configuração do servidor incompleta" },
        { status: 500 }
      );
    }

    // Renova o token usando o refresh token
    const response = await fetch(
      `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${access_token}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Token refresh failed:", data);
      return NextResponse.json(
        { error: data.error?.message || "Falha ao renovar token" },
        { status: response.status }
      );
    }

    // Retorna o novo token
    return NextResponse.json({
      access_token: data.access_token,
      expires_in: data.expires_in,
      token_type: data.token_type,
    });

  } catch (error) {
    console.error("Token refresh error:", error);
    return NextResponse.json(
      { error: "Erro interno ao renovar token" },
      { status: 500 }
    );
  }
}