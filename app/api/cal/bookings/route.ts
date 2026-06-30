import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { rateLimit, rateLimitResponse, getClientIp } from "@/lib/rate-limit";
import { sendBrevoEmail } from "@/lib/brevo";
import {
  buildAdminImmediateEmail,
  buildClientImmediateEmail,
  type TypeClient,
} from "@/lib/mail-templates";

export const dynamic = "force-dynamic";

const BOOKING_RATE_LIMIT = process.env.NODE_ENV === "production" ? 3 : 30;
const BOOKING_RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

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
  type_client?: TypeClient | null;

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

function isValidTypeClient(value: string | null) {
  return (
    value === null ||
    value === "commerce" ||
    value === "tpe_pme" ||
    value === "startup" ||
    value === "autre"
  );
}

function normalizeDateTime(value: unknown) {
  const rawValue = cleanText(value);

  if (!rawValue) {
    return null;
  }

  const date = new Date(rawValue);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString();
}

function hasTrackingData(tracking?: TrackingPayload) {
  if (!tracking) return false;

  return Boolean(
    cleanNullableText(tracking.utm_source) ||
    cleanNullableText(tracking.utm_medium) ||
    cleanNullableText(tracking.utm_campaign) ||
    cleanNullableText(tracking.utm_content),
  );
}

function jsonError(message: string, status = 400) {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status },
  );
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rl = rateLimit(
    `cal-bookings:${ip}`,
    BOOKING_RATE_LIMIT,
    BOOKING_RATE_LIMIT_WINDOW_MS,
  );
  if (!rl.allowed) return rateLimitResponse(rl.resetAt);

  try {
    const apiKey = getRequiredEnv("CAL_API_KEY");
    const eventTypeSlug = getRequiredEnv("CAL_EVENT_TYPE_SLUG");
    const teamSlug = getRequiredEnv("CAL_TEAM_SLUG");

    const timeZone = process.env.CAL_TIMEZONE || "Europe/Paris";
    const apiVersion = process.env.CAL_BOOKINGS_API_VERSION || "2026-02-25";

    const body = (await request.json()) as BookingRequestBody;

    const start = cleanText(body.start);
    const appointmentStartAtIso = normalizeDateTime(start);

    const firstname = cleanText(body.firstname);
    const lastname = cleanText(body.lastname);
    const email = cleanText(body.email).toLowerCase();

    const phoneFullNumber = cleanText(body.phoneFullNumber);
    const phoneCountryCode = cleanText(body.phone_country_code);
    const phoneNumber = cleanText(body.phone_number);

    const company = cleanNullableText(body.company);
    const businessCity = cleanNullableText(body.businessCity);
    const typeClient = cleanNullableText(body.type_client);

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

    if (!appointmentStartAtIso) {
      return jsonError("La date du rendez-vous est invalide.");
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

    if (!isValidTypeClient(typeClient)) {
      return jsonError("Le type de client est invalide.");
    }

    if (!typeClient) {
      return jsonError("Le type de client est obligatoire.");
    }

    if (!objective) {
      return jsonError("L’objectif principal est obligatoire.");
    }

    if (!consentRgpd) {
      return jsonError(
        "Le consentement RGPD est obligatoire pour confirmer le rendez-vous.",
      );
    }

    const fullName = `${firstname} ${lastname}`.trim();

    const calPayload = {
      start: appointmentStartAtIso,
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
        type_client: typeClient,
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
        type_client: typeClient,
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
        { status: calResponse.status },
      );
    }

    const calBookingId =
      calData?.data?.id ||
      calData?.data?.uid ||
      calData?.id ||
      calData?.uid ||
      null;

    const appointmentStartAt =
      normalizeDateTime(calData?.data?.startTime) ||
      normalizeDateTime(calData?.data?.start) ||
      normalizeDateTime(calData?.startTime) ||
      normalizeDateTime(calData?.start) ||
      appointmentStartAtIso;

    const clientProspectData = {
      contact_first_name: firstname,
      contact_last_name: lastname,
      contact_email: email,
      phone_country_code: phoneCountryCode,
      phone_number: phoneNumber,

      business_name: company,
      business_city: businessCity,
      business_sector: null,
      business_website_url: businessWebsiteUrl,
      google_business_url: googleBusinessUrl,

      type_client: typeClient,
    };

    const { data: existingClientProspect, error: existingClientProspectError } =
      await supabaseAdmin
        .from("client_prospects")
        .select("id_client")
        .eq("contact_email", email)
        .maybeSingle();

    if (existingClientProspectError) {
      console.error("Erreur recherche prospect :", existingClientProspectError);

      return jsonError(
        "Le rendez-vous est créé, mais le prospect n’a pas pu être vérifié.",
        500,
      );
    }

    let clientProspectId: string;

    if (existingClientProspect?.id_client) {
      clientProspectId = existingClientProspect.id_client;

      const clientProspectUpdateData: Record<string, string | null> = {
        contact_first_name: firstname,
        contact_last_name: lastname,
        phone_country_code: phoneCountryCode,
        phone_number: phoneNumber,
        type_client: typeClient,
      };

      if (company !== null) {
        clientProspectUpdateData.business_name = company;
      }

      if (businessCity !== null) {
        clientProspectUpdateData.business_city = businessCity;
      }

      if (businessWebsiteUrl !== null) {
        clientProspectUpdateData.business_website_url = businessWebsiteUrl;
      }

      if (googleBusinessUrl !== null) {
        clientProspectUpdateData.google_business_url = googleBusinessUrl;
      }

      const { error: updateClientProspectError } = await supabaseAdmin
        .from("client_prospects")
        .update(clientProspectUpdateData)
        .eq("id_client", clientProspectId);

      if (updateClientProspectError) {
        console.error("Erreur mise à jour prospect :", updateClientProspectError);

        return jsonError(
          "Le rendez-vous est créé, mais le prospect n’a pas pu être mis à jour.",
          500,
        );
      }
    } else {
      const { data: insertedClientProspect, error: insertClientProspectError } =
        await supabaseAdmin
          .from("client_prospects")
          .insert(clientProspectData)
          .select("id_client")
          .single();

      if (insertClientProspectError || !insertedClientProspect) {
        console.error("Erreur création prospect :", insertClientProspectError);

        return jsonError(
          "Le rendez-vous est créé, mais le prospect n’a pas pu être enregistré.",
          500,
        );
      }

      clientProspectId = insertedClientProspect.id_client;
    }

    const internalNotes = calBookingId
      ? `Rendez-vous Cal.com créé. ID Cal.com : ${calBookingId}. Début : ${appointmentStartAt}. Fuseau : ${timeZone}`
      : `Rendez-vous Cal.com créé. Début : ${appointmentStartAt}. Fuseau : ${timeZone}`;

    const { data: insertedDemande, error: insertDemandeError } =
      await supabaseAdmin
        .from("demandes")
        .insert({
          id_client: clientProspectId,

          request_source: "prise_de_rdv",
          offer_code: null,
          objective_type: objective,
          need_description: message,
          consent_rgpd: consentRgpd,

          appointment_start_at: appointmentStartAt,
          appointment_timezone: timeZone,

          request_status: "rdv_planifie",
          priority: "normale",
          internal_notes: internalNotes,
        })
        .select("id")
        .single();

    if (insertDemandeError || !insertedDemande) {
      console.error("Erreur création demande :", insertDemandeError);

      return jsonError(
        "Le rendez-vous est créé, mais la demande n’a pas pu être enregistrée.",
        500,
      );
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

    const adminEmail = process.env.ADMIN_EMAIL || null;
    const adminName = process.env.ADMIN_NAME || "Admin OptimalLogic";

    const phoneDisplay = `${phoneCountryCode} ${phoneNumber}`.trim();

    const clientMail = buildClientImmediateEmail({
      firstName: firstname,
      lastName: lastname,
      email,
      phone: phoneDisplay,
      company,
      businessCity,
      typeClient: typeClient as TypeClient,
      requestSource: "prise_de_rdv",
      offerName: null,
      offerCode: null,
      objective,
      message,
      demandeId,
    });

    const adminMail = buildAdminImmediateEmail({
      firstName: firstname,
      lastName: lastname,
      email,
      phone: phoneDisplay,
      company,
      businessCity,
      typeClient: typeClient as TypeClient,
      requestSource: "prise_de_rdv",
      offerName: null,
      offerCode: null,
      objective,
      message,
      demandeId,
    });

    const clientMailResult = await sendBrevoEmail({
      to: [
        {
          email,
          name: fullName,
        },
      ],
      subject: clientMail.subject,
      htmlContent: clientMail.html,
      textContent: clientMail.text,
    });

    const adminMailResult = adminEmail
      ? await sendBrevoEmail({
          to: [
            {
              email: adminEmail,
              name: adminName,
            },
          ],
          subject: adminMail.subject,
          htmlContent: adminMail.html,
          textContent: adminMail.text,
        })
      : {
          success: false,
          messageId: null,
          error: "ADMIN_EMAIL manquant dans les variables d’environnement.",
        };

    const { error: updateMailStatusError } = await supabaseAdmin
      .from("demandes")
      .update({
        client_notification_sent: clientMailResult.success,
        client_notification_error: clientMailResult.error,
        client_brevo_message_id: clientMailResult.messageId,
        client_notification_sent_at: clientMailResult.success
          ? new Date().toISOString()
          : null,

        admin_notification_sent: adminMailResult.success,
        admin_notification_error: adminMailResult.error,
        admin_brevo_message_id: adminMailResult.messageId,
        admin_notification_sent_at: adminMailResult.success
          ? new Date().toISOString()
          : null,
      })
      .eq("id", demandeId);

    if (updateMailStatusError) {
      console.error(
        "Erreur mise à jour statut emails :",
        updateMailStatusError,
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Rendez-vous créé et demande enregistrée avec succès.",
        booking: calData?.data || calData,
        data: {
          id_client: clientProspectId,
          demande_id: demandeId,
          appointment_start_at: appointmentStartAt,
          appointment_timezone: timeZone,
          tracking_saved: trackingSaved,
          emails: {
            client_sent: clientMailResult.success,
            admin_sent: adminMailResult.success,
          },
        },
      },
      { status: 201 },
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
      { status: 500 },
    );
  }
}
