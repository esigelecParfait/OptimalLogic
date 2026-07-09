"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { rateLimit } from "@/lib/rate-limit";
import { buildClientLink } from "@/lib/admin/generate-client-link";

export type ActionState = {
  error: string | null;
  success?: boolean;
};

async function clientIp() {
  const requestHeaders = await headers();
  const fwd = requestHeaders.get("x-forwarded-for");
  return fwd ? fwd.split(",")[0].trim() : "unknown";
}

export async function login(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  if (!rateLimit(`login:${await clientIp()}`, 10, 15 * 60 * 1000).allowed) {
    return { error: "Trop de tentatives. Réessayez dans quelques minutes." };
  }

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
  // Limite le spam de mails de reset ; réponse identique au cas nominal (anti-énumération)
  if (!rateLimit(`pwd-reset:${await clientIp()}`, 5, 60 * 60 * 1000).allowed) {
    return { error: null, success: true };
  }

  const email = (formData.get("email") as string)?.trim().toLowerCase();

  if (!email) {
    return { error: "Veuillez renseigner votre email." };
  }

  try {
    // 1. Générer le lien d'activation sécurisé (2h) — appel direct, pas de HTTP interne
    const linkResult = await buildClientLink(email);
    if (!linkResult.link) throw new Error(linkResult.error ?? "Génération du lien échouée");

    // 2. Envoyer le mail via Apps Script doPost
    const appsScriptUrl = process.env.APPS_SCRIPT_URL;
    if (appsScriptUrl) {
      await fetch(appsScriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(15000),
        body: JSON.stringify({
          secret: process.env.ADMIN_SECRET ?? "",
          template_id: "reset_mot_de_passe",
          email,
          prenom: linkResult.firstName ?? "",
          nom: linkResult.lastName ?? "",
          link: linkResult.link,
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
