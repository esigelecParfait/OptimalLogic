"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/require-admin";
import { supabaseAdmin } from "@/lib/supabase-admin";

export type SaveState = { error: string | null; success: boolean };

const EMAIL_RE = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const PHONE_CODE_RE = /^\+[0-9]{1,4}$/;
const PHONE_NUMBER_RE = /^[0-9 ]{6,20}$/;

function clean(value: FormDataEntryValue | null) {
  const s = typeof value === "string" ? value.trim() : "";
  return s.length > 0 ? s : null;
}

export async function updateClientProspect(
  _prev: SaveState,
  formData: FormData
): Promise<SaveState> {
  const user = await requireAdmin();
  if (!user) return { error: "Non autorisé.", success: false };

  const prospectId = formData.get("prospectId") as string;
  if (!prospectId) return { error: "Prospect invalide.", success: false };

  const contactFirstName = clean(formData.get("contact_first_name"));
  const contactLastName = clean(formData.get("contact_last_name"));
  const contactEmail = clean(formData.get("contact_email"))?.toLowerCase() ?? null;
  const phoneCountryCode = clean(formData.get("phone_country_code"));
  const phoneNumber = clean(formData.get("phone_number"));
  const typeClient = clean(formData.get("type_client"));

  if (!contactFirstName || !contactLastName) {
    return { error: "Le nom et le prénom sont obligatoires.", success: false };
  }
  if (!contactEmail || !EMAIL_RE.test(contactEmail)) {
    return { error: "Email invalide.", success: false };
  }
  if (!phoneCountryCode || !PHONE_CODE_RE.test(phoneCountryCode)) {
    return { error: "Indicatif téléphonique invalide (ex: +33).", success: false };
  }
  if (!phoneNumber || !PHONE_NUMBER_RE.test(phoneNumber)) {
    return { error: "Numéro de téléphone invalide (6 à 20 chiffres).", success: false };
  }

  const { error } = await supabaseAdmin
    .from("client_prospects")
    .update({
      contact_first_name: contactFirstName,
      contact_last_name: contactLastName,
      contact_email: contactEmail,
      phone_country_code: phoneCountryCode,
      phone_number: phoneNumber,
      business_name: clean(formData.get("business_name")),
      business_city: clean(formData.get("business_city")),
      business_sector: clean(formData.get("business_sector")),
      business_website_url: clean(formData.get("business_website_url")),
      google_business_url: clean(formData.get("google_business_url")),
      type_client: typeClient,
    })
    .eq("id_client", prospectId);

  if (error) {
    if (error.code === "23505") return { error: "Cet email est déjà utilisé par un autre prospect.", success: false };
    return { error: "Erreur lors de la mise à jour.", success: false };
  }

  revalidatePath(`/admin/clients/${prospectId}`);
  revalidatePath("/admin/clients");
  revalidatePath("/admin/prospects");

  return { error: null, success: true };
}

export async function updateClientStatus(
  _prev: SaveState,
  formData: FormData
): Promise<SaveState> {
  const user = await requireAdmin();
  if (!user) return { error: "Non autorisé.", success: false };

  const clientId = formData.get("clientId") as string;
  const status = formData.get("status") as string;
  if (!clientId || !status) return { error: "Données invalides.", success: false };

  const { error } = await supabaseAdmin.from("clients").update({ status }).eq("id_client", clientId);
  if (error) return { error: "Erreur lors de la mise à jour du statut.", success: false };

  revalidatePath("/admin/clients");

  return { error: null, success: true };
}

export async function updateService(
  _prev: SaveState,
  formData: FormData
): Promise<SaveState> {
  const user = await requireAdmin();
  if (!user) return { error: "Non autorisé.", success: false };

  const serviceId = formData.get("serviceId") as string;
  const offerCode = formData.get("offerCode") as string;
  const serviceStatus = formData.get("serviceStatus") as string;
  const paymentStatus = formData.get("paymentStatus") as string;
  if (!serviceId) return { error: "Service invalide.", success: false };

  const { error } = await supabaseAdmin
    .from("client_services")
    .update({ offer_code: offerCode, service_status: serviceStatus, payment_status: paymentStatus })
    .eq("id_service", serviceId);

  if (error) return { error: "Erreur lors de la mise à jour du service.", success: false };

  revalidatePath("/admin/clients");

  return { error: null, success: true };
}
