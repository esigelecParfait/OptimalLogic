import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

type TrackingPayload = {
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
};

type BookingRequestBody = {
  start?: string;

  firstname?: string;
  lastname?: string;
  email?: string;

  phoneFullNumber?: string;
  phone_country_code?: string;
  phone_number?: string;

  company?: string | null;
  businessCity?: string | null;
  activity?: string | null;
  objective?: string | null;
  objectiveLabel?: string | null;
  businessWebsiteUrl?: string | null;
  googleBusinessUrl?: string | null;
  message?: string | null;

  consentRgpd?: boolean;
  tracking?: TrackingPayload;
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

function hasTrackingData(tracking?: TrackingPayload) {
  if (!tracking) return false;

  return Boolean(
    cleanNullableText(tracking.utm_source) ||
      cleanNullableText(tracking.utm_medium) ||
      cleanNullableText(tracking.utm_campaign) ||
      cleanNullableText(tracking.utm_content)
  );
}

function jsonError(message: string, status = 400) {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status }
  );
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

    const firstname = cleanText(body.firstname);
    const lastname = cleanText(body.lastname);
    const email = cleanText(body.email).toLowerCase();

    const phoneFullNumber = cleanText(body.phoneFullNumber);
    const phoneCountryCode = cleanText(body.phone_country_code);
    const phoneNumber = cleanText(body.phone_number);

    const company = cleanNullableText(body.company);
    const businessCity = cleanNullableText(body.businessCity);
    const activity = cleanNullableText(body.activity);
    const objective = cleanNullableText(body.objective);
    const objectiveLabel = cleanNullableText(body.objectiveLabel);
    const businessWebsiteUrl = cleanNullableText(body.businessWebsiteUrl);
    const googleBusinessUrl = cleanNullableText(body.googleBusinessUrl);
    const message = cleanNullableText(body.message);

    const consentRgpd = body.consentRgpd === true;
    const tracking = body.tracking;

    if (!start) {
      return jsonError("Le créneau est obligatoire.");
    }

    if (!firstname) {
      return jsonError("Le prénom est obligatoire.");
    }

    if (!lastname) {
      return jsonError("Le nom de famille est obligatoire.");
    }

    if (!email || !isValidEmail(email)) {
      return jsonError("L’adresse email est invalide.");
    }

    if (!phoneCountryCode || !phoneNumber || !phoneFullNumber) {
      return jsonError("Le numéro de téléphone est obligatoire.");
    }

    if (!objective) {
      return jsonError("L’objectif principal est obligatoire.");
    }

    if (!consentRgpd) {
      return jsonError(
        "Le consentement RGPD est obligatoire pour confirmer le rendez-vous."
      );
    }

    const fullName = `${firstname} ${lastname}`.trim();

    const calPayload = {
      start,
      eventTypeSlug,
      teamSlug,

      attendee: {
        name: fullName,
        email,
        timeZone,
        language: "fr",
        phoneNumber: phoneFullNumber,
      },

      bookingFieldsResponses: {
        entreprise: company || "Non renseigné",
        ville_business: businessCity || "Non renseigné",
        type_activite: activity || "Non renseigné",
        objectif_principal: objectiveLabel || objective,
        site_web_actuel: businessWebsiteUrl || "Non renseigné",
        lien_google_business: googleBusinessUrl || "Non renseigné",
        message: message || "Non renseigné",
      },

      metadata: {
        source: "optimal_logic_site",
        page: "prise_de_rdv",
        entreprise: company || "",
        ville_business: businessCity || "",
        type_activite: activity || "",
        objectif: objective || "",
      },
    };

    const calResponse = await fetch("https://api.cal.com/v2/bookings", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "cal-api-version": apiVersion,
      },
      body: JSON.stringify(calPayload),
    });

    const calData = await calResponse.json().catch(() => null);

    if (!calResponse.ok) {
      console.error("Erreur Cal.com booking :", calData);

      return NextResponse.json(
        {
          success: false,
          error:
            calData?.message ||
            calData?.error ||
            "Impossible de créer le rendez-vous.",
          details: calData,
        },
        { status: calResponse.status }
      );
    }

    const calBookingId =
      calData?.data?.id ||
      calData?.data?.uid ||
      calData?.id ||
      calData?.uid ||
      null;

    const clientData = {
      contact_first_name: firstname,
      contact_last_name: lastname,
      contact_email: email,
      phone_country_code: phoneCountryCode,
      phone_number: phoneNumber,

      business_name: company,
      business_city: businessCity,
      business_sector: activity,
      business_website_url: businessWebsiteUrl,
      google_business_url: googleBusinessUrl,
    };

    const { data: existingClient, error: existingClientError } =
      await supabaseAdmin
        .from("clients")
        .select("id_client")
        .eq("contact_email", email)
        .maybeSingle();

    if (existingClientError) {
      console.error("Erreur recherche client :", existingClientError);
      return jsonError("Le rendez-vous est créé, mais le client n’a pas pu être vérifié.", 500);
    }

    let clientId: string;

    if (existingClient?.id_client) {
      clientId = existingClient.id_client;

      const clientUpdateData: Record<string, string | null> = {
        contact_first_name: firstname,
        contact_last_name: lastname,
        phone_country_code: phoneCountryCode,
        phone_number: phoneNumber,
      };

      if (company !== null) clientUpdateData.business_name = company;
      if (businessCity !== null) clientUpdateData.business_city = businessCity;
      if (activity !== null) clientUpdateData.business_sector = activity;
      if (businessWebsiteUrl !== null) {
        clientUpdateData.business_website_url = businessWebsiteUrl;
      }
      if (googleBusinessUrl !== null) {
        clientUpdateData.google_business_url = googleBusinessUrl;
      }

      const { error: updateClientError } = await supabaseAdmin
        .from("clients")
        .update(clientUpdateData)
        .eq("id_client", clientId);

      if (updateClientError) {
        console.error("Erreur mise à jour client :", updateClientError);
        return jsonError("Le rendez-vous est créé, mais le client n’a pas pu être mis à jour.", 500);
      }
    } else {
      const { data: insertedClient, error: insertClientError } =
        await supabaseAdmin
          .from("clients")
          .insert(clientData)
          .select("id_client")
          .single();

      if (insertClientError || !insertedClient) {
        console.error("Erreur création client :", insertClientError);
        return jsonError("Le rendez-vous est créé, mais le client n’a pas pu être enregistré.", 500);
      }

      clientId = insertedClient.id_client;
    }

    const internalNotes = calBookingId
      ? `Rendez-vous Cal.com créé. ID Cal.com : ${calBookingId}`
      : "Rendez-vous Cal.com créé.";

    const { data: insertedDemande, error: insertDemandeError } =
      await supabaseAdmin
        .from("demandes")
        .insert({
          id_client: clientId,

          request_source: "prise_de_rdv",
          offer_code: null,
          objective_type: objective,
          need_description: message,
          consent_rgpd: consentRgpd,

          request_status: "rdv_planifie",
          priority: "normale",
          internal_notes: internalNotes,
        })
        .select("id")
        .single();

    if (insertDemandeError || !insertedDemande) {
      console.error("Erreur création demande :", insertDemandeError);
      return jsonError("Le rendez-vous est créé, mais la demande n’a pas pu être enregistrée.", 500);
    }

    const demandeId = insertedDemande.id as string;

    let trackingSaved = false;

    if (hasTrackingData(tracking)) {
      const { error: trackingError } = await supabaseAdmin
        .from("tracking_marketing")
        .insert({
          demande_id: demandeId,
          utm_source: cleanNullableText(tracking?.utm_source),
          utm_medium: cleanNullableText(tracking?.utm_medium),
          utm_campaign: cleanNullableText(tracking?.utm_campaign),
          utm_content: cleanNullableText(tracking?.utm_content),
        });

      if (trackingError) {
        console.error("Erreur insertion tracking marketing :", trackingError);
      } else {
        trackingSaved = true;
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Rendez-vous créé et demande enregistrée avec succès.",
        booking: calData?.data || calData,
        data: {
          id_client: clientId,
          demande_id: demandeId,
          tracking_saved: trackingSaved,
        },
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