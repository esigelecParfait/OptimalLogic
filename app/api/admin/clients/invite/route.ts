import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * Génère un lien d'activation sécurisé pour un nouveau client.
 *
 * POST /api/admin/clients/invite
 * Header : x-admin-secret: VOTRE_ADMIN_SECRET
 * Body   : { "email": "client@email.com" }
 *
 * Retourne : { "link": "https://..." }
 *
 * Le lien redirige vers /connexion/activer où le client
 * définit son mot de passe. Valable 24h.
 */

export const dynamic = "force-dynamic";

function supabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Variables Supabase manquantes.");
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

export async function POST(request: NextRequest) {
  // ── Auth admin ─────────────────────────────────────────────────────────────
  const secret = request.headers.get("x-admin-secret");
  if (!secret || secret !== process.env.ADMIN_SECRET) {
    return Response.json({ error: "Non autorisé." }, { status: 401 });
  }

  // ── Body ───────────────────────────────────────────────────────────────────
  let email: string;
  try {
    const body = await request.json();
    email = (body.email as string)?.trim().toLowerCase();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: "Email invalide." }, { status: 400 });
    }
  } catch {
    return Response.json({ error: "Body JSON invalide." }, { status: 400 });
  }

  // ── URL de base ────────────────────────────────────────────────────────────
  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ??
    `https://${request.headers.get("host")}`;

  const redirectTo = `${appUrl}/auth/confirm`;

  // ── Génération du lien Supabase ─────────────────────────────────────────────
  try {
    const db = supabaseAdmin();

    // generateLink type "invite" crée le compte s'il n'existe pas,
    // ou génère un lien d'invitation pour un compte existant.
    const { data, error } = await db.auth.admin.generateLink({
      type: "invite",
      email,
      options: { redirectTo },
    });

    if (error) {
      console.error("[invite] Erreur Supabase:", error.message);
      return Response.json({ error: error.message }, { status: 500 });
    }

    const link = data?.properties?.action_link;
    if (!link) {
      return Response.json({ error: "Lien non généré." }, { status: 500 });
    }

    console.log(`[invite] Lien généré pour ${email}`);

    return Response.json({
      success: true,
      email,
      link,
      expires_in: "24 heures",
      message: `Envoyez ce lien à ${email} pour qu'il crée son accès espace client.`,
    });

  } catch (e) {
    return Response.json(
      { error: e instanceof Error ? e.message : "Erreur inconnue." },
      { status: 500 }
    );
  }
}
