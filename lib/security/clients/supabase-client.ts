import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export interface SecuritySupabaseConfig {
  url: string;
  serviceRoleKey: string;
}

export function getSecuritySupabaseConfig(): SecuritySupabaseConfig | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    return null;
  }

  return { url, serviceRoleKey };
}

export function createSecuritySupabaseClient(): SupabaseClient | null {
  const config = getSecuritySupabaseConfig();

  if (!config) {
    return null;
  }

  return createClient(config.url, config.serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
