import { NextRequest } from "next/server";
import { fetchAllManagedLocations } from "@/lib/google-business";

export const dynamic = "force-dynamic";

/** GET /api/admin/google/locations — liste toutes les fiches GBP gérées */
export async function GET(request: NextRequest) {
  const secret = request.headers.get("x-admin-secret");
  if (!secret || secret !== process.env.ADMIN_SECRET) {
    return Response.json({ error: "Non autorisé." }, { status: 401 });
  }

  if (!process.env.GOOGLE_REFRESH_TOKEN) {
    return Response.json(
      { error: "GOOGLE_REFRESH_TOKEN non configuré. Suivez le guide de connexion Google." },
      { status: 503 }
    );
  }

  try {
    const data = await fetchAllManagedLocations();
    const totalLocations = data.reduce((n, g) => n + g.locations.length, 0);
    return Response.json({ success: true, totalLocations, groups: data });
  } catch (e) {
    return Response.json(
      { error: e instanceof Error ? e.message : "Erreur API Google." },
      { status: 500 }
    );
  }
}
