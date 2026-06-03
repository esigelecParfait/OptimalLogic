import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

type QuoteRequestBody = {
  client_type: string;
  offer_code: string;

  contact_first_name: string;
  contact_last_name: string;
  contact_email: string;

  phone_country_code: string;
  phone_number: string;

  business_name?: string | null;
  business_city: string;
  business_sector?: string | null;

  primary_objective_code: string;
  need_description?: string | null;

  consent_rgpd: boolean;
};

const allowedClientTypes = new Set(["commerce", "tpe_pme", "startup"]);

const allowedObjectiveCodes = new Set([
  "plus_appels_reservations",
  "plus_devis_qualifies",
  "mieux_suivre_prospects",
  "lancer_tester_offre",
  "incertain",
]);

function cleanText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function optionalText(value: unknown): string | null {
  const cleaned = cleanText(value);
  return cleaned.length > 0 ? cleaned : null;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<QuoteRequestBody>;

    const client_type = cleanText(body.client_type);
    const offer_code = cleanText(body.offer_code);

    const contact_first_name = cleanText(body.contact_first_name);
    const contact_last_name = cleanText(body.contact_last_name);
    const contact_email = cleanText(body.contact_email);

    const phone_country_code = cleanText(body.phone_country_code);
    const phone_number = cleanText(body.phone_number);

    const business_name = optionalText(body.business_name);
    const business_city = cleanText(body.business_city);
    const business_sector = optionalText(body.business_sector);

    const primary_objective_code = cleanText(body.primary_objective_code);
    const need_description = optionalText(body.need_description);

    const consent_rgpd = body.consent_rgpd === true;

    if (
  !client_type ||
  !offer_code ||
  !contact_first_name ||
  !contact_last_name ||
  !contact_email ||
  !phone_country_code ||
  !phone_number ||
  !business_city ||
  !primary_objective_code
) {
  return NextResponse.json(
    { error: "Certains champs obligatoires sont manquants." },
    { status: 400 }
  );
}

    if (!allowedClientTypes.has(client_type)) {
      return NextResponse.json(
        { error: "Type de client invalide." },
        { status: 400 }
      );
    }

    if (!allowedObjectiveCodes.has(primary_objective_code)) {
      return NextResponse.json(
        { error: "Objectif principal invalide." },
        { status: 400 }
      );
    }

    if (!consent_rgpd) {
      return NextResponse.json(
        { error: "Le consentement RGPD est obligatoire." },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
  .from("quote_requests")
  .insert({
    client_type,
    offer_code,

    contact_first_name,
    contact_last_name,
    contact_email,

    phone_country_code,
    phone_number,

    business_name,
    business_city,
    business_sector,

    primary_objective_code,
    need_description,

    consent_rgpd,
  })
  .select("id, created_at")
  .single();

   if (error) {
  console.error("Erreur Supabase quote_requests:", error);

  return NextResponse.json(
    {
      error: "Impossible d'enregistrer la demande.",
      details: error.message,
      code: error.code,
      hint: error.hint,
    },
    { status: 500 }
  );
}

    return NextResponse.json(
      {
        success: true,
        message: "Demande enregistrée avec succès.",
        data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur API quote_requests:", error);

    return NextResponse.json(
      { error: "Erreur serveur." },
      { status: 500 }
    );
  }
}