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

type ClientPayload = {
  contact_first_name?: string;
  contact_last_name?: string;
  contact_email?: string;
  phone_country_code?: string;
  phone_number?: string;

  business_name?: string | null;
  business_city?: string | null;
  business_sector?: string | null;
  business_website_url?: string | null;
  google_business_url?: string | null;

  type_client?: TypeClient | null;
};

type DemandePayload = {
  request_source?: "contact" | "tarifs";
  offer_code?: string | null;
  objective_type?: string | null;
  need_description?: string | null;
  consent_rgpd?: boolean;
};

type TrackingPayload = {
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
};

type CreateDemandeBody = {
  client?: ClientPayload;
  demande?: DemandePayload;
  tracking?: TrackingPayload;
};

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

function inferTypeClientFromOfferCode(offerCode: string | null) {
  if (!offerCode) return null;

  if (offerCode.startsWith("commerce_")) return "commerce";
  if (offerCode.startsWith("tpe_pme_")) return "tpe_pme";
  if (offerCode.startsWith("startup_")) return "startup";

  return null;
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
  const ip = getClientIp(request);
  const rl = rateLimit(`demandes:${ip}`, 5, 60 * 60 * 1000);
  if (!rl.allowed) return rateLimitResponse(rl.resetAt);

  try {
    const body = (await request.json()) as CreateDemandeBody;

    const client = body.client;
    const demande = body.demande;
    const tracking = body.tracking;

    if (!client) {
      return jsonError("Les informations du client sont manquantes.");
    }

    if (!demande) {
      return jsonError("Les informations de la demande sont manquantes.");
    }

    const contactFirstName = cleanText(client.contact_first_name);
    const contactLastName = cleanText(client.contact_last_name);
    const contactEmail = cleanText(client.contact_email).toLowerCase();

    const phoneCountryCode = cleanText(client.phone_country_code);
    const phoneNumber = cleanText(client.phone_number);

    const businessName = cleanNullableText(client.business_name);
    const businessCity = cleanNullableText(client.business_city);
    const businessSector = cleanNullableText(client.business_sector);
    const businessWebsiteUrl = cleanNullableText(client.business_website_url);
    const googleBusinessUrl = cleanNullableText(client.google_business_url);

    const requestSource = demande.request_source || "contact";
    const offerCode = cleanNullableText(demande.offer_code);
    const objectiveType = cleanNullableText(demande.objective_type);
    const needDescription = cleanNullableText(demande.need_description);
    const consentRgpd = demande.consent_rgpd === true;

    let typeClient = cleanNullableText(client.type_client);
    let offerName: string | null = null;

    if (!typeClient && offerCode) {
      typeClient = inferTypeClientFromOfferCode(offerCode);
    }

    if (!contactFirstName) {
      return jsonError("Le prénom est obligatoire.");
    }

    if (!contactLastName) {
      return jsonError("Le nom de famille est obligatoire.");
    }

    if (!contactEmail) {
      return jsonError("L’adresse email est obligatoire.");
    }

    if (!isValidEmail(contactEmail)) {
      return jsonError("L’adresse email est invalide.");
    }

    if (!phoneCountryCode || !phoneNumber) {
      return jsonError("Le numéro de téléphone est obligatoire.");
    }

    if (requestSource !== "contact" && requestSource !== "tarifs") {
      return jsonError("La provenance de la demande est invalide.");
    }

    if (!isValidTypeClient(typeClient)) {
      return jsonError("Le type de client est invalide.");
    }

    if (!typeClient) {
      return jsonError("Le type de client est obligatoire.");
    }

    if (requestSource === "tarifs" && !offerCode) {
      return jsonError(
        "Une demande provenant de la page Tarifs doit contenir une offre."
      );
    }

    if (!consentRgpd) {
      return jsonError(
        "Le consentement RGPD est obligatoire pour enregistrer la demande."
      );
    }

    if (offerCode) {
      const { data: offer, error: offerError } = await supabaseAdmin
        .from("offres")
        .select("code, nom_offre, is_active")
        .eq("code", offerCode)
        .eq("is_active", true)
        .maybeSingle();

      if (offerError) {
        console.error("Erreur vérification offre :", offerError);
        return jsonError("Impossible de vérifier l’offre choisie.", 500);
      }

      if (!offer) {
        return jsonError("L’offre choisie est invalide ou inactive.");
      }

      offerName = offer.nom_offre;
    }

    const clientInsertData = {
      contact_first_name: contactFirstName,
      contact_last_name: contactLastName,
      contact_email: contactEmail,
      phone_country_code: phoneCountryCode,
      phone_number: phoneNumber,

      business_name: businessName,
      business_city: businessCity,
      business_sector: businessSector,
      business_website_url: businessWebsiteUrl,
      google_business_url: googleBusinessUrl,

      type_client: typeClient,
    };

    const { data: existingClient, error: existingClientError } =
      await supabaseAdmin
        .from("clients")
        .select("id_client")
        .eq("contact_email", contactEmail)
        .maybeSingle();

    if (existingClientError) {
      console.error("Erreur recherche client :", existingClientError);
      return jsonError("Impossible de vérifier l’existence du client.", 500);
    }

    let clientId: string;

    if (existingClient?.id_client) {
      clientId = existingClient.id_client;

      const clientUpdateData: Record<string, string | null> = {
        contact_first_name: contactFirstName,
        contact_last_name: contactLastName,
        phone_country_code: phoneCountryCode,
        phone_number: phoneNumber,
        type_client: typeClient,
      };

      if (businessName !== null) {
        clientUpdateData.business_name = businessName;
      }

      if (businessCity !== null) {
        clientUpdateData.business_city = businessCity;
      }

      if (businessSector !== null) {
        clientUpdateData.business_sector = businessSector;
      }

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
        return jsonError("Impossible de mettre à jour le client.", 500);
      }
    } else {
      const { data: insertedClient, error: insertClientError } =
        await supabaseAdmin
          .from("clients")
          .insert(clientInsertData)
          .select("id_client")
          .single();

      if (insertClientError || !insertedClient) {
        console.error("Erreur création client :", insertClientError);
        return jsonError("Impossible de créer le client.", 500);
      }

      clientId = insertedClient.id_client;
    }

    const { data: insertedDemande, error: insertDemandeError } =
      await supabaseAdmin
        .from("demandes")
        .insert({
          id_client: clientId,

          request_source: requestSource,
          offer_code: offerCode,
          objective_type: objectiveType,
          need_description: needDescription,
          consent_rgpd: consentRgpd,

          request_status: "nouveau",
          priority: "normale",
        })
        .select("id")
        .single();

    if (insertDemandeError || !insertedDemande) {
      console.error("Erreur création demande :", insertDemandeError);
      return jsonError("Impossible d’enregistrer la demande.", 500);
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
      firstName: contactFirstName,
      lastName: contactLastName,
      email: contactEmail,
      phone: phoneDisplay,
      company: businessName,
      businessCity,
      typeClient: typeClient as TypeClient,
      requestSource,
      offerName,
      offerCode,
      objective: objectiveType,
      message: needDescription,
      demandeId,
    });

    const adminMail = buildAdminImmediateEmail({
      firstName: contactFirstName,
      lastName: contactLastName,
      email: contactEmail,
      phone: phoneDisplay,
      company: businessName,
      businessCity,
      typeClient: typeClient as TypeClient,
      requestSource,
      offerName,
      offerCode,
      objective: objectiveType,
      message: needDescription,
      demandeId,
    });

    const clientMailResult = await sendBrevoEmail({
      to: [
        {
          email: contactEmail,
          name: `${contactFirstName} ${contactLastName}`.trim(),
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
        updateMailStatusError
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Demande enregistrée avec succès.",
        data: {
          id_client: clientId,
          demande_id: demandeId,
          tracking_saved: trackingSaved,
          emails: {
            client_sent: clientMailResult.success,
            admin_sent: adminMailResult.success,
          },
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur API /api/demandes :", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Une erreur est survenue lors de l’enregistrement de la demande.",
      },
      { status: 500 }
    );
  }
}