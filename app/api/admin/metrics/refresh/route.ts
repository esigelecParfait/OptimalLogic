import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Route appelée de deux façons :
//   1. Automatiquement par Vercel Cron (GET, le 1er du mois à 6h)
//   2. Manuellement par OptimalLogic (POST avec x-admin-secret)

export const dynamic = "force-dynamic";

function createSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Configuration Supabase admin incomplete.");
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

async function aggregate(month: string | null) {
  const supabaseAdmin = createSupabaseAdmin();
  const { error } = await supabaseAdmin.rpc("refresh_client_metrics", {
    p_month: month ?? null,
  });
  return error;
}

// GET — appelé par Vercel Cron (authentifié via CRON_SECRET injecté par Vercel)
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: "Non autorisé." }, { status: 401 });
  }

  const error = await aggregate(null);
  if (error) {
    console.error("refresh_client_metrics (cron):", error);
    return Response.json({ error: "Erreur lors de l'agrégation." }, { status: 500 });
  }

  const month = new Date().toISOString().slice(0, 7);
  console.log(`[metrics] Agrégation automatique ${month} OK`);
  return Response.json({ success: true, month });
}

// POST — appelé manuellement avec x-admin-secret
export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-admin-secret");
  if (!secret || secret !== process.env.ADMIN_SECRET) {
    return Response.json({ error: "Non autorisé." }, { status: 401 });
  }

  let month: string | null = null;
  try {
    const body = await request.json().catch(() => ({}));
    if (typeof body?.month === "string" && /^\d{4}-\d{2}$/.test(body.month)) {
      month = body.month;
    }
  } catch { /* body absent */ }

  const error = await aggregate(month);
  if (error) {
    console.error("refresh_client_metrics (manual):", error);
    return Response.json({ error: "Erreur lors de l'agrégation." }, { status: 500 });
  }

  return Response.json({
    success: true,
    month: month ?? new Date().toISOString().slice(0, 7),
    message: "Métriques agrégées avec succès.",
  });
}
