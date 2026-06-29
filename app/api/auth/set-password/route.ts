import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email || !password || password.length < 8) {
    return Response.json({ error: "Données invalides." }, { status: 400 });
  }

  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  // Chercher l'utilisateur par email
  const { data: { users }, error: listErr } = await db.auth.admin.listUsers();
  if (listErr) return Response.json({ error: "Erreur serveur." }, { status: 500 });

  const user = users.find(u => u.email?.toLowerCase() === email.toLowerCase());
  if (!user) {
    return Response.json({ error: "Aucun compte associé à cette adresse e-mail." }, { status: 404 });
  }

  // Mettre à jour le mot de passe
  const { error: updateErr } = await db.auth.admin.updateUserById(user.id, { password });
  if (updateErr) {
    return Response.json({ error: "Impossible de mettre à jour le mot de passe." }, { status: 500 });
  }

  return Response.json({ success: true });
}
