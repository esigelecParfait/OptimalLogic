import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { randomBytes } from "crypto";

export const dynamic = "force-dynamic";

/**
 * POST /api/admin/clients/generate-link
 * Header : x-admin-secret: VOTRE_ADMIN_SECRET
 * Body   : { "email": "client@email.com" }
 *
 * Retourne : { "link": "https://optimal-logic.com/connexion/activer?token=..." }
 * Valable 2 heures, usage unique.
 */
export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-admin-secret");
  if (!secret || secret !== process.env.ADMIN_SECRET) {
    return Response.json({ error: "Non autorisé." }, { status: 401 });
  }

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

  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  // Vérifier que l'email existe bien dans Supabase Auth
  const { data: { users } } = await db.auth.admin.listUsers();
  const userExists = users.some(u => u.email?.toLowerCase() === email);
  if (!userExists) {
    return Response.json({ error: "Aucun compte associé à cet email." }, { status: 404 });
  }

  // Invalider les anciens tokens non utilisés pour cet email
  await db.from("activation_tokens")
    .update({ used_at: new Date().toISOString() })
    .eq("email", email)
    .is("used_at", null);

  // Générer un token sécurisé
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // +1h

  const { error } = await db.from("activation_tokens").insert({
    token,
    email,
    expires_at: expiresAt.toISOString(),
  });

  if (error) {
    return Response.json({ error: "Erreur lors de la génération du lien." }, { status: 500 });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? `https://${request.headers.get("host")}`;
  const link = `${appUrl}/connexion/activer?token=${token}`;

  return Response.json({
    success: true,
    email,
    link,
    expires_in: "2 heures",
    expires_at: expiresAt.toISOString(),
  });
}
