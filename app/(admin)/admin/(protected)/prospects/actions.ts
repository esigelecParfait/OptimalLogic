"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/require-admin";
import { supabaseAdmin } from "@/lib/supabase-admin";

export type ConvertState = { error: string | null; success: boolean };

export async function convertProspectToClient(
  _prev: ConvertState,
  formData: FormData
): Promise<ConvertState> {
  const user = await requireAdmin();
  if (!user) return { error: "Non autorisé.", success: false };

  const prospectId = formData.get("prospectId") as string;
  const offerCode = formData.get("offerCode") as string;
  if (!prospectId) return { error: "Prospect invalide.", success: false };
  if (!offerCode) return { error: "Choisis une offre.", success: false };

  const { data: existingClient } = await supabaseAdmin
    .from("clients")
    .select("id_client")
    .eq("id_client_prospect", prospectId)
    .maybeSingle();

  let clientId = existingClient?.id_client as string | undefined;

  if (!clientId) {
    const { data: created, error } = await supabaseAdmin
      .from("clients")
      .insert({
        id_client_prospect: prospectId,
        status: "active",
        became_client_at: new Date().toISOString(),
      })
      .select("id_client")
      .single();
    if (error || !created) return { error: "Erreur lors de la création du client.", success: false };
    clientId = created.id_client;
  }

  const { error: serviceErr } = await supabaseAdmin.from("client_services").insert({
    id_client: prospectId,
    offer_code: offerCode,
    service_status: "en_cours",
    payment_status: "paye",
  });
  if (serviceErr) return { error: "Erreur lors de la création du service.", success: false };

  revalidatePath("/admin/prospects");
  revalidatePath("/admin/clients");

  return { error: null, success: true };
}
