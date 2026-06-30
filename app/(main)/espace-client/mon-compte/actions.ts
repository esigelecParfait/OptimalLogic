"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getClientMemberForUser } from "@/lib/supabase/client-members";

export type PasswordActionState = {
  error: string | null;
  success?: boolean;
};

export async function updatePasswordFromAccount(
  _prevState: PasswordActionState,
  formData: FormData
): Promise<PasswordActionState> {
  const currentPassword = formData.get("currentPassword") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!currentPassword) {
    return { error: "Veuillez saisir votre mot de passe actuel." };
  }
  if (!password || password.length < 8) {
    return { error: "Le nouveau mot de passe doit contenir au moins 8 caractères." };
  }
  if (password !== confirmPassword) {
    return { error: "Les mots de passe ne correspondent pas." };
  }
  if (password === currentPassword) {
    return { error: "Le nouveau mot de passe doit être différent de l'ancien." };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user?.email) {
    return { error: "Vous devez être connecté." };
  }

  const { error: verifyError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: currentPassword,
  });

  if (verifyError) {
    return { error: "Mot de passe actuel incorrect." };
  }

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return { error: "Impossible de mettre à jour le mot de passe. Veuillez réessayer." };
  }

  return { error: null, success: true };
}

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

  const { data: clientMember, error: memberError } =
    await getClientMemberForUser(supabase, user.id);

  if (memberError || !clientMember?.id_client) {
    return { error: "Impossible de retrouver votre compte client." };
  }

  const { data: clientRow, error: clientRowError } = await supabase
    .from("clients")
    .select("id_client_prospect")
    .eq("id_client", clientMember.id_client)
    .maybeSingle();

  if (clientRowError || !clientRow?.id_client_prospect) {
    return { error: "Impossible de retrouver votre compte client." };
  }

  const { error } = await supabase
    .from("client_prospects")
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
    .eq("id_client", clientRow.id_client_prospect);

  if (error) {
    return { error: "Impossible de mettre à jour vos informations." };
  }

  revalidatePath("/espace-client/mon-compte");
  return { error: null, success: true };
}
