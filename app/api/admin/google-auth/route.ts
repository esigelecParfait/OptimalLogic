import { NextRequest } from "next/server";

/**
 * Flow d'autorisation Google Business Profile (à faire UNE SEULE FOIS)
 *
 * 1. GET /api/admin/google-auth?secret=ADMIN_SECRET
 *    → Redirige vers Google pour l'autorisation
 *
 * 2. Google redirige vers /api/admin/google-auth/callback?code=...
 *    → Échange le code contre access_token + refresh_token
 *    → Affiche le refresh_token à copier dans les variables Vercel
 */

const SCOPES = [
  "https://www.googleapis.com/auth/business.manage",
].join(" ");

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  if (secret !== process.env.ADMIN_SECRET) {
    return Response.json({ error: "Non autorisé." }, { status: 401 });
  }

  const clientId    = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/api/admin/google-auth/callback`;

  if (!clientId) {
    return Response.json({ error: "GOOGLE_CLIENT_ID manquant dans les variables d'environnement." }, { status: 500 });
  }

  const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authUrl.searchParams.set("client_id",     clientId);
  authUrl.searchParams.set("redirect_uri",  redirectUri);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope",         SCOPES);
  authUrl.searchParams.set("access_type",   "offline");
  authUrl.searchParams.set("prompt",         "consent"); // force le refresh_token

  return Response.redirect(authUrl.toString());
}
