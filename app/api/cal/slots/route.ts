import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} est manquant dans .env.local`);
  }

  return value;
}

function addDays(date: Date, days: number) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

export async function GET(request: Request) {
  try {
    const apiKey = getRequiredEnv("CAL_API_KEY");
    const eventTypeSlug = getRequiredEnv("CAL_EVENT_TYPE_SLUG");
    const teamSlug = getRequiredEnv("CAL_TEAM_SLUG");

    const timeZone = process.env.CAL_TIMEZONE || "Europe/Paris";
    const apiVersion = process.env.CAL_SLOTS_API_VERSION || "2024-09-04";

    const { searchParams } = new URL(request.url);

    const defaultStart = new Date();
    const defaultEnd = addDays(defaultStart, 14);

    const start =
      searchParams.get("start") || defaultStart.toISOString();

    const end =
      searchParams.get("end") || defaultEnd.toISOString();

    const url = new URL("https://api.cal.com/v2/slots");

    url.searchParams.set("eventTypeSlug", eventTypeSlug);
    url.searchParams.set("teamSlug", teamSlug);
    url.searchParams.set("start", start);
    url.searchParams.set("end", end);
    url.searchParams.set("timeZone", timeZone);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "cal-api-version": apiVersion,
      },
      cache: "no-store",
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      console.error("Erreur Cal.com slots :", data);

      return NextResponse.json(
        {
          success: false,
          error: data?.message || "Impossible de récupérer les créneaux.",
          details: data,
        },
        { status: response.status }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: data?.data || {},
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur API /api/cal/slots :", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Erreur serveur lors du chargement des créneaux.",
      },
      { status: 500 }
    );
  }
}