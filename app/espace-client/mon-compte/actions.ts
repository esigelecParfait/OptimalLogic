"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type AccountActionState = {
  error: string | null;
  success?: boolean;
};

function cleanOptional(value: FormDataEntryValue | null) {
  const cleaned = typeof value === "string" ? value.trim() : "";
  return cleaned.length > 0 ? cleaned : null;
}

export async function updateClientInfo(
  _prevState: AccountActionState,
  formData: FormData
): Promise<AccountActionState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Vous devez être connecté." };
  }

  const contactFirstName = cleanOptional(formData.get("contact_first_name"));
  const contactLastName = cleanOptional(formData.get("contact_last_name"));

  if (!contactFirstName || !contactLastName) {
    return { error: "Le nom et le prénom sont obligatoires." };
  }

  const { error } = await supabase
    .from("clients")
    .update({
      contact_first_name: contactFirstName,
      contact_last_name: contactLastName,
      business_name: cleanOptional(formData.get("business_name")),
      business_city: cleanOptional(formData.get("business_city")),
      business_website_url: cleanOptional(
        formData.get("business_website_url")
      ),
      google_business_url: cleanOptional(formData.get("google_business_url")),
    })
    .eq("auth_user_id", user.id);

  if (error) {
    return { error: "Impossible de mettre à jour vos informations." };
  }

  revalidatePath("/espace-client/mon-compte");
  return { error: null, success: true };
}
