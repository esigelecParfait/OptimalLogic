import { createClient } from "@supabase/supabase-js";
import { requireAdmin } from "@/lib/admin/require-admin";

export const dynamic = "force-dynamic";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * POST /api/admin/google/link
 * Lie une fiche Google Business à un client dans Supabase.
 *
 * Body : {
 *   "clientId": "uuid-du-client",
 *   "locationName": "accounts/123/locations/456",      // pour les reviews
 *   "performanceName": "locations/456"                  // pour les métriques perf
 * }
 */
export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return Response.json({ error: "Non autorisé." }, { status: 401 });
  }

  let body: { clientId?: string; locationName?: string; performanceName?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Body JSON invalide." }, { status: 400 });
  }

  const { clientId, locationName, performanceName } = body;
  if (!clientId || !locationName || !performanceName) {
    return Response.json(
      { error: "clientId, locationName et performanceName sont requis." },
      { status: 400 },
    );
  }
  if (!UUID_RE.test(clientId)) {
    return Response.json({ error: "clientId invalide." }, { status: 400 });
  }

  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );

  const { error } = await db
    .from("client_prospects")
    .update({
      google_location_name: performanceName,
      google_account_location_name: locationName,
    })
    .eq("id_client", clientId);

  if (error) {
    return Response.json({ error: "Impossible de lier la fiche." }, { status: 500 });
  }

  return Response.json({ success: true, clientId, locationName, performanceName });
}
