import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { fetchWeeklyGBPMetrics } from "@/lib/google-business";

/**
 * Récupère les métriques Google Business pour tous les clients
 * qui ont un google_location_name configuré, puis met à jour client_metrics.
 *
 * Appelé :
 *   - Automatiquement chaque lundi à 8h via Vercel Cron
 *   - Manuellement via POST avec x-admin-secret
 */

export const dynamic = "force-dynamic";

function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}

async function run(weekStart: Date) {
  const db = supabaseAdmin();

  // Récupérer tous les clients avec une localisation GBP configurée
  const { data: clients, error: clientErr } = await db
    .from("clients")
    .select("id_client, google_location_name, google_account_location_name")
    .not("google_location_name", "is", null);

  if (clientErr) throw new Error(`Supabase clients: ${clientErr.message}`);
  if (!clients?.length) return { updated: 0, message: "Aucun client avec google_location_name configuré." };

  const mois = `${weekStart.getFullYear()}-${String(weekStart.getMonth() + 1).padStart(2, "0")}`;
  let updated = 0;
  const errors: string[] = [];

  for (const client of clients) {
    try {
      const metrics = await fetchWeeklyGBPMetrics(
        client.google_location_name,
        client.google_account_location_name ?? client.google_location_name,
        weekStart
      );

      const { error: upsertErr } = await db
        .from("client_metrics")
        .upsert({
          id_client:       client.id_client,
          mois,
          nb_vues_google:  metrics.nb_vues_google,
          nb_clics_google: metrics.nb_clics_google,
          nb_avis_google:  metrics.nb_avis_google,
          note_google:     metrics.note_google,
          updated_at:      new Date().toISOString(),
        }, {
          onConflict: "id_client,mois",
          // Ne remplace que les colonnes Google — laisse nb_rdv, nb_demandes etc. intacts
          ignoreDuplicates: false,
        });

      if (upsertErr) {
        errors.push(`Client ${client.id_client}: ${upsertErr.message}`);
      } else {
        updated++;
      }
    } catch (e) {
      errors.push(`Client ${client.id_client}: ${e instanceof Error ? e.message : String(e)}`);
    }
  }

  return { updated, total: clients.length, errors };
}

// GET — Vercel Cron (même schedule que /api/admin/metrics/refresh)
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: "Non autorisé." }, { status: 401 });
  }

  const weekStart = getLastMonday();
  const result = await run(weekStart);
  console.log("[google-metrics] Résultat:", result);
  return Response.json({ success: true, ...result });
}

// POST — Manuel
export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-admin-secret");
  if (!secret || secret !== process.env.ADMIN_SECRET) {
    return Response.json({ error: "Non autorisé." }, { status: 401 });
  }

  let weekStart = getLastMonday();
  try {
    const body = await request.json().catch(() => ({}));
    if (body?.weekStart) weekStart = new Date(body.weekStart);
  } catch { /* ok */ }

  const result = await run(weekStart);
  return Response.json({ success: true, ...result });
}

function getLastMonday(): Date {
  const now = new Date();
  const day = now.getDay(); // 0=dim, 1=lun...
  const diff = day === 0 ? -6 : 1 - day;
  const monday = new Date(now);
  monday.setDate(now.getDate() + diff);
  monday.setHours(0, 0, 0, 0);
  return monday;
}
