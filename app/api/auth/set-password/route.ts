import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const { token, password } = await request.json();

  if (!token || !password || password.length < 8) {
    return Response.json({ error: "Données invalides." }, { status: 400 });
  }

  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  // Vérifier le token
  const { data: row, error: fetchErr } = await db
    .from("activation_tokens")
    .select("email, expires_at, used_at")
    .eq("token", token)
    .maybeSingle();

  if (fetchErr || !row) {
    return Response.json({ error: "Lien invalide." }, { status: 400 });
  }
  if (row.used_at) {
    return Response.json({ error: "Ce lien a déjà été utilisé." }, { status: 400 });
  }
  if (new Date(row.expires_at) < new Date()) {
    return Response.json({ error: "Ce lien a expiré. Demandez un nouveau lien." }, { status: 400 });
  }

  // Trouver l'utilisateur par email
  const { data: { users } } = await db.auth.admin.listUsers();
  const user = users.find(u => u.email?.toLowerCase() === row.email.toLowerCase());
  if (!user) {
    return Response.json({ error: "Aucun compte associé à ce lien." }, { status: 404 });
  }

  // Mettre à jour le mot de passe
  const { error: updateErr } = await db.auth.admin.updateUserById(user.id, { password });
  if (updateErr) {
    return Response.json({ error: "Impossible de mettre à jour le mot de passe." }, { status: 500 });
  }

  // Invalider le token (usage unique)
  await db.from("activation_tokens")
    .update({ used_at: new Date().toISOString() })
    .eq("token", token);

  return Response.json({ success: true });
}
