"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export type AdminLoginState = { error: string | null };

export async function loginAdmin(
  _prev: AdminLoginState,
  formData: FormData
): Promise<AdminLoginState> {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;

  if (!email || !password) return { error: "Email et mot de passe requis." };

  const supabase = await createClient();
  const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
  if (authError) return { error: "Email ou mot de passe incorrect." };

  const { data: admin } = await supabaseAdmin
    .from("administrateurs")
    .select("id_admin, is_active")
    .eq("email", email)
    .maybeSingle();

  if (!admin?.id_admin || !admin.is_active) {
    await supabase.auth.signOut();
    return { error: "Accès non autorisé." };
  }

  redirect("/admin");
}

export async function logoutAdmin() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/connexion");
}
