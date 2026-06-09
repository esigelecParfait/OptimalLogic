import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type BookingRequestBody = {
  start?: string;

  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;

  company?: string;
  clientType?: string;
  objective?: string;
  message?: string;
};

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} est manquant dans .env.local`);
  }

  return value;
}

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function cleanNullableText(value: unknown) {
  const cleaned = cleanText(value);
  return cleaned.length > 0 ? cleaned : null;
}

function isValidEmail(email: string) {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
}

export async function POST(request: Request) {
  try {
    const apiKey = getRequiredEnv("CAL_API_KEY");
    const eventTypeSlug = getRequiredEnv("CAL_EVENT_TYPE_SLUG");
    const teamSlug = getRequiredEnv("CAL_TEAM_SLUG");

    const timeZone = process.env.CAL_TIMEZONE || "Europe/Paris";
    const apiVersion =
      process.env.CAL_BOOKINGS_API_VERSION || "2026-02-25";

    const body = (await request.json()) as BookingRequestBody;

    const start = cleanText(body.start);
    const firstName = cleanText(body.firstName);
    const lastName = cleanText(body.lastName);
    const email = cleanText(body.email).toLowerCase();
    const phone = cleanNullableText(body.phone);

    const company = cleanNullableText(body.company);
    const clientType = cleanNullableText(body.clientType);
    const objective = cleanNullableText(body.objective);
    const message = cleanNullableText(body.message);

    if (!start) {
      return NextResponse.json(
        { success: false, error: "Le créneau est obligatoire." },
        { status: 400 }
      );
    }

    if (!firstName || !lastName) {
      return NextResponse.json(
        { success: false, error: "Le nom et le prénom sont obligatoires." },
        { status: 400 }
      );
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: "L’adresse email est invalide." },
        { status: 400 }
      );
    }

    const fullName = `${firstName} ${lastName}`.trim();

    const calPayload = {
      start,
      eventTypeSlug,
      teamSlug,

      attendee: {
        name: fullName,
        email,
        timeZone,
        language: "fr",
        ...(phone ? { phoneNumber: phone } : {}),
      },

      bookingFieldsResponses: {
        entreprise: company || "Non renseigné",
        type_client: clientType || "Non renseigné",
        objectif: objective || "Non renseigné",
        message: message || "Non renseigné",
      },

      metadata: {
        source: "optimal_logic_site",
        page: "prise_de_rdv",
        company: company || "",
        clientType: clientType || "",
        objective: objective || "",
      },
    };

    const response = await fetch("https://api.cal.com/v2/bookings", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "cal-api-version": apiVersion,
      },
      body: JSON.stringify(calPayload),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      console.error("Erreur Cal.com booking :", data);

      return NextResponse.json(
        {
          success: false,
          error:
            data?.message ||
            data?.error ||
            "Impossible de créer le rendez-vous.",
          details: data,
        },
        { status: response.status }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Rendez-vous créé avec succès.",
        booking: data?.data || data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur API /api/cal/bookings :", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Erreur serveur lors de la création du rendez-vous.",
      },
      { status: 500 }
    );
  }
}