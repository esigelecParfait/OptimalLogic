import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type { User } from "@supabase/supabase-js";

export async function requireAdmin(): Promise<User | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: admin } = await supabaseAdmin
    .from("administrateurs")
    .select("id_admin")
    .eq("email", user.email!)
    .eq("is_active", true)
    .maybeSingle();

  return admin ? user : null;
}
