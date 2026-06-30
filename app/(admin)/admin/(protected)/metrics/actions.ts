"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/require-admin";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function refreshMetrics(): Promise<{ error: string | null }> {
  const user = await requireAdmin();
  if (!user) return { error: "Non autorisé." };

  const { error } = await supabaseAdmin.rpc("refresh_client_metrics", { p_month: null });
  if (error) return { error: "Erreur lors de l'agrégation." };

  revalidatePath("/admin/metrics");
  return { error: null };
}
