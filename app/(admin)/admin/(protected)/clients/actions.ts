"use server";

import { requireAdmin } from "@/lib/admin/require-admin";
import { buildClientLink } from "@/lib/admin/generate-client-link";

export async function generateClientLink(
  _prev: { link: string | null; error: string | null },
  formData: FormData
): Promise<{ link: string | null; error: string | null }> {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  if (!email) return { link: null, error: "Email requis." };

  const user = await requireAdmin();
  if (!user) return { link: null, error: "Non autorisé." };

  const result = await buildClientLink(email);
  return { link: result.link, error: result.error };
}

export async function sendClientLinkByEmail(
  _prev: { error: string | null; sent: boolean },
  formData: FormData
): Promise<{ error: string | null; sent: boolean }> {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  if (!email) return { error: "Email requis.", sent: false };

  const user = await requireAdmin();
  if (!user) return { error: "Non autorisé.", sent: false };

  const result = await buildClientLink(email);
  if (!result.link) return { error: result.error, sent: false };

  const appsScriptUrl = process.env.APPS_SCRIPT_URL;
  if (!appsScriptUrl) return { error: "Envoi automatique non configuré (APPS_SCRIPT_URL).", sent: false };

  try {
    const res = await fetch(appsScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: process.env.ADMIN_SECRET ?? "",
        email,
        prenom: result.firstName ?? "",
        nom: result.lastName ?? "",
        link: result.link,
      }),
    });
    if (!res.ok) return { error: "Erreur lors de l'envoi de l'email.", sent: false };
  } catch {
    return { error: "Erreur lors de l'envoi de l'email.", sent: false };
  }

  return { error: null, sent: true };
}
