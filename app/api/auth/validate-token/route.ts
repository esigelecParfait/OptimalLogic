import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const token = new URL(request.url).searchParams.get("token");
  if (!token) return Response.json({ error: "Token manquant." }, { status: 400 });

  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const { data: row } = await db
    .from("activation_tokens")
    .select("email, expires_at, used_at")
    .eq("token", token)
    .maybeSingle();

  if (!row) return Response.json({ error: "Lien invalide." }, { status: 400 });
  if (row.used_at) return Response.json({ error: "Ce lien a déjà été utilisé." }, { status: 400 });
  if (new Date(row.expires_at) < new Date()) {
    return Response.json({ error: "Ce lien a expiré (valable 1h). Contactez OptimalLogic." }, { status: 400 });
  }

  return Response.json({ email: row.email });
}
