import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error || !code) {
    return new Response(`<h1>Erreur Google OAuth</h1><p>${error ?? "Code absent"}</p>`, {
      headers: { "Content-Type": "text/html" },
      status: 400,
    });
  }

  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/api/admin/google-auth/callback`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id:     process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri:  redirectUri,
      grant_type:    "authorization_code",
    }),
  });

  const data = await res.json();

  if (!data.refresh_token) {
    return new Response(
      `<h1>Pas de refresh_token</h1>
       <p>Assurez-vous d'avoir révoqué l'accès précédent depuis
       <a href="https://myaccount.google.com/permissions">Google Account Permissions</a>
       puis réessayez.</p>
       <pre>${JSON.stringify(data, null, 2)}</pre>`,
      { headers: { "Content-Type": "text/html" }, status: 400 }
    );
  }

  return new Response(
    `<html><body style="font-family:monospace;padding:40px;background:#0a0a0a;color:#f0f0f0">
      <h2 style="color:#2ee6a8">✅ Autorisation réussie !</h2>
      <p>Copiez ce <strong>refresh_token</strong> dans vos variables Vercel :</p>
      <p style="background:#1a1a1a;padding:12px;border-radius:8px;word-break:break-all;color:#7c5cff">
        ${data.refresh_token}
      </p>
      <p style="color:#999">Variable à ajouter : <code>GOOGLE_REFRESH_TOKEN</code></p>
      <p style="color:#999">Ne partagez jamais ce token — il donne accès à vos fiches Google Business.</p>
    </body></html>`,
    { headers: { "Content-Type": "text/html" } }
  );
}
