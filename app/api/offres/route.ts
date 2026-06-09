import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { data: offres, error } = await supabaseAdmin
      .from("offres")
      .select(`
        code,
        nom_offre,
        client_type,
        prix,
        prix_abonnement,
        is_active,
        created_at
      `)
      .eq("is_active", true)
      .order("prix", { ascending: true });

    if (error) {
      console.error("Erreur Supabase récupération offres :", error);

      return NextResponse.json(
        { error: "Impossible de récupérer les offres." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { offres: offres ?? [] },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur API /api/offres :", error);

    return NextResponse.json(
      { error: "Erreur serveur lors du chargement des offres." },
      { status: 500 }
    );
  }
}