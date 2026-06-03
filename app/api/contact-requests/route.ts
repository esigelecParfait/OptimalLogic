import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

type ContactRequestBody = {
  first_name: string;
  last_name: string;
  email: string;

  phone_country_code: string;
  phone_number: string;

  company_name?: string | null;
  project_type: string;
  message: string;
};

const allowedProjectTypes = new Set([
  "commerce",
  "tpe_pme",
  "startup",
  "autre",
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
    const body = (await request.json()) as Partial<ContactRequestBody>;

    const first_name = cleanText(body.first_name);
    const last_name = cleanText(body.last_name);
    const email = cleanText(body.email);

    const phone_country_code = cleanText(body.phone_country_code);
    const phone_number = cleanText(body.phone_number);

    const company_name = optionalText(body.company_name);
    const project_type = cleanText(body.project_type);
    const message = cleanText(body.message);

    if (
      !first_name ||
      !last_name ||
      !email ||
      !phone_country_code ||
      !phone_number ||
      !project_type ||
      !message
    ) {
      return NextResponse.json(
        { error: "Certains champs obligatoires sont manquants." },
        { status: 400 }
      );
    }

    if (!allowedProjectTypes.has(project_type)) {
      return NextResponse.json(
        { error: "Type de projet invalide." },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("contact_requests")
      .insert({
        first_name,
        last_name,
        email,
        phone_country_code,
        phone_number,
        company_name,
        project_type,
        message,
      })
      .select("id, created_at")
      .single();

    if (error) {
      console.error("Erreur Supabase contact_requests:", error);

      return NextResponse.json(
        {
          error: "Impossible d'enregistrer la demande.",
          details: error.message,
          code: error.code,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message enregistré avec succès.",
        data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur API contact_requests:", error);

    return NextResponse.json(
      { error: "Erreur serveur." },
      { status: 500 }
    );
  }
}