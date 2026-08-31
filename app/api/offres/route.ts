import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { PUBLIC_OFFER_CODES } from "@/lib/offers/public-catalog";
import { publicDatabaseOffersSchema } from "@/lib/offers/server-schema";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { data: offres, error } = await supabaseAdmin
      .from("offres")
      .select(
        `
        code,
        nom_offre,
        client_type,
        prix,
        prix_abonnement,
        is_active,
        created_at
      `,
      )
      .eq("is_active", true)
      .in("code", [...PUBLIC_OFFER_CODES])
      .order("prix", { ascending: true });

    if (error) {
      console.error("Erreur Supabase récupération offres :", error);

      return NextResponse.json(
        { error: "Impossible de récupérer les offres." },
        { status: 500 },
      );
    }

    const parsedOffers = publicDatabaseOffersSchema.safeParse(offres ?? []);
    if (!parsedOffers.success) {
      console.error("Données d'offres Supabase invalides :", parsedOffers.error);
      return NextResponse.json(
        { error: "Les offres enregistrées sont invalides." },
        { status: 500 },
      );
    }

    const offerByCode = new Map(parsedOffers.data.map((offer) => [offer.code, offer]));
    const orderedOffers = PUBLIC_OFFER_CODES.flatMap((code) => {
      const offer = offerByCode.get(code);
      return offer ? [offer] : [];
    });

    return NextResponse.json({ offres: orderedOffers }, { status: 200 });
  } catch (error) {
    console.error("Erreur API /api/offres :", error);

    return NextResponse.json(
      { error: "Erreur serveur lors du chargement des offres." },
      { status: 500 },
    );
  }
}
