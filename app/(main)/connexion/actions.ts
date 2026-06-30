"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export type ActionState = {
  error: string | null;
  success?: boolean;
};

async function getBaseUrl() {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "http";

  return `${protocol}://${host}`;
}

export async function login(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Veuillez renseigner votre email et votre mot de passe." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: "Email ou mot de passe incorrect." };
  }

  redirect("/espace-client");
}

export async function requestPasswordReset(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const email = (formData.get("email") as string)?.trim().toLowerCase();

  if (!email) {
    return { error: "Veuillez renseigner votre email." };
  }

  try {
    const baseUrl = await getBaseUrl();

    // 1. Générer le lien d'activation sécurisé (2h) via notre API
    const linkRes = await fetch(`${baseUrl}/api/admin/clients/generate-link`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-secret": process.env.ADMIN_SECRET ?? "",
      },
      body: JSON.stringify({ email }),
    });
    const linkData = await linkRes.json();
    if (!linkData.link) throw new Error("Génération du lien échouée");

    // 2. Envoyer le mail via Apps Script doPost
    const appsScriptUrl = process.env.APPS_SCRIPT_URL;
    if (appsScriptUrl) {
      const supabase = await createClient();
      const { data: client } = await supabase
        .from("clients")
        .select("contact_first_name, contact_last_name")
        .eq("email", email)
        .maybeSingle();

      await fetch(appsScriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: process.env.ADMIN_SECRET ?? "",
          email,
          prenom: client?.contact_first_name ?? "",
          nom: client?.contact_last_name ?? "",
          link: linkData.link,
        }),
      });
    }
  } catch {
    // Silencieux — on ne révèle pas si l'email existe ou non
  }

  return { error: null, success: true };
}

export async function updatePassword(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
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

  redirect("/espace-client");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/connexion");
}

/**
 * Définit le mot de passe lors d'une activation de compte (invitation)
 * ou d'une réinitialisation (recovery). L'utilisateur est déjà authentifié
 * via le token Supabase — pas besoin du mot de passe actuel.
 */
export async function setPassword(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const password        = formData.get("password")        as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || password.length < 8) {
    return { error: "Le mot de passe doit contenir au moins 8 caractères." };
  }
  if (password !== confirmPassword) {
    return { error: "Les deux mots de passe ne correspondent pas." };
  }

  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Lien expiré ou invalide. Veuillez demander un nouveau lien." };
  }

  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    return { error: "Impossible de définir le mot de passe. Réessayez ou contactez le support." };
  }

  return { error: null, success: true };
}
