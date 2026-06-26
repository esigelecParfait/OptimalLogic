import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const appsScriptSecret = process.env.APPS_SCRIPT_SYNC_SECRET;

    if (!supabaseUrl || !serviceRoleKey || !appsScriptSecret) {
      console.error("prospects-sync: variables d'environnement manquantes.");
      return NextResponse.json({ error: "Configuration serveur incomplète." }, { status: 500 });
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

    const authorization = request.headers.get("authorization");
    const expectedAuthorization = `Bearer ${appsScriptSecret}`;

    if (authorization !== expectedAuthorization) {
      return NextResponse.json(
        { error: "Accès non autorisé." },
        { status: 401 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("v_prospects_google_sync")
      .select("*")
      .order("date_demande", { ascending: false })
      .limit(200);

    if (error) {
      console.error("Erreur Supabase prospects-sync:", error);

      return NextResponse.json(
        { error: "Impossible de récupérer les prospects." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      prospects: data ?? [],
    });
  } catch (error) {
    console.error("Erreur API prospects-sync:", error);

    return NextResponse.json(
      { error: "Erreur serveur." },
      { status: 500 }
    );
  }
}